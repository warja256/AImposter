const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    round: { type: DataTypes.INTEGER, defaultValue: 1 },
    status: { type: DataTypes.ENUM('day', 'night'), defaultValue: 'day' },
    playerCount: { type: DataTypes.INTEGER, defaultValue: 1 },
    roomCode: {
        type: DataTypes.STRING(4),
        unique: true,  // Уникальность кода
        allowNull: false,
        validate: {
            len: [4],  // Длина кода ровно 4 символа
        },
    },
});


module.exports = Room;
