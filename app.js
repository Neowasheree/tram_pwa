// app.js
// Tram Departures PWA 前端逻辑（支持移动端点击与触摸）

// 1. 预定义允许使用的站点名 ↔ Global ID （请根据你的 PDF 列表补全）
const allowedStops = {
  "Borstei":               "de:09162:305",
  "Marienplatz":           "de:09162:2",
  "Dachauer Straße":       "de:09162:228",
  "Theresienwiese":        "de:09162:216",
  // … 继续补全所有需要开放的站点 …
};

const BASE_URL = 'https://www.mvg.de/api/bgw-pt/v3';

document.addEventListener('DOMContentLoaded', () => {
  const input   = document.getElementById('stopInput');
  const btn     = document.getElementById('notifyBtn');
  const logEl   = document.getElementById('log');

  // 请求通知权限（桌面端可收到）
  if ('Notification' in window) {
    Notification.requestPermission();
  }

  // 将核心查询逻辑抽成一个函数
  async function queryDepartures() {
    logEl.textContent = '查询中…';
    const term = input.value.trim();
    if (!term) {
      alert('请输入站点名称');
      return;
    }

    // 模糊匹配
    const candidates = Object.keys(allowedStops)
      .filter(name => name.toLowerCase().includes(term.toLowerCase()));
    if (candidates.length === 0) {
      logEl.textContent = `未在列表中找到“${term}”`;
      return;
    }
    let stopName = candidates[0];
    if (candidates.length > 1) {
      const choice = prompt(
        '匹配到多个站点，请从下面复制完整名称粘贴：\n' +
        candidates.join('\n')
      );
      if (!choice || !allowedStops[choice]) {
        logEl.textContent = '未选择有效站点';
        return;
      }
      stopName = choice;
    }
    const stopId = allowedStops[stopName];

    // /departures 接口
    let url = `${BASE_URL}/departures`
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

    const now = Date.now();
    if (!Array.isArray(data) || data.length === 0) {
      logEl.textContent = `${stopName} 暂无未来班次`;
      return;
    }

    // 格式化
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

    // 页面显示
    logEl.textContent = lines.join('\n');

    // 发送通知（若获权限）
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`${stopName} Departures`, { body: lines.join('\n') });
    }
  }

  // 绑定点击与触摸事件，确保移动端也能触发
  btn.addEventListener('click',  queryDepartures);
  btn.addEventListener('touchend', queryDepartures);
});
