const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vote = sequelize.define('Vote', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomCode: { type: DataTypes.STRING },  // код комнаты
    voterId: { type: DataTypes.INTEGER },  // ID голосующего игрока
    targetId: { type: DataTypes.INTEGER },  // ID игрока за которого проголосовали
});

module.exports = Vote;