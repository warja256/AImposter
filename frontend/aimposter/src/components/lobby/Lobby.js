import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../header.css";
import "./Lobby.css";
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";
import { createRoom } from '../../api/api'; // Импортируем функцию для создания комнаты

const LobbyScreen = () => {
  const [roomData, setRoomData] = useState(null); // Для хранения данных комнаты
  const [playerData, setPlayerData] = useState(null); // Для хранения данных игрока
  const [playerName, setPlayerName] = useState(''); // Для хранения имени игрока
  const [isNameSubmitted, setIsNameSubmitted] = useState(false); // Статус отправки имени
  const navigate = useNavigate();

  useEffect(() => {
    if (isNameSubmitted) {
      const createNewRoom = async () => {
        try {
          const response = await createRoom(playerName); // Передаем имя игрока
          setRoomData(response.room); // Устанавливаем данные комнаты (включая roomCode)
          setPlayerData(response.player); // Устанавливаем данные игрока
        } catch (error) {
          console.error("Error creating room:", error);
        }
      };

      createNewRoom(); // Создаём комнату после того, как имя отправлено
    }
  }, [isNameSubmitted, playerName]);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value); // Обновляем имя игрока
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setIsNameSubmitted(true); // Отправляем имя и начинаем создание комнаты
    } else {
      alert("Пожалуйста, введите имя.");
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Переход к WelcomeScreen
  };

  return (
    <div className="lobby-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      {!isNameSubmitted ? (
        <div className="name-input-container">
          <h3>Введите ваше имя:</h3>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={playerName}
              onChange={handleNameChange}
              required
            />
            <button type="submit">Подтвердить</button>
          </form>
        </div>
      ) : (
        <div>
          <h3 className="lobby-header">Создание игровой комнаты</h3>
          <div className="lobby">
            <div className="lobby-buttons">
              <div>
                <button className="create-game">Начать</button>
              </div>
              <div>
                <div className="center">
                  <div className="room-code-container">
                    <div className="combined-button">
                      {/* Отображаем код комнаты, если данные получены */}
                      {roomData ? (
                        <>
                          <button className="join-button">Войти</button>
                          <div className="input-filed">
                            <input
                              type="text"
                              className="code-field"
                              value={roomData.roomCode}
                              readOnly
                            />
                          </div>
                        </>
                      ) : (
                        <p>Загрузка...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className="create-game go-back" onClick={handleGoBack}>
                  Назад
                </button>
              </div>
            </div>
            <div className="lobby-users">
              <h3>УЧАСТНИКИ {roomData ? `${roomData.playerCount}/4` : "0/4"}</h3>
              <button className="player-button">
                <img src={avatar} className="avatar" alt="Игрок" />
                <div className="text">{playerData ? playerData.name : "Игрок 1"}</div>
              </button>
              {/* Здесь можно добавить отображение других игроков */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
