const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');

/**
 * @swagger
 * /api/chat/{roomCode}:
 *   post:
 *     summary: Отправить сообщение в чат
 *     tags: [Чат]
 *     parameters:
 *       - in: path
 *         name: roomCode
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
 *         description: Сообщение отправлено
 */
router.post('/:roomCode', sendMessage);

/**
 * @swagger
 * /api/chat/{roomCode}:
 *   get:
 *     summary: Получить историю сообщений
 *     tags: [Чат]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: История сообщений
 */
router.get('/:roomCode', getMessages);

module.exports = router;