// src/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { createRoom, joinRoom, getRoom } = require('../controllers/roomController');

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Создать новую комнату
 *     tags: [Комнаты]
 *     responses:
 *       201:
 *         description: Комната создана
 */
router.post('/', createRoom);

/**
 * @swagger
 * /api/rooms/join:
 *   post:
 *     summary: Присоединиться к комнате
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
 *         description: Успешное подключение
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
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о комнате
 */
router.get('/:roomCode', getRoom);

module.exports = router;