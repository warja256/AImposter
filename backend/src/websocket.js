const { Server } = require('socket.io');
const { addMessage, processMessages } = require('./services/chatProcessor');

function startWebSocket(server) {
    const io = new Server(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket) => {
        console.log('Пользователь подключился:', socket.id);

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`Пользователь ${socket.id} вошел в комнату ${roomId}`);
        });

        socket.on('sendMessage', ({ roomId, playerId, content }) => {
            addMessage(roomId, { playerId, content, timestamp: Date.now() });
        });

        socket.on('disconnect', () => {
            console.log('Пользователь отключился:', socket.id);
        });
    });

    processMessages(io);
}

module.exports = { startWebSocket };