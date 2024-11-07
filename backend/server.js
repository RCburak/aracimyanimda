// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL veritabanı bağlantısı
const db = mysql.createConnection({
  host: 'localhost',       // Veritabanı sunucusunun adresi
  user: 'root',            // Veritabanı kullanıcı adı
  password: '',            // Veritabanı şifresi
  database: 'car_rentals'  // Veritabanı adı
});

// Veritabanı bağlantısı
db.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
    return;
  }
  console.log('Veritabanına başarılı bir şekilde bağlanıldı.');
});

// Arabaları alacak API route
app.get('/api/get_cars', (req, res) => {
  const query = 'SELECT * FROM cars';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Veritabanı hatası' });
      return;
    }
    res.json(results);  // Arabaları JSON formatında gönder
  });
});

// Sunucu başlatma
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
