import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import "../header.css";
import "./Lobby.css";
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";
import { getRoomDetails } from "../../api/room_api.js";

const socket = io("ws://localhost:8080");

const LobbyScreen = () => {
  const [roomData, setRoomData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [playerCount, setPlayerCount] = useState(0);
  const [playerId, setPlayerId] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { playerName, roomCode, playerId, isCreator } = location.state;
      setPlayerName(playerName);
      setRoomCode(roomCode);
      setPlayerId(playerId);
      setIsCreator(isCreator);  
    }
  }, [location.state]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Токен из localStorage:", token);
    if (!token) {
      console.error("Токен не найден!");
      return;
    }
    console.log("Токен:", token);
     // Получаем токен из localStorage
  
    // Получаем данные о комнате и игроках
    const fetchRoomData = async () => {
      try {
        const data = await getRoomDetails(roomCode);
        setRoomData(data);
        setPlayerCount(data.playerCount);
      } catch (error) {
        console.error("Ошибка при получении данных о комнате:", error);
      }
    };
  
    if (roomCode) {
      fetchRoomData();
    }
  
    if (token && roomCode && playerId) {
      socket.emit("joinRoom", {
        token: token, // передаём актуальный токен
        roomCode: roomCode,
        playerId: playerId
      });
    }

    socket.on("joinedRoom", (data) => {
      console.log("Игрок присоединился к комнате:", data);
      setPlayerData(data.player);  
    });
  
    socket.on("gameStarted", (data) => {
      console.log("Игра началась", data);
      console.log(data.message);
      navigate("/connection", {state: {playerName, playerId, roomCode, token } });
    });
  
    socket.on("error", (errorMessage) => {
      alert(errorMessage);
    });
  
    return () => {
      socket.off("joinedRoom");
      socket.off("gameStarted");
      socket.off("error");
    };
  }, [roomCode, playerId]);
  

  const handleStartGame = () => {
    const token = localStorage.getItem("authToken");
  
    socket.emit("startGame", {
      token: token,
      roomCode: roomCode,
      playerId: playerId,
    });
  };
  

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomCode)
      .catch(err => console.error("Ошибка при копировании:", err));
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
          {isCreator && (
            <div>
              <button className="create-game" onClick={handleStartGame}>Начать</button>
            </div>
          )}
          <div className="center">
            <div className="room-code-container">
              <div className="combined-lobby-button">
                {roomCode && (
                  <div className="code-container">
                    <button className="copy-button" onClick={handleCopyRoomCode}>
                      Копировать
                    </button>
                    
                      <input
                        type="text"
                        className="code-field"
                        value={roomCode}
                        readOnly
                      />
                    
                  </div>
                )}
              </div>
              </div>
            </div>
          <div>
            <button className="create-game go-back" onClick={() => navigate('/')}>Назад</button>
          </div>
        </div>

        <div className="lobby-users">
          <h3>УЧАСТНИКИ {playerCount}/4</h3>
          {roomData && roomData.Players ? (
            roomData.Players.map((player, index) => (
              <button key={index} className="player-button">
                <img src={player.avatar || avatar} className="avatar" alt={`Игрок ${index + 1}`} />
                <div className="text">{player.name}</div>
              </button>
            ))
          ) : (
            <p>Загрузка участников...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
