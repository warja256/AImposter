const { Vote, Player, GameSession, Room } = require('../models'); 

// Проголосовать за игрока
const votePlayer = async (req, res) => {
    try {
        const { roomCode } = req.params;
        const { voterId, targetId } = req.body;

        //Ищем комнату
        const room = await Room.findOne({ where: { roomCode } });
        if (!room) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }

        const roomId = room.id;

        //Ищем игрока
        const gameSession = await GameSession.findOne({ where: { playerId: voterId, roomId } });
        if (!gameSession) {
            return res.status(400).json({ message: 'Игрок не найден в этой комнате' });
        }

        //Игрок жив или нет
        const player = await Player.findOne({ where: { id: voterId, status: 'alive' } });
        if (!player) {
            return res.status(400).json({ message: 'Голосующий игрок мёртв' });
        }

        //Ищем игрока за которого проголосовали
        const targetPlayer = await Player.findOne({ where: { id: targetId } });
        if (!targetPlayer) {
            return res.status(400).json({ message: 'Игрок, за которого голосуют не найден' });
        }

        // Если всё в порядке, записываем голос
        const vote = await Vote.create({ roomCode, voterId, targetId });
        res.status(200).json({ message: 'Голос учтён', vote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Завершить раунд голосования и определить исключенного игрока
const endVotingRound = async (req, res) => {
    try {
        const { roomCode } = req.params;

        //Ищем комнату
        const room = await Room.findOne({ where: { roomCode } });
        if (!room) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }

        const roomId = room.id;

        //Получаем все голоса за раунд
        const votes = await Vote.findAll({ where: { roomCode } });

        if (votes.length === 0) {
            return res.status(400).json({ message: 'Нет голосов для подсчёта' });
        }

        //Подсчитываем
        const targetVotes = votes.reduce((acc, vote) => {
            acc[vote.targetId] = (acc[vote.targetId] || 0) + 1;
            return acc;
        }, {});

        //Ищем игрока которого выгонят
        let mostVotedTarget = null;
        let maxVotes = 0;
        for (let targetId in targetVotes) {
            if (targetVotes[targetId] > maxVotes) {
                mostVotedTarget = targetId;
                maxVotes = targetVotes[targetId];
            }
        }

        //Исключаем игрока
        if (mostVotedTarget) {
            await Player.update(
                { status: 'dead' },
                { where: { id: mostVotedTarget } }
            );

            //Удаляем все голоса для этой комнаты
            await Vote.destroy({ where: { roomCode } });

            return res.status(200).json({ mostVotedTarget});
        }

        res.status(200).json({ message: 'Раунд голосования завершён, но нет игроков для исключения' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { votePlayer, endVotingRound };
