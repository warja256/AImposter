// src/controllers/roomController.js
const { Room, Player, GameSession } = require('../models'); // Импортируем модели из Sequelize (в соответствии с твоей моделью)


function generateRandomCode() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);  // Случайное число от 0 до 9
    }
    return code;
}

const createRoom = async (req, res) => {
    try {
        const {playerName} = req.body;
        const roomCode = generateRandomCode();

        const newRoom = await Room.create({roomCode});  // Создаём комнату

        const newPlayer = await Player.create({ name: playerName });
        await GameSession.create({
            roomId: newRoom.id,
            playerId: newPlayer.id,
        });

        res.status(201).json({room: newRoom, player: newPlayer});  // Отправляем ответ с созданной комнатой
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Ошибка создания комнаты и игрока!',
            details: error.message,  // Добавление деталей ошибки
            stack: error.stack  // Полная трассировка стека (для разработки)
         });
    }
};

const joinRoom = async (req, res) => {
    try {
        const { roomId } = req.params;  // Получаем roomId из URL
        const { playerName } = req.body;  // Получаем имя игрока из тела запроса

        const room = await Room.findByPk(roomId);  // Ищем комнату по ID

        if (!room) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }

        const player = await Player.create({ name: playerName, roomId: room.id });  // Создаём нового игрока

        // Записываем информацию о присоединении игрока в таблицу сессии
        await Honor.create({ playerId: player.id, roomId: room.id });

        res.status(200).json({ message: 'Вы успешно присоединились к комнате', player, room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при присоединении к комнате' });
    }
};

const getRoom = async (req, res) => {
    try {
        const { roomId } = req.params;  // Получаем roomId из URL

        const room = await Room.findByPk(roomId, { include: [Player] });  // Ищем комнату по ID и включаем список игроков

        if (!room) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }

        res.status(200).json(room);  // Отправляем информацию о комнате
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении информации о комнате' });
    }
};

module.exports = { createRoom, joinRoom, getRoom };
