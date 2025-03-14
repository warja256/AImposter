const express = require('express');
const router = express.Router();
const { votePlayer } = require('../controllers/voteController');

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
router.post('/:roomId', votePlayer);

// router.post('/:roomId/end', endVotingRound);

module.exports = router;
