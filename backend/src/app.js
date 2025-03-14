// src/app.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { sequelize } = require('./models');
const { startWebSocket } = require('./websocket');
const swaggerSetup = require('./docs/swagger');  // Импортируем Swagger настройку

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const roomRoutes = require('./routes/roomRoutes');
const playerRoutes = require('./routes/playerRoutes');
const chatRoutes = require('./routes/chatRoutes');
const voteRoutes = require('./routes/voteRoutes');

app.use('/api/rooms', roomRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/vote', voteRoutes);

swaggerSetup(app);  // Используем Swagger на маршруте /api-docs

startWebSocket(server);

const PORT = 8080;
server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}/api-docs/`);
    await sequelize.sync({ alter: true });
});