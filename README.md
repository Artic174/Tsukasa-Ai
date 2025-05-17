
<p align="center">
  <img src="https://files.catbox.moe/d4iulg.jpg" width="250"/>
</p>

<h1 align="center">Tsukasa Ai - WhatsApp Bot</h1>


---

## 👤 Owner

> GitHub: [Artic174](https://github.com/LeooxzyDekuu.png)  
> Project: **Tsukasa Ai WhatsApp Bot**

---

> Bot WhatsApp modular yang kuat menggunakan JavaScript, dibuat dengan sistem plugin untuk fleksibilitas maksimal. Terinspirasi oleh **Yuzaki Nasa** dari *Tonikaku Kawaii*, bot ini menghadirkan semangat dan disiplin dalam obrolan Anda!

---

## 📌 Features

- Arsitektur berbasis plugin
- Ditulis dalam JavaScript
- Kompatibel dengan CommonJS & ESModule
- Pembuatan perintah yang mudah
- Terinspirasi oleh karakter anime Yuzaki Nasa

---

## ⚙️ Config.js

```javascript
const config = {
    owner: ["6285136373904"],
    name: "Tsukasa Ai",
    ownername: 'Yuzaki Nasa', 
    ownername2: 'Yuzaki Network',
    image: { url: 'https://files.catbox.moe/d4iulg.jpg' }, //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    thumbnail: {
      thumbnailUrl: 'https://files.catbox.moe/d4iulg.jpg'
      //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    },
    isQr = false,
    prefix: [".", "?", "!", "/", "#"], //Tambahin sendiri prefix nya kalo kurang
    wagc: [ "https://chat.whatsapp.com/K38kIZaM7ms2ZDnvpwmUSB", "https://chat.whatsapp.com/CMND3t4Pkcb6MSV0pHeEg3" ],
    saluran: '120363386413320563@newsletter', 
    jidgroupnotif: '120363416967696533@g.us',  
    saluran2: '120363405170938560@newsletter', 
    jidgroup: '120363267102694949@g.us', 
    wach: 'https://whatsapp.com/channel/0029Vb4ngq4CxoB5889HOQ2V', 
    sessions: "sessions",
    groq: {
     api: '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'
    },
    link: {
     tt: "https://www.tiktok.com/@_yuzakinasa/"
    },
    sticker: {
      packname: "Send With Love~",
      author: "By: Tsukasa Ai"
    },
   messages: {
      wait: "*( Loading )* Tunggu Sebentar...",
      owner: "*( Denied )* Kamu bukan owner ku !",
      premium: "*( Denied )* Fitur ini khusus user premium",
      group: "*( Denied )* Fitur ini khusus group",
      botAdmin: "*( Denied )* Lu siapa bukan Admin group",
      grootbotbup: "*( Denied )* Jadiin Tsukasa admin dulu baru bisa akses",
   },
   database: "yuzaki-db",
   tz: "Asia/Jakarta"
}

module.exports = config
```

## ⚙️ Install
```bash
$ git clone https://github.com/Artic174/Tsukasa-Ai
$ cd Tsukasa-Ai
$ npm install
$ npm start
```

## 🌐 Commonjs Example File .js

## 🧠 Example Plugin (No Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = ['expired', 'exp'];
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

module.exports = handler;
```

---

## ⚡ Example Plugin (With Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = /^(expired|exp)$/i;
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

module.exports = handler;
```

---

## 🌐 ECMAScript Module Example File .mjs

## 🧠 Example Plugin (No Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = ['expired', 'exp'];
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

export default handler;
```

---

## ⚡ Example Plugin (With Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = /^(expired|exp)$/i;
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

export default handler;
```

---

## 💡 Command Fitur Plugin/Scrape

```Plugin
.plugin - buat liat list plugins
.plugin --add file/file.js / .plugin --add file/file.mjs - Buat Add Fitur
.plugin --get file/file.js / .plugin --get file/file.mjs - Buat Get Fitur
.plugin --delete file/file.js / .plugin --delete file/file.mjs - Buat Delete Fitur
```

```Scrape
.skrep - buat liat list skrep
.skrep --add file/file.js / .skrep --add file/file.mjs - Buat Add Skrep
.skrep --get file/file.js / .skrep --get file/file.mjs - Buat Get Skrep
.skrep --delete file/file.js / .skrep --delete file/file.mjs - Buat Delete Skrep
```

---

---

## 💡 Menu Command

```
.menu       - Show main menu
.menu all   - Show all commands
.menu tags  - Show commands by tags
```

---


## 👥 All Contributors
[![LeooxzyDekuu](https://github.com/LeooxzyDekuu.png?size=100)](https://github.com/LeooxzyDekuu) | [![AxellNetwork](https://github.com/AxellNetwork.png?size=100)](https://github.com/AxellNetwork) | [![AndhikaGG](https://github.com/AndhikaGG.png?size=100)](https://github.com/AndhikaGG)  
---|---|---  
[LeooxzyDekuu](https://github.com/LeooxzyDekuu) | [AxellNetwork](https://github.com/AxellNetwork) | [AndhikaGG](https://github.com/AndhikaGG)  
Remake Base | Base Script | Penyumbang fitur

---

> *"Api pengusir setan akan menuntun perintahmu. Jangan takut pada iblis, jadilah tuan."*
