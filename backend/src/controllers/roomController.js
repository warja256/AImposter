// src/controllers/roomController.js
const { Room, Player, GameSession } = require('../models'); // Импортируем модели из бд
const { generateToken } = require("../auth");


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
        const newRoom = await Room.create({roomCode: roomCode, creator: newPlayer.id});

        await GameSession.create({
            roomId: newRoom.id,
            playerId: newPlayer.id,
        });
        const token = generateToken(newPlayer);


        res.status(201).json({room: newRoom, player: newPlayer, token}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Ошибка создания комнаты и игрока!',
            details: error.message,
            stack: error.stack
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

        // Генерируем JWT
        const token = generateToken(player);

        res.status(200).json({room, player,token });
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

        let existingMafia = players.find(p => p.role==='mafia');
        if (existingMafia)
        {
            return res.status(400).json({message: "В комнате уже есть мафия"});
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



const isWin  = async (req,res) =>{
    try{
        const {roomCode} = req.params;

        const room = await Room.findOne({
            where: {
                roomCode: roomCode
              },
              include: [{
                model: Player,
                attributes: ['id', 'role', 'status'],  // Выберите нужные поля
                through: { attributes: [] }  // Исключаем поля промежуточной таблицы
            }]
        });

        if (!room){
            return res.status(404).json({message: "Комната не найдена"});
        }

        const players = room.Players;

        let aliveMafiaCount = 0;
        let aliveCivilianCount = 0;

        // Перебор массива players
        players.forEach(player => {
            if (player.status === 'alive') {
                if (player.role === 'mafia') {
                aliveMafiaCount++;
                } else if (player.role === 'civilian') {
                aliveCivilianCount++;
                }
            }
        });


        if (aliveMafiaCount === 0){
            res.status(200).json( {message: "civilian"}) ;
        } else if (aliveCivilianCount <= aliveMafiaCount){
            res.status(200).json( {message: "mafia"}) ;
        } else{
            res.status(200).json({message: "continue"});
        };

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Ошибка при смене статуса', details: error.message });
    }
}



module.exports = { createRoom, joinRoom, getRoom, leaveRoom, chooseMafia, changeStatus, isWin };
