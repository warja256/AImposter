import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../header.css";
import "./Lobby.css";
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";

const LobbyScreen = () => {
  const [roomData, setRoomData] = useState(null); // Для хранения данных комнаты
  const [playerData, setPlayerData] = useState(null); // Для хранения данных игрока
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Используем useLocation для получения переданных данных

  useEffect(() => {
    if (location.state) {
      const { playerName, roomCode } = location.state;

      // Устанавливаем имя игрока и код комнаты, полученные из состояния
      setPlayerName(playerName);
      setRoomCode(roomCode);
    }
  }, [location.state]); // Зависимость от состояния

  const handleGoBack = () => {
    navigate('/'); // Переход к WelcomeScreen
  };

  return (
    <div className="lobby-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>
      <div>
        <h3 className="lobby-header">Создание игровой комнаты</h3>
      </div>
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
                  {roomCode ? (
                    <>
                      <button className="join-button">Войти</button>
                      <div className="input-filed">
                        <input
                          type="text"
                          className="code-field"
                          value={roomCode}
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
            <button className="create-game go-back" onClick={handleGoBack}>Назад</button>
          </div>
        </div>
        <div className="lobby-users">
          <h3>УЧАСТНИКИ {roomData ? `${roomData.playerCount}/4` : "0/4"}</h3>
          <button className="player-button">
            <img src={avatar} className="avatar" alt="Игрок 1" />
            <div className="text">{playerName}</div> {/* Отображаем имя игрока */}
          </button>
          {/* Здесь можно добавить отображение других игроков */}
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
