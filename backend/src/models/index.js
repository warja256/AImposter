const sequelize = require('../config/database');
const Player = require('./Player');
const Room = require('./Room');
const GameSession = require('./GameSession');
const Message = require('./Message');

Player.belongsToMany(Room, { through: GameSession, foreignKey: 'playerId' });
Room.belongsToMany(Player, { through: GameSession, foreignKey: 'roomId' });

Message.belongsTo(Player, { foreignKey: 'playerId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = { sequelize, Player, Room, GameSession, Message };