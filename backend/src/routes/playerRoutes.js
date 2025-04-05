const express = require('express');
const router = express.Router();
const { createPlayer, getPlayer } = require('../controllers/playerController');


router.post('/', createPlayer);


router.get('/:id', getPlayer);

module.exports = router;
