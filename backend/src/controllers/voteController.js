/*const { Vote } = require('../models');  // импортируем модель голосования

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

module.exports = { votePlayer };*/


const { Vote, Player } = require('../models');  // Импортируем модели Vote и Player

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

// Завершить раунд голосования и определить исключенного игрока
const endVotingRound = async (req, res) => {
    try {
        const { roomId } = req.params;

        // Получаем все голоса за раунд
        const votes = await Vote.findAll({ where: { roomId } });

        // Подсчитываем количество голосов за каждого игрока
        const targetVotes = votes.reduce((acc, vote) => {
            acc[vote.targetId] = (acc[vote.targetId] || 0) + 1;
            return acc;
        }, {});

        // Находим игрока с наибольшим количеством голосов
        let mostVotedTarget = null;
        let maxVotes = 0;
        for (let targetId in targetVotes) {
            if (targetVotes[targetId] > maxVotes) {
                mostVotedTarget = targetId;
                maxVotes = targetVotes[targetId];
            }
        }

        // Исключаем игрока, получившего наибольшее количество голосов
        if (mostVotedTarget) {
            await Player.update(
                { status: 'dead' },
                { where: { id: mostVotedTarget } }
            );
        }

        res.status(200).json({ message: 'Раунд голосования завершён' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { votePlayer, endVotingRound };