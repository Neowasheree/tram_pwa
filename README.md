# Tram Departures PWA

A lightweight, installable web app that lets you look up upcoming MVG tram (and bus) departures for selected Munich stops—no code changes required once deployed.

## 🚀 Features

* **Instant Query**
  Enter a station name (fuzzy match) → get the next 5 departures in seconds.
* **PWA-Ready**
  • Easily install to your Desktop 
  • Custom app icon & theme color
* **Notifications**
  Desktop browsers receive a local notification of departures.
* **Zero-code Deployment**
  Static files only—host on GitHub Pages, Netlify, or any static server.
* **Customizable Stops**
  Simply edit one array in `app.js` to add/remove allowed station names & IDs.

## 🔧 Project Structure

```
tram_pwa/
├── index.html       # Main UI: input + “查询并通知” button + results area
├── style.css        # Simple responsive styling
├── app.js           # Core logic: API calls, rendering, notifications
├── manifest.json    # PWA manifest (name, icons, theme color, start URL)
├── sw.js            # Service Worker (caches core assets for offline use)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## 📦 Installation & Deployment

1. **Clone the repo**

   ```bash
   git clone https://github.com/Neowasheree/tram_pwa.git
   cd tram_pwa
   ```
2. **Host the folder**

   * **GitHub Pages**:

     * Push to `main` branch.
     * In **Settings → Pages**, set **Source** to `main` / root, save.
   * **Netlify / Vercel / Surge**:

     * Point to this folder as a static site.
3. **Visit your site**

   ```
   https://<your-user>.github.io/tram_pwa/
   ```
4. **Add to Home Screen**

   * **iOS Safari**: Share → Add to Home Screen
   * **Android Chrome**: Menu → Add to Home Screen

## ⚙️ Customization

### Allowed Stops

In `app.js`, near the top you’ll find:

```js
const allowedStops = {
  "Borstei":               "de:09162:305",
  "Marienplatz":           "de:09162:2",
  "Dachauer Straße":       "de:09162:228",
  // … add your stations here …
};
```

* **Key**: the station name (what users type)
* **Value**: the MVG `globalId` from the API

Add or remove entries to control which stations can be queried.

### Theme & Icons

* **Colors**: change `theme_color` in `manifest.json`
* **Icons**: replace `icons/icon-192.png` and `icons/icon-512.png` with your own 192×192 & 512×512 PNGs.

## 🛠️ How It Works

1. **User input** → fuzzy match against `allowedStops`.
2. **Fetch** `/departures?globalId=…&limit=5&transportTypes=TRAM,BUS` from [MVG API](https://www.mvg.de/api).
3. **Display** results in-page and, if permitted, send a desktop notification.
4. **Service Worker** caches `index.html`, `app.js`, `style.css`, icons, and manifest for offline availability.

## 📄 License

Released under the **MIT License**. Feel free to fork, adapt, and redistribute!
