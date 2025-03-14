const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
    id: { type: DataTypes.STRING, primaryKey: true },
    round: { type: DataTypes.INTEGER, defaultValue: 1 },
    status: { type: DataTypes.ENUM('day', 'night'), defaultValue: 'day' },
    playerCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Room;
