const { Player } = require('../models');  // импортируем модель игрока

// Создание игрока
const createPlayer = async (req, res) => {
    try {
        const { nickname, avatar } = req.body;
        const player = await Player.create({ nickname, avatar });
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить информацию об игроке
const getPlayer = async (req, res) => {
    try {
        const { playerId } = req.params;
        const player = await Player.findByPk(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Игрок не найден' });
        }

        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPlayer, getPlayer };
