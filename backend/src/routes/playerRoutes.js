const express = require('express');
const router = express.Router();
const { createPlayer, getPlayer } = require('../controllers/playerController');

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Создать игрока
 *     tags: [Игроки]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Игрок создан
 */
router.post('/', createPlayer);

/**
 * @swagger
 * /api/players/{playerId}:
 *   get:
 *     summary: Получить информацию об игроке
 *     tags: [Игроки]
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные игрока
 */
router.get('/:playerId', getPlayer);

module.exports = router;
