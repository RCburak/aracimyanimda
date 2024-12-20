const express = require('express');
const AdminJS = require('@adminjs/core');
const AdminJSExpress = require('@adminjs/express');

// AdminJS'in kurulumu
const adminJs = new AdminJS({
  databases: [], // Buraya veritabanınızı ekleyebilirsiniz
  rootPath: '/admin', // Admin paneline erişim yolu
});

// Express.js ile AdminJS Route oluşturma
const adminJsRouter = AdminJSExpress.buildRouter(adminJs);

// Express uygulamasını başlatma
const app = express();
app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`AdminJS paneli şu adreste çalışıyor: http://localhost:${PORT}${adminJs.options.rootPath}`);
});
