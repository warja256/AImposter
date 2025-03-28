const { Message, Room } = require('../models'); // Добавляем Room
const { io } = require("../websocket"); // Импорт WebSocket-сервера

// Функция отправки сообщения
const sendMessage = async (req, res) => {
    try {
        const { roomCode } = req.params; // Теперь принимаем код комнаты
        const { playerId, content } = req.body;

        // Находим комнату по её коду
        const room = await Room.findOne({ where: { roomCode } });
        if (!room) {
            return res.status(404).json({ message: "Комната не найдена" });
        }

        const roundNumber = room.round; // Получаем текущий раунд

        // Сохраняем сообщение в базу
        const newMessage = await Message.create({
            playerId: playerId,
            Coderoom: roomCode,
            roundNumber: roundNumber,
            content: content
        });

        // Буфер сообщений
        if (!global.messageBuffer[roomCode]) {
            global.messageBuffer[roomCode] = [];
        }
        global.messageBuffer[roomCode].push(newMessage);

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Функция получения сообщений за текущий раунд
const getMessages = async (req, res) => {
    try {
        const { Coderoom } = req.params;

        // Находим комнату по коду
        const room = await Room.findOne({ where: { roomCode: Coderoom } });
        if (!room) {
            return res.status(404).json({ error: "Комната не найдена" });
        }

        const currentRound = room.round;

        // Получаем сообщения только за этот раунд
        const messages = await Message.findAll({
            where: { Coderoom: Coderoom, roundNumber: currentRound },
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { sendMessage, getMessages };

// Функция отправки сообщения
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