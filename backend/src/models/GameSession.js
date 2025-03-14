const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GameSession = sequelize.define('GameSession', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    playerId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = GameSession;