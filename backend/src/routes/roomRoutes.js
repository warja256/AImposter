// src/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { createRoom, joinRoom, getRoom, leaveRoom, chooseMafia, changeStatus, isWin } = require('../controllers/roomController');

// src/routes/roomRoutes.js

/**
 * @swagger
 * /api/rooms/{roomCode}:
 *   get:
 *     summary: Получить информацию о комнате по её коду
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         required: true
 *         description: Код комнаты
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о комнате
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roomCode:
 *                   type: string
 *                   example: '1234'
 *       404:
 *         description: Комната не найдена
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

/**
 * @swagger
 * /api/rooms/leave/{roomCode}:
 *   delete:
 *     summary: Удаляет игрока из комнаты
 *     tags: [Комнаты]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: integer
 *             required:
 *               - playerId
 *     responses:
 *       204:
 *         description: Игрок удалён из комнаты
 *       400:
 *         description: Неверный запрос
 *       404:
 *         description: Комната или игрок не найдены
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/leave/:roomCode', leaveRoom);

router.get('/chooseMafia/:roomCode', chooseMafia);

router.get('/changeStatus/:roomCode', changeStatus);

router.get('/isWin/:roomCode', isWin);

module.exports = router;