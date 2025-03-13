import React, { useState, useEffect } from "react";
import { createRoom, joinRoom } from './api'; // Импортируем функции из api.js
import "./WelcomeScreen.css";
import "../header.css";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";
const WelcomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');

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
    try {
      const room = await createRoom(playerName);
      console.log('Room created:', room);
      // Дополнительная логика, например, перенаправление на страницу игры
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleJoinGame = async () => {
    try {
      const room = await joinRoom(roomCode, playerName);
      console.log('Joined room:', room);
      // Дополнительная логика, например, перенаправление на страницу игры
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

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
              onChange={(e) => setPlayerName(e.target.value)}
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
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Код комнаты"
                  />
                </div>
              </div>
            </div>
          </div>

          <button className="create-game" onClick={handleCreateGame}>Создать Игру</button>
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
            <p className="info-box-second">У вас есть <span className="player-role">15 секунд,</span> чтобы написать сообщение, после чего все они отправляются одновременно.</p>
          </div>
          <div className={`slide ${currentSlide === 2 ? "active" : ""}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p className="info-box-third-header"><b>4.</b> Раунды и голосования!</p>
            <p className="info-box-second">Каждый раунд длится <span className="player-role">1,5 минуты.</span> В конце раунда вы должны проголосовать и выгнать одного участника.</p>
            <p className="info-box-third-header"><b>5.</b> Ночные интриги!</p>
            <p className="info-box-second">Ночью мафия выбирает свою жертву за <span className="player-role">20 секунд.</span></p>
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