import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./WelcomeScreen.css";
import "../header.css";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";
import { createRoom, joinRoom } from "../../api/room_api.js";  // Импортируем API функции
import socket from "../../config/socket";


const WelcomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [playerName, setPlayerName] = useState(""); // Добавляем состояние для имени игрока
  const [roomCode, setRoomCode] = useState(""); // Добавляем состояние для кода комнаты
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isManual) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isManual]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 5000);
  };

  const handleCreateGame = async () => {
    if (!playerName) {
      alert("Пожалуйста, введите имя!");
      return;
    }
  
    try {
      const response = await createRoom(playerName);
  
      if (response.token) {
        setToken(response.token);
        localStorage.setItem("authToken", response.token);
        console.log(response.token);
      }
  
      const roomCode = response.room.roomCode;
      const id = response.player.id;
      const isCreator = id === response.room.creator;
  
      // ✅ Подписываемся заранее
      socket.once("joinedRoom", ({ room, player }) => {
        console.log("✅ Получено joinedRoom:", { room, player });
        navigate('/lobby', {
          state: { playerName, roomCode, playerId: id, isCreator, token: response.token }
        });
        
      });
  
      socket.once("error", (message) => {
        alert("❌ Ошибка: " + message);
      });
  
      // 🚀 Отправляем joinRoom
      socket.emit("joinRoom", {
        token: response.token,
        roomCode,
        playerId: id,
      });
  
    } catch (error) {
      console.error("Ошибка при создании комнаты:", error);
      alert("Ошибка при создании комнаты");
    }
  };
  
  
  
  
  
  
  const handleJoinGame = async () => {
    if (!playerName || !roomCode) {
      alert("Пожалуйста, введите имя и код комнаты!");
      return;
    }
  
    try {
      const response = await joinRoom(roomCode, playerName, token);
      const { id } = response.player;
  
      if (response.token) {
        setToken(response.token);
        localStorage.setItem("authToken", response.token);
      }
  
      socket.emit("joinRoom", { token, roomCode, playerId: id });
  
      socket.once("joinedRoom", ({ room, player }) => {
        navigate('/lobby', { state: { playerName, roomCode, playerId: player.id, isCreator: false, token } });
      });
  
      socket.once("error", (message) => {
        alert(message);
      });
  
    } catch (error) {
      console.error("Ошибка при присоединении к комнате:", error);
      alert("Ошибка при присоединении к комнате");
    }
  };
  

  useEffect(() => {
    // Подписка на событие игрока, присоединившегося в комнату
    socket.on("playerJoined", ({ player }) => {
      console.log(`🔔 Присоединился игрок: ${player.name}`);
      // Здесь можно обновлять локальный список игроков, если он есть
    });
  
    return () => {
      socket.off("playerJoined");
    };
  }, []);
  
  
  
  
  

  return (
    <div className="main-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="content">
        <div className="login-box">
          <div className="avatar-name">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" />
            </div>
            <input
              type="text"
              className="name-field"
              placeholder="Имя..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)} // Обработчик для изменения имени игрока
            />
          </div>

          <div className="center">
            <div className="room-code-container">
              <div className="combined-button">
                <button className="join-button" onClick={handleJoinGame}>Войти</button>
                <div className="input-filed">
                  <input
                    type="text"
                    className="code-field"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)} // Обработчик для изменения кода комнаты
                    placeholder="Код комнаты"
                  />
                </div>
              </div>
            </div>
          </div>

          <button className="welcome-create-game" onClick={handleCreateGame}>Создать Игру</button>
        </div>
        <div className="info-box">
          <div className={`slide ${currentSlide === 0 ? "active" : ""}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p><b>1.</b> Создайте или присоединяйтесь по ссылке к комнате!</p>
            <p><b>2.</b> <b>Узнайте свою роль!</b><br /><span className="info-box-details">В поле для ввода сообщений вы увидите, кто вы: игрок или мафия.</span></p>
          </div>
          <div className={`slide ${currentSlide === 1 ? "active" : ""}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p className="info-box-second-header"><b>3.</b> <b>Дневное веселье!</b></p>
            <p className="info-box-second">Днём все игроки общаются в чате, а мафия выбирает из вариантов, предложенных ИИ.</p>
            <p className="info-box-second">У вас есть <span className="player-role">25 секунд,</span> чтобы написать сообщение, после чего все они отправляются одновременно.</p>
          </div>
          <div className={`slide ${currentSlide === 2 ? "active" : ""}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p className="info-box-third-header"><b>4.</b> Раунды и голосования!</p>
            <p className="info-box-second">Каждый раунд длится <span className="player-role">3 минуты.</span> В конце раунда вы должны проголосовать и выгнать одного участника.</p>
            <p className="info-box-third-header"><b>5.</b> Ночные интриги!</p>
            <p className="info-box-second">Ночью мафия выбирает свою жертву за <span className="player-role">25 секунд.</span></p>
          </div>
          <div className="dots">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
