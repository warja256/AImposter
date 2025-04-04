const jwt = require("jsonwebtoken");

const SECRET_KEY = "185FDB266A63B565E36CF855B6B7E185FDB266A63B565E36CF855B6B7E";

// Функция для генерации токена
function generateToken(player) {
    return jwt.sign({ id: player.id, name: player.name }, SECRET_KEY, { expiresIn: "24h" });
}

// Функция для проверки токена
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
