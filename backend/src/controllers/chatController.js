const { Message } = require('../models');  // импортируем модель сообщения
const { io } = require("../websocket"); // Импорт WebSocket-сервера

// Отправка сообщения

// Функция отправки сообщения (через WebSocket)
const sendMessage = async (req, res) => {
    try {
      const { roomId, playerId, roundNumber, content } = req.body;
      // Сохранение сообщения в БД
      const newMessage = await Message.create({ roomId, playerId, roundNumber, content });

      // Отправка сообщения в WebSocket-буфер
      if (!global.messageBuffer[roomId]) {
        global.messageBuffer[roomId] = [];
      }
      global.messageBuffer[roomId].push(newMessage);
  
      return res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

// const sendMessage = async (req, res) => {
//     try {
//         const { roomId } = req.params;
//         const { playerId, content } = req.body;
//         const message = await Message.create({ roomId, playerId, content });
//         res.status(200).json(message);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




// Получение сообщений в комнате за текущий раунд
const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Находим комнату и её текущий раунд
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ error: "Комната не найдена" });
    }

    // Получаем текущий раунд
    const currentRound = room.currentRound;

    // Получаем сообщения только за этот раунд
    const messages = await Message.findAll({
      where: { roomId, roundNumber: currentRound },
    });

    return res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Получить все сообщения в комнате
// const getMessages = async (req, res) => {
//     try {
//         const { roomId } = req.params;
//         const messages = await Message.findAll({ where: { roomId } });
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Получить все сообщения в комнате в данном раунде
// const getMessages = async (req, res) => {
//     try {
//         const { roomId } = req.params;
//         const messages = await Message.findAll({ where: { roomId } });
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports = { sendMessage, getMessages };
