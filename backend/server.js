//импорт модулей express swagger и другие
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { nanoid } from 'nanoid';


//Создание экземпляра экспресс
const app = express();
app.use(cors());
app.use(express.json());



const swaggerOptions = {
    //параметры openapi 3.0
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AImposter Game API',
        version: '1.0.0',
        description: 'API documentation for the AImposter Game',
      },
      //сервер разработки
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./server.js'],
  };
  //генерируется документация на основе аннотаций в коде
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  //чтобы показывать сгенерированную документацию
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         players:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               isMafia:
 *                 type: boolean
 *         messages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               playerId:
 *                 type: string
 *               playerName:
 *                 type: string
 *               content:
 *                 type: string
 *               timestamp:
 *                 type: number
 */


const rooms = new Map();
//Создание локальной комнаты
//обработка post запроса
app.post('/api/rooms', (req, res) => {
    //запись информации о создателе комнаты
    const { playerName } = req.body;
    //создание уникального идентификатора комнаты
    const roomId = nanoid(6);
    const player = {
      id: nanoid(),
      name: playerName,
      isMafia: false,
    };
    
        const room = {
      id: roomId,
      players: [player],
      messages: [],
      gameStarted: false,
      votingPhase: false,
      currentRound: 0,
      timeRemaining: 20,
    };
  
    //запись комнаты
    rooms.set(roomId, room);
    res.json(room);
  });

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 */

//Присоединение к существующей комнате
app.post('/api/rooms/:roomId/join', (req, res) => {
    const { roomId } = req.params;
    const { playerName } = req.body;
    const room = rooms.get(roomId);
  
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    //новый игрок
    const player = {
      id: nanoid(),
      name: playerName,
      isMafia: false,
    };
    //добавляется в список игроков комнаты
    room.players.push(player);
    res.json(room);
  });

/**
 * @swagger
 * /api/rooms/{roomId}/join:
 *   post:
 *     summary: Join an existing room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully joined the room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 */

//Отправка сообщений
app.post('/api/rooms/:roomId/messages', (req, res) => {
    const { roomId } = req.params;
    const { playerId, content } = req.body;
    const room = rooms.get(roomId);
  
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
  
    const player = room.players.find(p => p.id === playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
  
    const message = {
      id: nanoid(),
      playerId,
      playerName: player.name,
      content,
      timestamp: Date.now(),
    };
  
    room.messages.push(message);
    res.json(message);
  });

/**
 * @swagger
 * /api/rooms/{roomId}/messages:
 *   post:
 *     summary: Send a message in a room
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       404:
 *         description: Room not found
 */

//запуск сервера на порте 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});