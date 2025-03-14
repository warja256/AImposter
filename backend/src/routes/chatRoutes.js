const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');

/**
 * @swagger
 * /api/chat/{roomId}:
 *   post:
 *     summary: Отправить сообщение в чат
 *     tags: [Чат]
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
 *         description: Сообщение отправлено
 */
router.post('/:roomId', sendMessage);

/**
 * @swagger
 * /api/chat/{roomId}:
 *   get:
 *     summary: Получить историю сообщений
 *     tags: [Чат]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: История сообщений
 */
router.get('/:roomId', getMessages);

module.exports = router;
