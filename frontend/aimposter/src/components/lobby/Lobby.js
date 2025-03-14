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
  const navigate = useNavigate();

  useEffect(() => {
    const createNewRoom = async () => {
      try {
        const response = await createRoom("Игрок 1"); // Здесь передаем имя игрока
        setRoomData(response.room); // Устанавливаем данные комнаты (включая roomCode)
        setPlayerData(response.player); // Устанавливаем данные игрока
      } catch (error) {
        console.error("Error creating room:", error);
      }
    };

    createNewRoom(); // Создаём комнату сразу при загрузке компонента
  }, []);

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
                  {roomData ? (
                    <>
                      <button className="join-button">Войти</button>
                      <div className="input-filed">
                        <input type="text" className="code-field" value={roomData.roomCode} readOnly />
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
            <div className="text">{playerData ? playerData.name : "Игрок 1"}</div>
          </button>
          {/* Здесь можно добавить отображение других игроков */}
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
