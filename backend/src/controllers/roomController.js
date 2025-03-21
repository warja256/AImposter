// src/controllers/roomController.js
const { Room, Player, GameSession } = require('../models'); // Импортируем модели из Sequelize (в соответствии с твоей моделью)


function generateRandomCode() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);  // Случайное число от 0 до 9
    }
    return code;
}
async function generateUniqueRoomCode() {
    while (true) {
        const randomCode = generateRandomCode();  // Генерируем случайный код
        
        // Проверяем, существует ли уже комната с таким кодом
        const existingRoom = await Room.findOne({ where: { roomCode: randomCode } });
        
        if (!existingRoom) {
            return randomCode;  // Возвращаем уникальный код
        }
    }
}

const createRoom = async (req, res) => {
    try {
        const {playerName} = req.body;
        const roomCode = await generateUniqueRoomCode(); 

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
        const { roomCode, playerName } = req.body;  // Получаем roomcode из тела запроса

        const room = await Room.findOne({ where: { roomCode } });  // Ищем комнату по code

        if (!room) {
            return res.status(404).json({ message: 'Комната не найдена'});
        }

        const player = await Player.create({ name: playerName });
        await room.update({ playerCount: room.playerCount + 1 });


        // Записываем информацию о присоединении игрока в таблицу сессии
        await GameSession.create({
            roomId: room.id,
            playerId: player.id,
        });

        res.status(200).json({room, player });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при присоединении к комнате', details: error.message });
    }
};

const getRoom = async (req, res) => {
    try {
        const { roomCode } = req.params;

        const room = await Room.findOne({
            where: {
                roomCode: roomCode
              },
              include: [{
                model: Player,
                attributes: ['id', 'name', 'avatar', 'role', 'status'],  // Выберите нужные поля
                through: { attributes: [] }  // Исключаем поля промежуточной таблицы
            }]
    }); 

        if (!room) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }

        res.status(200).json(room);  // Отправляем информацию о комнате
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении информации о комнате', details: error.message});
    }
};

const sendMessage = async (req, res) => {
    try {
        const { roomId, playerId, content } = req.body;
        
        const room = await Room.findByPk(roomId, { include: [Player] });
        if (!room) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }

        // Допустим, у нас есть таблица сообщений, куда мы будем записывать
        await Message.create({ roomId, playerId, content });

        res.status(200).json({ message: 'Сообщение отправлено', content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при отправке сообщения', details: error.message });
    }
};


module.exports = { createRoom, joinRoom, getRoom };
