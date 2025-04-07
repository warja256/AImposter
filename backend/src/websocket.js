const { Server } = require("socket.io");
const { Room, Player, Message } = require("./models");
const { verifyToken } = require("./auth");

global.messageBuffer = {}; // Буфер сообщений

function startWebSocket(server) {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log(`Игрок подключился: ${socket.id}`);

        // Присоединение к комнате
        socket.on("joinRoom", async (data) => {
            try {
                const { token, roomCode, playerId} = data; // Читаем данные из запроса(токен, комната, сообщение)

                const decoded = verifyToken(token);
                if (!decoded) {
                    return socket.emit("error", "Неверный или истёкший токен!");
                }
        
                if (!roomCode) {
                    return socket.emit("error", "Код комнаты обязателен!");
                }
        
                const room = await Room.findOne({ where: { roomCode } });
        
                if (!room) {
                    return socket.emit("error", "Комната не найдена!");
                }

                const player = await Player.findOne({ where: { id: playerId } });
        
                socket.join(roomCode);
                socket.emit("joinedRoom", { room, player });
                console.log(`Игрок ${player.name} (${socket.id}) присоединился к комнате ${roomCode}`);
            } catch (error) {
                console.error("Ошибка при присоединении к комнате:", error);
                socket.emit("error", "Ошибка при присоединении к комнате");
            }
        });


        // Начало игры
        socket.on("startGame", async (data) => {
            try {
                const { token, roomCode, playerId } = data;

                const decoded = verifyToken(token);
                if (!decoded) {
                    return socket.emit("error", "Неверный или истёкший токен!");
                }

                if (!roomCode) {
                    return socket.emit("error", "Код комнаты обязателен!");
                }

                const room = await Room.findOne({ where: { roomCode } });

                if (!room) {
                    return socket.emit("error", "Комната не найдена!");
                }

                if (playerId !== room.creator){
                    return socket.emit("error", "Этот игрок не является создателем комнаты, он не может начать игру!");
                }

                // Обновляем статус комнаты
                await room.update({ playStatus: 'coming' });

                // Отправляем событие всем игрокам в комнате
                io.to(roomCode).emit("gameStarted", { roomCode });
                console.log(`Началась игра в комнате ${roomCode}`);
            } catch (error) {
                console.error("Ошибка при начале игры:", error);
                socket.emit("error", "Ошибка при начале игры");
            }
        });
        

        // Отправка сообщений
        socket.on("sendMessage", async (data) => {
            try {
                const { token, roomCode, playerId, content } = data;

                const decoded = verifyToken(token);
                if (!decoded) {
                    return socket.emit("error", "Неверный или истёкший токен!");
                }

                if (!roomCode) {
                    return socket.emit("error", "Код комнаты обязательны!");
                }
                const room = await Room.findOne({ where: { roomCode } });
                if (!room) {
                    socket.emit("error", { message: "Комната не найдена" });
                    return;
                }

                const roundNumber = room.round;
                const player = await Player.findOne({ where: { id: playerId } });

                if (!global.messageBuffer[roomCode]) {
                    global.messageBuffer[roomCode] = [];
                }

                const newMessage = { roomCode, playerId, name: player.name, roundNumber, content };
                global.messageBuffer[roomCode].push(newMessage);

                // Сохраняем сообщение в БД
                const newMessage_1 = await Message.create({
                    playerId: playerId,
                    roomCode: roomCode,
                    roundNumber: roundNumber,
                    content: content
                });

                // Проверяем лимит сообщений
                const playerMessages = global.messageBuffer[roomCode].filter(msg => msg.playerId === playerId);
                if (playerMessages.length >= 6) {
                    socket.emit("messageLimit", { message: "Вы достигли лимита сообщений за этот раунд." });
                }

                io.to(roomCode).emit("newMessage", newMessage);
            } catch (error) {
                console.error("Ошибка при отправке сообщения:", error);
                socket.emit("error", { message: "Ошибка при отправке сообщения" });
            }
        });

        // Отключение игрока
        socket.on("disconnect", () => {
            console.log(`Игрок отключился: ${socket.id}`);
        });
    });
}

module.exports = { startWebSocket };
