const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// CORS ayarları
app.use(cors());
app.use(express.json());

// Araç verilerini almak için bir endpoint
app.get('/api/cars', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
        headers: {
            'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Veri çekme hatası');
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
