const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

// Kullanıcı veritabanı
const users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "gizliAnahtar",
    resave: false,
    saveUninitialized: false
}));

// Statik dosyalar için frontend klasörünü kullan
app.use(express.static("frontend"));

// Giriş sayfası
app.get("/", (req, res) => {
    if (req.session.user) {
        res.send(`<h1>Hoş Geldin, ${req.session.user.username}!</h1>
                  <a href="/logout">Çıkış Yap</a>`);
    } else {
        res.sendFile(__dirname + "/frontend/login.html");
    }
});

// Kullanıcı kayıt sayfası
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/frontend/register.html");
});

// Kayıt işlemi
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.redirect("/");
});

// Giriş işlemi
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.redirect("/");
    } else {
        res.send("Kullanıcı adı veya şifre yanlış!");
    }
});

// Çıkış işlemi
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
