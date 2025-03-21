const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const GameSession = require('./GameSession');

const Player = sequelize.define('Player', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.ENUM('mafia', 'civilian'), defaultValue: 'civilian' },
    status: { type: DataTypes.ENUM('alive', 'dead'), defaultValue: 'alive' },
});

// Ассоциация между Player и GameSession
Player.hasMany(GameSession, {
    foreignKey: 'playerId',
    onDelete: 'CASCADE',  // Каскадное удаление записей в GameSession при удалении игрока
});

module.exports = Player;
