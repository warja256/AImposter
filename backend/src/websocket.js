const { Server } = require("socket.io");
const { Message } = require("./models");

global.messageBuffer = {}; // Буфер сообщений

function startWebSocket(server) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`Игрок подключился: ${socket.id}`);

    // Подключение к комнате
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Игрок ${socket.id} присоединился к комнате ${roomId}`);
    });

    // Отправка сообщения
    socket.on("sendMessage", async ({ roomId, playerId, roundNumber, content }) => {
      if (!global.messageBuffer[roomId]) {
        global.messageBuffer[roomId] = [];
      }

      // Добавляем сообщение в буфер
      global.messageBuffer[roomId].push({ playerId, roundNumber, content });

      // Сохраняем в БД
      await Message.create({ roomId, playerId, roundNumber, content });

      // Проверяем лимит (не больше 6 сообщений за раунд)
      const playerMessages = global.messageBuffer[roomId].filter(msg => msg.playerId === playerId);
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
    Object.keys(global.messageBuffer).forEach((roomId) => {
      if (global.messageBuffer[roomId].length > 0) {
        io.to(roomId).emit("newMessages", global.messageBuffer[roomId]);
        global.messageBuffer[roomId] = [];
      }
    });
  }, 20000);
}

module.exports = { startWebSocket };
