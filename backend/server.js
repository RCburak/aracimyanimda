const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');

require('dotenv').config({ path: 'lock.env' });


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// Bağlantıyı kontrol et
db.connect((err) => {
  if (err) {
    console.error('MySQL bağlantı hatası:', err);
    return;
  }
  console.log('MySQL veritabanına bağlanıldı.');
});

app.use(express.json()); // JSON formatında veri almak için

// Araçları listelemek için yeni endpoint
app.get('/araclar', (req, res) => {
  const sql = 'SELECT * FROM araclar';  // Tüm araçları al
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Veri çekme hatası:', err);
      return res.status(500).send('Veri çekme hatası');
    }
    res.json(result);  // Araç verilerini JSON olarak gönder
  });
});

// Statik dosyaları sunmak için frontend klasörünü kullanıyoruz
app.use(express.static(path.join(__dirname, '../frontend')));

// Ana sayfa isteği için index.html döndürüyoruz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});


// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});