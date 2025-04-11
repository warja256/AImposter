const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');

/**
 * 
 * /api/chat/{roomCode}/send:
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
 *                 type: integer
 *                 description: ID игрока, отправляющего сообщение
 *               content:
 *                 type: string
 *                 description: Текст сообщения
 *     responses:
 *       200:
 *         description: Сообщение отправлено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID отправленного сообщения
 *                 playerId:
 *                   type: integer
 *                   description: ID игрока, отправившего сообщение
 *                 roomCode:
 *                   type: string
 *                   description: Код комнаты
 *                 roundNumber:
 *                   type: integer
 *                   description: Номер раунда, в котором отправлено сообщение
 *                 content:
 *                   type: string
 *                   description: Текст сообщения
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Ошибка на сервере
 */
//router.post('/send', sendMessage);


/**
 * 
 * /api/chat/{roomCode}:
 *   get:
 *     summary: Получить историю сообщений в чате за текущий раунд
 *     tags: [Чат]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: История сообщений за текущий раунд
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID сообщения
 *                   playerId:
 *                     type: integer
 *                     description: ID игрока, отправившего сообщение
 *                   roomCode:
 *                     type: string
 *                     description: Код комнаты
 *                   roundNumber:
 *                     type: integer
 *                     description: Номер раунда, в котором отправлено сообщение
 *                   content:
 *                     type: string
 *                     description: Текст сообщения
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Ошибка на сервере
 */
//router.get('/:roomCode', getMessages);


module.exports = router;