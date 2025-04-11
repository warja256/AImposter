require('dotenv').config();
const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('AImposter', 'postgres', 'Baran9940', {
//const sequelize = new Sequelize('AImposter', 'varvarakusaeva', 'Privet2024', {
// const sequelize = new Sequelize('AImposter', 'postgres', 'fde2a1c7', {
const sequelize = new Sequelize('AImposter', 'postgres', '06190706', {

//const sequelize = new Sequelize('AImposter', '#имя_пользователя', '#пароль', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
});


module.exports = sequelize;
