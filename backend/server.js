import express from 'express';
import mysql from 'mysql2/promise';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import axios from 'axios';
import bodyParser from 'body-parser';

// ES module için __filename ve __dirname kullanımı
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env dosyasını yükleyin
dotenv.config({ path: 'lock.env' });


const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

// Express uygulamasını oluştur
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL bağlantısı için MySQL2 kullanımı
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



// AdminJS yapılandırması
const adminJs = new AdminJS({
  databases: [], // Burada doğrudan tanımlama yapılabilir veya mysql2 kullanabilirsiniz
  rootPath: '/admin',
});
const adminRouter = AdminJSExpress.buildRouter(adminJs);

// MySQL bağlantısını kontrol edin
(async () => {
  try {
    await db.getConnection();
    console.log('MySQL veritabanına bağlanıldı.');
  } catch (err) {
    console.error('MySQL bağlantı hatası:', err);
    process.exit(1);
  }

  // Admin paneli rotasını uygulamaya ekleyin
  app.use(adminJs.options.rootPath, adminRouter);

  // Araçlar endpoint'i oluştur
  app.get('/araclar', async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM araclar');

      // Her araç için Unsplash API'sini çağırarak fotoğrafı al
      const carsWithImages = await Promise.all(results.map(async (car) => {
        const imageUrl = await fetchCarImageFromAPI(car); // Resim URL'sini al
        return {
          ...car, // Veritabanındaki araç verisi
          imageUrl, // Eklediğimiz resim URL'si
        };
      }));

      res.json(carsWithImages); // Araçları ve resimleri JSON formatında döndür
    } catch (err) {
      console.error('Veritabanı sorgu hatası:', err);
      res.status(500).send('Veritabanı hatası');
    }
  });

  // Frontend için statik dosyaları sun
  app.use(express.static(path.join(__dirname, '../frontend')));

  // Ana sayfa isteğini index.html döndür
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
  });

  // AI chat endpoint'i oluştur
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
      const response = await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        prompt: message,
        max_tokens: 100,
      });
      res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
      console.error('AI API hatası:', error);
      res.status(500).send('AI API hatası');
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
    console.log(`AdminJS paneli http://localhost:${PORT}/admin adresinde.`);
  });
})();

// Araç fotoğrafını Unsplash API'sinden çekme fonksiyonu
async function fetchCarImageFromAPI(car) {
  const query = `${car.marka} ${car.model}`; // Araç markası ve modeliyle arama yapıyoruz
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_API_KEY}`;

  try {
    const response = await axios.get(url); // Axios ile Unsplash API'ye istek gönder
    const data = response.data;

    // Eğer fotoğraf varsa, ilk fotoğrafın URL'sini döndür
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular; // İlk fotoğrafın 'regular' boyutundaki URL'si
    } else {
      return 'https://via.placeholder.com/300'; // Hata durumunda yedek görsel
    }
  } catch (error) {
    console.error('Resim alınırken hata oluştu:', error);
    return 'https://via.placeholder.com/300'; // Hata durumunda yedek görsel
  }
}
