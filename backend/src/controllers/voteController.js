const { Vote } = require('../models');  // импортируем модель голосования

// Проголосовать за игрока
const votePlayer = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { voterId, targetId } = req.body;

        const vote = await Vote.create({ roomId, voterId, targetId });
        res.status(200).json(vote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { votePlayer };