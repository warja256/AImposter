const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const GameSession = require('./GameSession');

const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    round: { type: DataTypes.INTEGER, defaultValue: 1 },
    status: { type: DataTypes.ENUM('day', 'night'), defaultValue: 'day' },
    playerCount: { type: DataTypes.INTEGER, defaultValue: 1 },
    playStatus: {type: DataTypes.ENUM('stands', 'coming'), defaultValue: 'stands'},
    roomCode: {
        type: DataTypes.STRING(4),
        unique: true,  // Уникальность кода
        allowNull: false,
        validate: {
            len: [4],  // Длина кода ровно 4 символа
        },
    },
    creator: {type: DataTypes.INTEGER},
});

// Ассоциация между Room и GameSession
Room.hasMany(GameSession, {
    foreignKey: 'roomId',
    onDelete: 'CASCADE',  // Каскадное удаление записей в GameSession при удалении комнаты
});


module.exports = Room;
