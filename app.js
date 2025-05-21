// app.js
// Tram Departures PWA 前端逻辑

// 1. 允许使用的站点名 ↔ Global ID 
const allowedStops = {
  "Am Gasteig":                          "de:09162:71",
  "Ampfingstraße":                       "de:09162:901",
  "Albrechtstraße":                      "de:09162:104",
  "Ackermannstraße":                     "de:09162:309",
  "Arabellastraße":                      "de:09162:651",
  "Am Lokschuppen":                      "de:09162:1206",
  "Arabellapark/Klinikum Bogenh.":       "de:09162:655",
  "Agnes-Bernauer-Straße":               "de:09162:1204",
  "Ammerseestraße":                      "de:09162:1516",
  "Amalienburgstraße":                   "de:09162:210",
  "Am Knie":                             "de:09162:1614",
  "Augsburg Hbf.":                       "de:09761:100",
  "Am Münchner Tor":                     "de:09162:501",
  "Anni-Albers-Straße":                  "de:09162:988",
  "Authariplatz":                        "de:09162:1121",
  "Agnes-Bernauer-Platz":                "de:09162:1604",
  "Pasing":                              "de:09162:10",
  "Afrabrücke":                          "de:09761:770",
  "Am Eiskanal":                         "de:09761:769",
  "Alpenhof":                            "de:09761:404",
  "Augsburg West P+R":                   "de:09761:390",
  "Carl-Amery-Platz":                    "de:09162:149",
  "Augsburger Str.":                     "de:09772:148",
  "Aufseßplatz":                         "de:09564:534",
  "München, Ostbahnhof":                 "de:09162:5",
  "Hauptbahnhof Bahnhofsplatz":         "de:09162:6",
  "Berg am Laim":                        "de:09162:910",
  "Karlsplatz (Stachus)":                "de:09162:1",
  "Barbarastraße":                       "de:09162:107",
  "Baumkirchner Straße":                 "de:09162:903",
  "Bundesfinanzhof":                     "de:09162:91",
  "Botanischer Garten":                  "de:09162:211",
  "Barthstraße":                         "de:09162:64",
  "Bavariafilmplatz":                    "de:09184:2458",
  "Bahnhof Haunstetterstraße":           "de:09761:111",
  "Burghausener Straße":                 "de:09162:218",
  "Bahnhof Oberhausen":                  "de:09761:400",
  "Briefzentrum":                        "de:09162:217",
  "Moosach":                             "de:09162:300",
  "Borstei":                             "de:09162:305",
  "Giesing":                             "de:09162:1110",
  "Baugenossenschaft":                   "de:09761:736",
  "Beim Dürren Ast":                     "de:09761:123",
  "Bischofsackerweg":                    "de:09761:129",
  "BBW/Institut f.Physik":               "de:09761:524",
  "Bukowina-Institut/PCI":               "de:09761:141",
  "Berufsschule":                        "de:09761:525",
  "Berliner Allee":                      "de:09761:227",
  "Barfüßerbrücke/Brechthaus":           "de:09761:131",
  "Burgfrieden":                         "de:09761:112",
  "Bergstraße":                          "de:09761:713",
  "Bgm.-Bohl-Straße":                    "de:09761:526",
  "Bärenwirt/DRvS":                      "de:09761:403",
  "Isartor":                             "de:09162:3",
  "Bereitschaftspolizei":                "de:09772:147",
  "Brahmsstraße":                        "de:09761:146",
  "Hauptbahnhof Süd":                    "de:09162:5000",
  "Hauptbahnhof Nord":                   "de:09162:7000",
  "Holzkirchner Bahnhof":                "de:09162:90",
  "Chiemgaustraße":                      "de:09162:1108",
  "Cosimabad":                           "de:09162:653",
  "Clemensstraße":                       "de:09162:422",
  "Curtiusstraße":                       "de:09761:692",
  "Curt-Frenzel-Stadion":                "de:09761:532",
  "Friedberg West P+R":                  "de:09771:2086",
  "Lechh. N. Ostfriedhof":               "de:09761:695",
  "Schwaben Center":                     "de:09761:26",
  "Inninger Straße P+R":                "de:09761:276",
  "Sportanlage Süd P+R":                 "de:09761:761",
  "Plärrer P+R":                         "de:09761:401",
  "Oberhausen Nord P+R":                 "de:09761:422",
  "Celtisplatz":                         "de:09564:530",
  "Christuskirche":                      "de:09564:533",
  "Cuxhavener Str.":                     "de:09564:1294",
  "Congress-Centrum":                    "de:09663:96",
  "Deutsches Museum":                    "de:09162:69",
  "Donnersbergerstraße":                 "de:09162:54",
  "Deroystraße":                         "de:09162:223",
  "Domagkstraße":                        "de:09162:502",
  "Dall'Armistraße":                     "de:09162:213",
  "Derbolfinger Platz":                  "de:09184:2456",
  "Dom/Stadtwerke":                      "de:09761:664",
  "Drentwettstraße":                     "de:09761:543",
  "Westfriedhof":                        "de:09162:200",
  "Nationalmuseum/Haus der Kunst":       "de:09162:81",
  "Eduard-Schmid-Straße":                "de:09162:41",
  "Einsteinstraße":                      "de:09162:662",
  "Effnerplatz":                         "de:09162:650",
  "Elisabethplatz":                      "de:09162:47",
  "Eberlestraße":                        "de:09761:240",
  "Eschenhof":                           "de:09761:409",
  "Elias-Holl-Straße":                   "de:09772:544",
  "Fraunhoferstraße":                    "de:09162:150",
  "Friedensengel/Villa Stuck":           "de:09162:73",
  "Flurstraße":                          "de:09162:22",
  "Fasaneriestraße":                     "de:09162:105",
  "Fürstenrieder Straße":                "de:09162:1602",
  "Fritz-Meyer-Weg":                     "de:09162:601",
  "Fachnerstraße":                       "de:09162:1208",
  "Münchner Freiheit":                   "de:09162:500",
  "Hochschule München (Lothstr.)":       "de:09162:12",
  "Fachoberschule":                      "de:09761:113",
  "Fuggerei":                            "de:09761:311",
  "Frohsinnstraße":                      "de:09761:312",
  "Fischertor":                          "de:09761:547",
  "Westendstraße":                       "de:09162:260",
  "Friedrich-Ebert-Platz":               "de:09564:232",
  "Frankenstr.":                         "de:09564:561",
  "Finkenbrunn":                         "de:09564:1758",
  "Maria-Alber":                         "de:09771:2085",
  "Fechenbachstraße":                    "de:09663:139",
  "Felix-Fechenbach-Haus":               "de:09663:157",
  "Fliegerstr.":                         "de:09564:440",
  "Grillparzerstraße":                   "de:09162:23",
  "Großhesseloher Brücke":               "de:09162:1125",
  "Gartenstraße":                        "de:09162:308",
  "Gondrellplatz":                       "de:09162:1554",
  "Gärtnerstraße":                       "de:09761:557",
  "Wettersteinplatz":                    "de:09162:1190",
  "Heideckstraße":                       "de:09162:307",
  "Göggingen, Rathaus":                  "de:09761:719",
  "Guldenstraße":                        "de:09772:7008",
  "Göggingen":                           "de:09761:723",
  "Rud.-Diesel-Gym.":                    "de:09761:771",
  "Gibitzenhof":                         "de:09564:1730",
  "Hohenzollernplatz":                   "de:09162:140",
  "Hackerbrücke":                        "de:09162:7",
  "Haidenauplatz":                       "de:09162:46",
  "Herkomerplatz":                       "de:09162:76",
  "Hopfenstraße":                        "de:09162:232",
  "Hermann-Lingg-Straße":                "de:09162:55",
  "Holbeinstraße":                       "de:09162:74",
  "Holzapfelstraße":                     "de:09162:67",
  "Hans-Thonauer-Straße":                "de:09162:1214",
  "Hanauer Straße":                      "de:09162:304",
  "Hochschule München":                  "de:09162:32",
  "Herzogstraße":                        "de:09162:311",
  "Hubertusstraße":                      "de:09162:221",
  "Hugo-Troendle-Straße":                "de:09162:302",
  "Hochzoll Mitte":                      "de:09761:247",
  "Hochschule Augsburg":                 "de:09761:768",
  "Herz-Jesu-Kirche":                    "de:09761:242",
  "Heimgarten":                          "de:09761:568",
  "Haunstetten Nord":                    "de:09761:170",
  "Hötzelstraße":                        "de:09761:735",
  "Hofackerstraße":                      "de:09761:127",
  "Hessing-Kliniken":                    "de:09761:721",
  "Haunstetten Südwest":                 "de:09761:145",
  "Klinikum Harlaching":                 "de:09162:1123",
  "Th.-Heuss-Platz/IHK":                 "de:09761:132",
  "Infanteriestraße":                    "de:09162:106",
  "Innovationspark/LfU":                 "de:09761:107",
  "Innsbruck Hauptbahnhof":              "at:47:1187",
  "Innsbruck Westbahnhof":               "at:47:1189",
  "Max-Weber-Platz":                     "de:09162:580",
  "Jakobertor":                          "de:09761:211",
  "Max-Weber-Platz (Johannispl.)":       "de:09162:581",
  "Juvenellstr.":                        "de:09564:231",
  "Julienstr.":                          "de:09564:236",
  "Juliuspromenade":                     "de:09663:208",
  "Josefskirche":                        "de:09663:209",
  "Judenbühlweg":                        "de:09663:211",
  "Kammerspiele":                        "de:09162:18",
  "Kreillerstraße":                      "de:09162:1230",
  "Karlstraße":                          "de:09162:15",
  "Karolinenplatz":                      "de:09162:52",
  "Kurfürstenplatz":                     "de:09162:43",
  "Kölner Platz":                        "de:09162:435",
  "Karl-Theodor-Straße":                 "de:09162:421",
  "Kurzstraße":                          "de:09162:1117",
  "Kriemhildenstraße":                   "de:09162:219",
  "KUKA/Partnachweg":                    "de:09761:693",
  "Kulturstraße":                        "de:09761:691",
  "Königsplatz":                         "de:09761:101",
  "Kongress am Park":                    "de:09761:114",
  "Klinkertor":                          "de:09761:588",
  "Kriegshaber":                         "de:09761:408",
  "Pinakotheken":                        "de:09162:51",
  "Kopernikusstraße":                    "de:09761:128",
  "Klausenberg":                         "de:09761:718",
  "Mozarthaus/Kolping":                  "de:09761:618",
  "Kohlenhof":                           "de:09564:630",
  "Klingenstraße":                       "de:09663:220",
  "Königsberger Straße":                 "de:09663:230",
  "Zentrum":                             "de:09772:7050",
  "Lehel":                               "de:09162:590",
  "Lenbachplatz":                        "de:09162:16",
  "Leonrodplatz":                        "de:09162:11",
  "Lautensackstraße":                    "de:09162:1202",
  "Lohensteinstraße":                    "de:09162:1608",
  "Ludwig-Thoma-Straße":                 "de:09184:2464",
  "Stiglmaierplatz":                     "de:09162:170",
  "Scheidplatz":                         "de:09162:400",
  "Lechhausen Schlößle":                 "de:09761:210",
  "Luitpoldbrücke":                      "de:09761:248",
  "Marienplatz (Theatinerstraße)":       "de:09162:20",
  "Müllerstraße":                        "de:09162:38",
  "Mariannenplatz":                      "de:09162:84",
  "Maxmonument":                         "de:09162:19",
  "Mariahilfplatz":                      "de:09162:42",
  "Mauerkircherstraße":                  "de:09162:77",
  "Maximilianeum":                       "de:09162:21",
  "MVG Museum":                          "de:09162:8019",
  "Marsstraße":                          "de:09162:222",
  "Maria-Ward-Straße":                   "de:09162:212",
  "Sendlinger Tor":                      "de:09162:50",
  "Mutschellestraße":                    "de:09162:904",
  "Menterschwaige":                      "de:09162:1124",
  "Moritzplatz":                         "de:09761:617",
  "Maria Stern":                         "de:09761:715",
  "Silberhornstraße":                    "de:09162:1170",
  "Nationaltheater":                     "de:09162:17",
  "Wiener Platz":                        "de:09162:72",
  "Mindelheimer Str.":                   "de:09772:149",
  "Rotkreuzplatz":                       "de:09162:190",
  "Petuelring":                          "de:09162:340",
  "Nordbad":                             "de:09162:34",
  "Nordendstraße":                       "de:09162:48",
  "Neuhausen":                           "de:09162:204",
  "Nürnberg Hbf":                        "de:09564:510",
  "Neusässer Straße":                    "de:09761:412",
  "Nürnberg-Mögeldorf":                  "de:09564:1431",
  "Nürnberg-Dürrenhof":                  "de:09564:427",
  "Nürnberg-Steinbühl":                  "de:09564:620",
  "Ottostraße":                          "de:09162:53",
  "Ostfriedhof":                         "de:09162:1105",
  "Olympiapark West":                    "de:09162:306",
  "Offenbachstraße":                     "de:09162:1618",
  "St.-Martins-Platz":                   "de:09162:1106",
  "Obere Turnstr.":                      "de:09564:730",
  "Paradiesstraße":                      "de:09162:79",
  "Potsdamer Straße":                    "de:09162:434",
  "Parzivalplatz":                       "de:09162:433",
  "Prinz-Eugen-Park":                    "de:09162:632",
  "Pelkovenstraße":                      "de:09162:301",
  "Parkplatz":                           "de:09184:2462",
  "Pilgerhausstraße":                    "de:09761:214",
  "Polizeipräsidium":                    "de:09761:118",
  "Pfersee":                             "de:09761:606",
  "Reichenbachplatz":                    "de:09162:68",
  "Plärrer":                             "de:09564:704",
  "Rosenheimer Platz":                   "de:09162:4",
  "Regerplatz":                          "de:09162:111",
  "Riedenburger Straße":                 "de:09162:646",
  "Romanplatz":                          "de:09162:215",
  "Regina-Ullmann-Straße":               "de:09162:556",
  "Rathaus Pasing":                      "de:09162:1624",
  "Renatastraße":                        "de:09162:220",
  "Rotes Tor":                           "de:09761:116",
  "Rathausplatz":                        "de:09761:150",
  "Rosenaustraße":                       "de:09761:642",
  "Robert-Koch-Straße":                  "de:09184:2460",
  "Rathenauplatz":                       "de:09564:332",
  "Reuterstraße":                        "de:09663:321",
  "Rottenbauer":                         "de:09663:338",
  "Ruderzentrum":                        "de:09663:180",
  "R.-Koch-Str. Uni-Klinikum Bereich B/C": "de:09663:328",
  "Schellingstraße":                     "de:09162:49",
  "Schlüsselbergstraße":                 "de:09162:902",
  "Sandstraße":                          "de:09162:13",
  "Schwanseestraße":                     "de:09162:1109",
  "Steubenplatz":                        "de:09162:216",
  "Siglstraße":                          "de:09162:1216",
  "Schlösselgarten":                     "de:09162:633",
  "Sternwartstraße":                     "de:09162:75",
  "St.-Veit-Straße":                     "de:09162:906",
  "Schloss Nymphenburg":                 "de:09162:214",
  "Schrenkstraße":                       "de:09162:66",
  "Schwabing Nord":                      "de:09162:503",
  "St. Emmeram":                         "de:09162:600",
  "Schwabinger Tor":                     "de:09162:459",
  "Südtiroler Straße":                   "de:09162:1118",
  "Säulingstraße":                       "de:09162:1212",
  "Stadtwerke München":                  "de:09162:285",
  "Stegener Weg":                        "de:09162:1213",
  "Senftenauerstraße":                   "de:09162:1552",
  "Schilcherweg":                        "de:09162:1126",
  "Schertlinstraße":                     "de:09761:12",
  "Schleiermacherstraße":                "de:09761:310",
  "Staatstheater":                       "de:09761:105",
  "Senkelbach":                          "de:09761:402",
  "St. Thaddäus":                        "de:09761:168",
  "Stadtberger Hof":                     "de:09772:662",
  "Schärtlstraße":                       "de:09761:620",
  "Stadtbergen":                         "de:09772:659",
  "Stenglinstraße":                      "de:09761:391",
  "Tivolistraße":                        "de:09162:78",
  "Tegernseer Landstraße":               "de:09162:1115",
  "Trappentreustraße":                   "de:09162:65",
  "Taimerhofstraße":                     "de:09162:637",
  "Tiroler Platz":                       "de:09162:1119",
  "Theodolindenplatz":                   "de:09162:1122",
  "Textilmuseum":                        "de:09761:161",
  "Universität":                         "de:09761:119",
  "Ulrichsbrücke":                       "de:09761:226",
  "Uniklinik BKH":                       "de:09761:417",
  "Uni-Klinikum Bereich D":              "de:09663:252",
  "Ulmer Hof":                           "de:09663:431",
  "Vogelweideplatz":                     "de:09162:612",
  "Volkartstraße":                       "de:09162:205",
  "Volkssiedlung":                       "de:09761:122",
  "Von-Parseval-Straße":                 "de:09761:121",
  "Werinherstraße":                      "de:09162:1107",
  "Wörthstraße":                         "de:09162:88",
  "Wintrichring":                        "de:09162:303",
  "Willibaldplatz":                      "de:09162:1606",
  "Westbad":                             "de:09162:1612",
  "Wertachbrücke":                       "de:09761:407",
  "Westfriedhof":                        "de:09761:684",
  "Wilhelm-Hauff-Straße":                "de:09162:166",
  "WWK ARENA":                           "de:09162:996",
  "Wöhrder Wiese":                       "de:09564:333",
  "Platz d. Opfer d. F.":                "de:09564:445",
  "Pestalozzistr. Uni-Klinikum Bereich A":"de:09663:307",
  "Zollernstraße":                       "de:09761:421"
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
