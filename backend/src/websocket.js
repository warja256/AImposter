const { Server } = require("socket.io");
const { Room, Player, GameSession, Message } = require("./models");
const { verifyToken } = require("./auth");

global.messageBuffer = {}; // Буфер сообщений

function startWebSocket(server) {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log(`Игрок подключился: ${socket.id}`);

        // Присоединение к комнате
        socket.on("joinRoom", async (data) => {
            try {
                const { token, roomCode, playerName } = data; // Читаем данные из запроса(токен, комната, сообщение)

                const decoded = verifyToken(token);
                if (!decoded) {
                    return socket.emit("error", "Неверный или истёкший токен!");
                }
        
                if (!roomCode) {
                    return socket.emit("error", "playerName обязательны!");
                }
        
                const room = await Room.findOne({ where: { roomCode } });
        
                if (!room) {
                    return socket.emit("error", "Комната не найдена!");
                }
        
                const player = await Player.create({ name: playerName });
                await room.update({ playerCount: room.playerCount + 1 });
        
                await GameSession.create({
                    roomId: room.id,
                    playerId: player.id,
                });
        
                socket.join(roomCode);
                socket.emit("joinedRoom", { room, player });
                console.log(`Игрок ${playerName} (${socket.id}) присоединился к комнате ${roomCode}`);
            } catch (error) {
                console.error("Ошибка при присоединении к комнате:", error);
                socket.emit("error", "Ошибка при присоединении к комнате");
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

                if (!global.messageBuffer[roomCode]) {
                    global.messageBuffer[roomCode] = [];
                }

                const newMessage = { roomCode, playerId, roundNumber, content };
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

    // Рассылка сообщений каждые 20 секунд
    setInterval(() => {
        Object.keys(global.messageBuffer).forEach((roomCode) => {
            if (global.messageBuffer[roomCode].length > 0) {
                io.to(roomCode).emit("newMessages", global.messageBuffer[roomCode]);
                global.messageBuffer[roomCode] = [];
            }
        });
    }, 200000);
}

module.exports = { startWebSocket };
