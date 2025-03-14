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
 * /api/rooms/{roomId}/join:
 *   post:
 *     summary: Присоединиться к комнате
 *     tags: [Комнаты]
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
 *         description: Успешное подключение
 */
router.post('/:roomId/join', joinRoom);

/**
 * @swagger
 * /api/rooms/{roomId}:
 *   get:
 *     summary: Получить информацию о комнате
 *     tags: [Комнаты]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о комнате
 */
router.get('/:roomId', getRoom);

module.exports = router;