// 1. 预定义允许站点（先只放 Borstei & Marienplatz 测试）
const allowedStops = {
  "Borstei": "de:09162:305",
  "Marienplatz": "de:09162:2"
};

document.getElementById("notifyBtn").addEventListener("click", async () => {
  let input = document.getElementById("stopInput").value.trim();
  let log = msg => document.getElementById("log").textContent = msg;

  if (!input) { log("请输入站点名"); return; }
  // 在 allowedStops 里模糊找
  let candidates = Object.keys(allowedStops)
    .filter(n => n.toLowerCase().includes(input.toLowerCase()));
  if (candidates.length === 0) { log(`未找到“${input}”`); return; }
  let stopName = candidates[0];

  // 2. 请求通知权限
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
  if (Notification.permission !== "granted") {
    log("请允许通知权限"); return;
  }

  // 3. 构造 /departures 请求
  let STOP_ID = allowedStops[stopName];
  let url = `https://www.mvg.de/api/bgw-pt/v3/departures`
          + `?globalId=${encodeURIComponent(STOP_ID)}`
          + `&limit=5`
          + `&transportTypes=${encodeURIComponent("TRAM,BUS")}`;
  let data;
  try {
    let resp = await fetch(url, { headers: { Accept: "application/json" } });
    data = await resp.json();
  } catch (e) {
    log("请求失败：" + e);
    return;
  }
  if (!Array.isArray(data) || data.length === 0) {
    log(`${stopName} 暂无未来班次`);
    return;
  }

  // 4. 拼消息体
  let now = Date.now();
  let lines = data.slice(0,5).map(d => {
    let departMs = d.realtimeDepartureTime;
    let mins = Math.round((departMs - now) / 60000);
    let timeStr = new Date(departMs)
      .toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
    let status = d.cancelled
      ? "❌ Cancelled"
      : (d.delayInMinutes>0
         ? `Delayed ${d.delayInMinutes} min`
         : "On time");
    return `${d.transportType}${d.label}→${d.destination} `
         + `${timeStr}(in ${mins}m) ${status}`;
  }).join("\n");

  // 5. 发送通知
  new Notification(`${stopName} Departures`, {
    body: lines,
    icon: "/icons/icon-192.png"
  });
  log("已发送通知");
});

// 6. 注册 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(r => console.log("SW 注册成功"))
      .catch(e => console.error(e));
  });
}
