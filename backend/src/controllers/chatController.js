const { Message } = require('../models');  // импортируем модель сообщения

// Отправка сообщения
const sendMessage = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { playerId, content } = req.body;

        const message = await Message.create({ roomId, playerId, content });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить сообщения
const getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await Message.findAll({ where: { roomId } });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendMessage, getMessages };
