const express = require('express');
const router = express.Router();
const { votePlayer, endVotingRound, killVote, killPlayer } = require('../controllers/voteController');

/**
* @swagger
* /api/vote/{roomId}:
*   post:
*     summary: Проголосовать против игрока
*     tags: [Голосование]
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
*               voterId:
*                 type: integer
*               targetId:
*                 type: integer
*     responses:
*       200:
*         description: Голос учтён
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 vote:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                     voterId:
*                       type: integer
*                     targetId:
*                       type: integer
*                     roomCode:
*                       type: string
*       400:
*         description: Ошибка в запросе
*       404:
*         description: Комната или игрок не найдены
*       500:
*         description: Ошибка на сервере
*/
router.post('/:roomCode', votePlayer);


/**
 * @swagger
 * /api/vote/{roomCode}/end:
 *   get:
 *     summary: Завершить раунд голосования и исключить игрока
 *     tags: [Голосование]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация об исключённом игроке
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 role:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Нет голосов для подсчёта
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Ошибка на сервере
 */
router.get('/:roomCode/end', endVotingRound);


/**
 * @swagger
 * /api/vote/mafia/{roomCode}:
 *   post:
 *     summary: Мафия голосует за игрока
 *     tags: [Голосование]
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
 *               voterId:
 *                 type: integer
 *               targetId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Голос учтён
 *       400:
 *         description: Ошибка в запросе
 *       404:
 *         description: Комната или игрок не найдены
 *       500:
 *         description: Ошибка на сервере
 */
router.post('/mafia/:roomCode', killVote);


/**
 * @swagger
 * /api/vote/mafia/{roomCode}/end:
 *   get:
 *     summary: Завершить мафиозное голосование и исключить игрока
 *     tags: [Голосование]
 *     parameters:
 *       - in: path
 *         name: roomCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о убитом игроке
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 role:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Нет голосов для подсчёта
 *       404:
 *         description: Комната не найдена
 *       500:
 *         description: Ошибка на сервере
 */
router.get('/mafia/:roomCode/end', killPlayer);


module.exports = router;
