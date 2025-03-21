const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    playerId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    room_round: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Message;