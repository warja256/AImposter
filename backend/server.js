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
 */



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
  
    //запись комнаты в массив комнат
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




//запуск сервера на порте 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});