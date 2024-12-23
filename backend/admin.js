const express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const { Sequelize, DataTypes } = require('sequelize');

// Express instance oluştur
const app = express();

// Sequelize MySQL bağlantısı oluştur
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Kullanıcı Modelini Tanımla
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const adminJs = new AdminJS({
  resources: [
    { resource: User }, // Kullanıcı modelini AdminJS arayüzüne ekliyoruz
  ],
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJs);

// AdminJS Router'ını Express'e bağla
app.use('/admin', router);

// MySQL bağlantısını başlat ve sunucuyu çalıştır
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('AdminJS yönetim paneli çalışıyor: http://localhost:3000/admin');
  });
}).catch((error) => {
  console.error('MySQL bağlantı hatası:', error);
});
