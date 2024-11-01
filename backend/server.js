// Gerekli modülleri ekliyoruz
const express = require('express'); // Bunu yalnızca bir kez eklemelisiniz
const path = require('path');
const app = express();
const PORT = 3000;

// Statik dosyaları sunmak için frontend klasörünü kullanıyoruz
app.use(express.static(path.join(__dirname, '../frontend')));

// Ana sayfa isteği için index.html döndürüyoruz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Basit bir API: Araç listesi döndürüyor
app.get('/araclar', (req, res) => {
    const araclar = [
        { marka: 'BMW', model: 'X5', yil: 2021, kiralik: true },
        { marka: 'Mercedes', model: 'C200', yil: 2020, kiralik: false },
        { marka: 'Audi', model: 'A3', yil: 2019, kiralik: true }
    ];
    res.json(araclar);
});

// Sunucuyu çalıştırıyoruz
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
