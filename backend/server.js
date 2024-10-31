const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

// CORS'u etkinleştir
app.use(cors());

// Statik dosyaları sunmak için frontend klasörünü kullanıyoruz
app.use(express.static(path.join(__dirname, '../frontend')));

// Ana sayfa isteği için index.html döndürüyoruz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Araç markalarını almak için endpoint
app.get('/markalar', async (req, res) => {
    try {
        const response = await axios.get('https://car-api2.p.rapidapi.com/api/makes', {
            headers: {
                'x-rapidapi-host': 'car-api2.p.rapidapi.com',
                'x-rapidapi-key': '67f650a4demsh36d2d7835aa2d11p13cd10jsn791958a28200'
            }
        });
        res.json(response.data); // API yanıtını döndürüyoruz
    } catch (error) {
        console.error('API’den veri çekme hatası:', error);
        res.status(500).json({ error: 'Veri çekme hatası' });
    }
});

// Araç bilgilerini almak için endpoint
app.get('/arac/:make', async (req, res) => {
    const make = req.params.make;

    try {
        const response = await axios.get(`https://car-api2.p.rapidapi.com/api/make/${make}`, {
            headers: {
                'x-rapidapi-host': 'car-api2.p.rapidapi.com',
                'x-rapidapi-key': '67f650a4demsh36d2d7835aa2d11p13cd10jsn791958a28200'
            }
        });
        res.json(response.data); // API yanıtını döndürüyoruz
    } catch (error) {
        console.error('API’den veri çekme hatası:', error);
        res.status(500).json({ error: 'Veri çekme hatası' });
    }
});

// Sunucuyu çalıştırıyoruz
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
