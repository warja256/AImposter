const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GameSession = sequelize.define('GameSession', {
    id: { type: DataTypes.STRING, primaryKey: true },
    playerId: { type: DataTypes.STRING, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = GameSession;