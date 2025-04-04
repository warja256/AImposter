// src/controllers/roomController.js
const { Room, Player, GameSession } = require('../models'); // Импортируем модели из бд


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

        
        const newPlayer = await Player.create({ name: playerName });
        const newRoom = await Room.create({roomCode: roomCode, creator: newPlayer.id});  // Создаём комнату

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

const leaveRoom = async (req, res) => {
    try {
        //берем код из ссылки и айди из тела запроса
        const {roomCode} = req.params;
        const {playerId} = req.body;
        //находим игрока
        const leavingPlayer = await Player.findByPk(playerId);
        if (!leavingPlayer){
            return res.status(404).json({message: "Игрок не найден"});
        }
        //находим комнату
        const room = await Room.findOne({where: {roomCode}, include: [Player]});
        if (!room){
            return res.status(404).json({message: "Комната не найдена"});
        }
        //находим сессию
        const gameSession = await GameSession.findOne(
            {where: {playerId: leavingPlayer.id, roomId: room.id}});
        if (!gameSession){
            return res.status(404).json({message: "Игрок не находится в этой комнате"});
        }
        //удалем игрока
        await leavingPlayer.destroy();
        await gameSession.destroy();  // Удаляем сессию игрока
        room.playerCount -= 1;
        await room.save();
        //проверяем комнату
        if (room.playerCount===0)
        {
            await room.destroy();
            return res.status(200).json({ message: 'Комната удалена' });
        }
        return res.status(200).json({ message: 'Игрок покинул комнату' });
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при выходе из комнаты', details: error.message });

    }
}

const chooseMafia = async (req,res) =>{
    try{
        const {roomCode} = req.params;
        const room = await Room.findOne({where: {roomCode}, include: [Player]});
        if (!room){
            return res.status(404).json({message: "Комната не найдена"});
        }
        
        const players = room.Players;
        if (players.length===0){
            return res.status(404).json({message: "В комнате нет игроков"});
        }

        const mafiaIndex = Math.floor(Math.random() *players.length);
        const mafia = players[mafiaIndex];

        await mafia.update({role: 'mafia'});
        res.status(200).json({mafiaId: mafia.id});


    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Ошибка при выборе мафии', details: error.message });

    }
}



const changeStatus  = async (req,res) =>{
    try{
        const {roomCode} = req.params;

        const room = await Room.findOne({where: {roomCode}});
        if (!room){
            return res.status(404).json({message: "Комната не найдена"});
        }

        const newStatus = room.status === "day" ? "night" : "day";
        await room.update({status: newStatus});

        res.status(200).json(room);

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Ошибка при смене статуса', details: error.message });
    }
}

module.exports = { createRoom, joinRoom, getRoom, leaveRoom, chooseMafia, changeStatus };
