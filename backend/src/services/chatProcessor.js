const messagesQueue = new Map(); // Хранение сообщений по комнатам

// Функция добавления сообщений в очередь
function addMessage(roomId, message) {
    if (!messagesQueue.has(roomId)) {
        messagesQueue.set(roomId, []);
    }
    messagesQueue.get(roomId).push(message);
}

// Функция отправки сообщений после 20 секунд
function processMessages(io) {
    setInterval(() => {
        messagesQueue.forEach((messages, roomId) => {
            if (messages.length > 0) {
                io.to(roomId).emit('chatMessages', messages);
                messagesQueue.set(roomId, []); // Очищаем очередь
            }
        });
    }, 20000); // Каждые 20 секунд
}

module.exports = { addMessage, processMessages };
