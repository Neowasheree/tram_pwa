// app.js
// Tram Departures PWA 前端逻辑：输入站点名（在 allowedStops 中），查询 /departures 并在页面 + 通知中展示

// —— 1. 预定义允许使用的站点名 ↔ Global ID （请根据你的 PDF 列表补全） ——
const allowedStops = {
  "Borstei":               "de:09162:305",
  "Marienplatz":           "de:09162:2",
  "Dachauer Straße":       "de:09162:228",
  "Theresienwiese":        "de:09162:216",
  "Ampfingstraße":         "de:09162:901",
  // … 继续补全所有你需要开放的站点 …
};

// —— 2. 注册 Service Worker —— 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('SW 注册成功'))
      .catch(err => console.error('SW 注册失败', err));
  });
}

// —— 3. 请求 Notification 权限（桌面端可收到） —— 
if ('Notification' in window) {
  Notification.requestPermission();
}

// —— 4. 绑定按钮事件 —— 
document.addEventListener('DOMContentLoaded', () => {
  const input     = document.getElementById('stopInput');
  const btn       = document.getElementById('notifyBtn');
  const logEl     = document.getElementById('log');
  const BASE_URL  = 'https://www.mvg.de/api/bgw-pt/v3';

  btn.addEventListener('click', async () => {
    const term = input.value.trim();
    if (!term) {
      alert('请输入站点名称');
      return;
    }
    logEl.textContent = '查询中…';

    // —— 4.1 在 allowedStops 中模糊匹配 —— 
    const candidates = Object.keys(allowedStops)
      .filter(name => name.toLowerCase().includes(term.toLowerCase()));
    if (candidates.length === 0) {
      logEl.textContent = `未在列表中找到“${term}”`;
      return;
    }
    let stopName = candidates[0];
    if (candidates.length > 1) {
      const choice = prompt(
        '匹配到多个站点，请完整输入名称或从下面复制粘贴：\n' +
        candidates.join('\n')
      );
      if (!choice || !allowedStops[choice]) {
        logEl.textContent = '未选择有效站点';
        return;
      }
      stopName = choice;
    }
    const stopId = allowedStops[stopName];

    // —— 4.2 调用 /departures 接口 —— 
    const url = `${BASE_URL}/departures`
              + `?globalId=${encodeURIComponent(stopId)}`
              + `&limit=5`
              + `&transportTypes=${encodeURIComponent('TRAM,BUS')}`;
    let data;
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      data = await res.json();
    } catch (e) {
      console.error(e);
      logEl.textContent = '网络请求失败';
      return;
    }

    // —— 4.3 解析并展示 —— 
    const now = Date.now();
    if (!Array.isArray(data) || data.length === 0) {
      logEl.textContent = `${stopName} 暂无未来班次`;
      return;
    }

    const lines = data.slice(0, 5).map(d => {
      const departMs = d.realtimeDepartureTime;
      const mins     = Math.round((departMs - now) / 60000);
      const timeStr  = new Date(departMs)
                         .toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      const status   = d.cancelled
        ? '❌ Cancelled'
        : (d.delayInMinutes > 0
           ? `Delayed +${d.delayInMinutes}min`
           : 'On time');
      return `${d.transportType}${d.label} → ${d.destination}: `
           + `${timeStr} (in ${mins}min) ${status}`;
    });

    // 写入页面
    logEl.textContent = lines.join('\n');

    // 发送系统通知（如果授权）
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`${stopName} Departures`, { body: lines.join('\n') });
    }
  });
});
