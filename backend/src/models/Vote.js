const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vote = sequelize.define('Vote', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomId: { type: DataTypes.INTEGER },  // ID комнаты, где проходит игра
    voterId: { type: DataTypes.INTEGER },  // ID голосующего игрока
    targetId: { type: DataTypes.INTEGER },  // ID целевого игрока
});

module.exports = Vote;