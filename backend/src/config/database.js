require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('AImposter', 'postgres', 'Baran9940', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
});


module.exports = sequelize;
