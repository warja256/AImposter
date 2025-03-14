const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.ENUM('mafia', 'civilian'), defaultValue: 'civilian' },
    status: { type: DataTypes.ENUM('alive', 'dead'), defaultValue: 'alive' },
});

module.exports = Player;
