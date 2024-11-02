// Gerekli modülleri ekliyoruz
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS için ekliyoruz

const app = express();
const PORT = 3000;

// CORS ayarları
app.use(cors());

// Body parser ve statik dosya ayarları
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// MySQL veritabanı bağlantısı
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Veritabanı kullanıcı adı
    password: '',        // Veritabanı şifreniz
    database: 'auth_db'  // Veritabanı adı
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Bağlandı');
});

// Ana sayfa isteği için index.html döndürüyoruz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Kayıt API'si
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // E-posta var mı kontrolü
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı!' });
        }

        // Şifreyi hashle ve kullanıcıyı kaydet
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err, result) => {
                if (err) throw err;
                res.status(201).json({ message: 'Kayıt başarılı!' });
            });
    });
});

// Giriş API'si
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Kullanıcıyı veritabanında ara
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(400).json({ message: 'E-posta veya şifre yanlış!' });
        }

        const user = results[0];

        // Şifre doğrulama
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'E-posta veya şifre yanlış!' });
        }

        // Token oluştur
        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
        res.json({ message: 'Giriş başarılı!', token });
    });
});

// Sunucuyu çalıştırıyoruz
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
