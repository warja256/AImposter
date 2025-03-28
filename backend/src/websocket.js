const { Server } = require("socket.io");
const { Message, Room } = require("./models");

global.messageBuffer = {}; // Буфер сообщений

function startWebSocket(server) {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log(`Игрок подключился: ${socket.id}`);

        // Подключение к комнате
        socket.on("joinRoom", async (roomCode) => {
            const room = await Room.findOne({ where: { roomCode: roomCode } });
            if (!room) {
                socket.emit("error", "Комната не найдена");
                return;
            }

            socket.join(roomCode);
            console.log(`Игрок ${socket.id} присоединился к комнате ${roomCode}`);
        });

        // Отправка сообщения
        socket.on("sendMessage", async ({ Coderoom, playerId, content }) => {
            const room = await Room.findOne({ where: { roomCode: Coderoom } });
            if (!room) {
                socket.emit("error", "Комната не найдена");
                return;
            }

            const roundNumber = room.round;

            if (!global.messageBuffer[Coderoom]) {
                global.messageBuffer[Coderoom] = [];
            }

            // Добавляем сообщение в буфер
            global.messageBuffer[Coderoom].push({ playerId, roundNumber, content });

            // Сохраняем в БД
            await Message.create({ Coderoom, playerId, roundNumber, content });

            // Проверяем лимит (не больше 6 сообщений за раунд)
            const playerMessages = global.messageBuffer[Coderoom].filter(msg => msg.playerId === playerId);
            if (playerMessages.length >= 6) {
                socket.emit("messageLimit", "Вы достигли лимита сообщений за этот раунд.");
            }
        });

        // Отключение игрока
        socket.on("disconnect", () => {
            console.log(`Игрок отключился: ${socket.id}`);
        });
    });

    // Каждые 20 секунд рассылаем сообщения в комнаты
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
