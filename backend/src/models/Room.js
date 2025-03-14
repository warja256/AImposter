const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    round: { type: DataTypes.INTEGER, defaultValue: 1 },
    status: { type: DataTypes.ENUM('day', 'night'), defaultValue: 'day' },
    playerCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    roomCode: {  // Новое поле для кода комнаты
        type: DataTypes.STRING(4),
        unique: true,  // Уникальность кода
        allowNull: false,
        validate: {
            len: [4],  // Длина кода ровно 4 символа
        },
    },
}, {
    hooks: {
        beforeCreate: async (room) => {  // Используем хук beforeCreate
            room.roomCode = generateRandomCode();  // Устанавливаем код перед созданием
        },
    },
});

function generateRandomCode() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);  // Случайное число от 0 до 9
    }
    return code;
}

module.exports = Room;
