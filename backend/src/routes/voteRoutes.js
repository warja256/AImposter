const express = require('express');
const router = express.Router();
const { votePlayer,  endVotingRound, killVote, killPlayer} = require('../controllers/voteController');

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
 *                 type: string
 *               targetId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Голос учтён
 */
router.post('/:roomCode', votePlayer);

router.post('/:roomCode/end', endVotingRound);

router.post('/mafia/:roomCode', killVote);

router.post('/mafia/:roomCode/end', killPlayer);

module.exports = router;
