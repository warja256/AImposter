// src/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { createRoom, joinRoom, getRoom, leaveRoom, chooseMafia, changeStatus, isWin } = require('../controllers/roomController');

// src/routes/roomRoutes.js

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Создание новой комнаты
 *     tags: [Комнаты]
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
 *       201:
 *         description: Комната успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   type: object
 *                   properties:
 *                     round:
 *                       type: number
 *                     status:
 *                       type: string
 *                     playerCount:
 *                       type: number
 *                     id:
 *                       type: integer
 *                     roomCode:
 *                       type: string
 *                     creator:
 *                       type: integer
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 player:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                     status:
 *                       type: string
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                 token:
 *                   type: string
 *       400:
 *         description: Ошибка валидации запроса
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 *                 stack:
 *                   type: string
 */
router.post('/', createRoom);

/**
 * @swagger
 * /api/rooms/{roomCode}/join:
 *   post:
 *     summary: Присоединение к существующей комнате
 *     tags: [Комнаты]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomCode:
 *                 type: string
 *               playerName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешное присоединение к комнате
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     round:
 *                       type: number
 *                     status:
 *                       type: string
 *                     playerCount:
 *                       type: number
 *                     roomCode:
 *                       type: string
 *                     creator:
 *                       type: integer
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 player:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                     status:
 *                       type: string
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                 token:
 *                   type: string
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.post('/join', joinRoom);

/**
 * @swagger
 * /api/rooms/{roomCode}:
 *   get:
 *     summary: Получить информацию о комнате
 *     tags: [Комнаты]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный код комнаты
 *     responses:
 *       200:
 *         description: Информация о комнате получена успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 round:
 *                   type: number
 *                 status:
 *                   type: string
 *                 playerCount:
 *                   type: number
 *                 roomCode:
 *                   type: string
 *                 creator:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 Players:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       avatar:
 *                         type: string
 *                         nullable: true
 *                       role:
 *                         type: string
 *                       status:
 *                         type: string
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.get('/:roomCode', getRoom);

/**
 * @swagger
 * /api/rooms/leave/{roomCode}:
 *   post:
 *     summary: Выход из комнаты
 *     tags: [Комнаты]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный код комнаты
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Игрок успешно вышел из комнаты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Игрок или комната не найдены
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.delete('/leave/:roomCode', leaveRoom);


/**
 * @swagger
 * /api/rooms/chooseMafia/{roomCode}:
 *   get:
 *     summary: Выбор мафии в комнате
 *     tags: [Комнаты]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный код комнаты
 *     responses:
 *       200:
 *         description: Мафия выбрана успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mafiaId:
 *                   type: integer
 *       404:
 *         description: Комната или игроки не найдены
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.get('/chooseMafia/:roomCode', chooseMafia);

/**
 * @swagger
 * /api/rooms/changeStatus/{roomCode}:
 *   put:
 *     summary: Смена дня и ночи в комнате
 *     tags: [Комнаты]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный код комнаты
 *     responses:
 *       200:
 *         description: Статус комнаты успешно изменён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 round:
 *                   type: number
 *                 status:
 *                   type: string
 *                 playerCount:
 *                   type: number
 *                 roomCode:
 *                   type: string
 *                 creator:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.get('/changeStatus/:roomCode', changeStatus);

/**
 * @swagger
 * /api/rooms/isWin/{roomCode}:
 *   get:
 *     summary: Определение победителя в комнате
 *     tags: [Комнаты]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный код комнаты
 *     responses:
 *       200:
 *         description: Победитель определён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum: ["civilian", "mafia", "continue"]
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.get('/isWin/:roomCode', isWin);

module.exports = router;