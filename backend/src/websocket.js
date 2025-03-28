const { Server } = require("socket.io");
const { Room, Player, GameSession, Message } = require("./models");

global.messageBuffer = {}; // Буфер сообщений

function startWebSocket(server) {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log(`Игрок подключился: ${socket.id}`);

        // Присоединение к комнате
        socket.on("joinRoom", async ({ roomCode, playerName }) => {
            try {
                const room = await Room.findOne({ where: { roomCode } });

                if (!room) {
                    socket.emit("error", { message: "Комната не найдена" });
                    return;
                }

                // Создаём игрока
                const player = await Player.create({ name: playerName });

                // Увеличиваем количество игроков в комнате
                await room.update({ playerCount: room.playerCount + 1 });

                // Записываем в GameSession
                await GameSession.create({
                    roomId: room.id,
                    playerId: player.id,
                });

                socket.join(roomCode);
                socket.emit("joinedRoom", { room, player });
                console.log(`Игрок ${player.name} (ID: ${player.id}) вошел в комнату ${roomCode}`);
            } catch (error) {
                console.error("Ошибка при присоединении к комнате:", error);
                socket.emit("error", { message: "Ошибка при присоединении" });
            }
        });

        // Отправка сообщений
        socket.on("sendMessage", async ({ roomCode, playerId, content }) => {
            try {
                const room = await Room.findOne({ where: { roomCode } });
                if (!room) {
                    socket.emit("error", { message: "Комната не найдена" });
                    return;
                }

                const roundNumber = room.round;

                if (!global.messageBuffer[roomCode]) {
                    global.messageBuffer[roomCode] = [];
                }

                const newMessage = { playerId, roundNumber, content };
                global.messageBuffer[roomCode].push(newMessage);

                // Сохраняем сообщение в БД
                await Message.create({ roomId: room.id, playerId, roundNumber, content });

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
    }, 20000);
}

module.exports = { startWebSocket };
