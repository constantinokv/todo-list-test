const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: console.log 
    }
);

// Prueba de conexión
sequelize.authenticate()
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;