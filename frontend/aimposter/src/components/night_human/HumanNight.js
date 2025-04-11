import React, { useState, useEffect } from 'react';
import './HumanNight.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import socket from "../../config/socket";

const HumanNightScreen = () => {
  const [countdown, setCountdown] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();

  const { playerName, roomCode, playerId, token } = location.state || {};

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleCountdownEnd();
    }
  }, [countdown, navigate]);

  useEffect(() => {
    const handleAlertedKill = (data) => {
      const { player } = data;
      if (player.id === playerId) {
        // Текущий игрок выбыл
        navigate('/killed', { state: { playerName, roomCode, playerId, token } });
      } else {
        // Текущий игрок не выбыл
        navigate('/night-result', { state: { eliminatedPlayerName: player.name, playerName, roomCode, playerId, token } });
      }
    };

    if (token && roomCode && playerId) {
      socket.emit("joinRoom", {
        token: token,
        roomCode: roomCode,
        playerId: playerId
      });

      socket.on("alertedKill", handleAlertedKill);

      socket.on("error", (errorMessage) => {
        alert(errorMessage);
      });
    }

    return () => {
      socket.off("alertedKill", handleAlertedKill);
      socket.off("error");
    };
  }, [playerId, roomCode, token, playerName, navigate]);

  const handleCountdownEnd = () => {
    console.log("Таймер завершен! Переход на другую страницу...");
    // Если таймер завершился, но событие еще не пришло, можно добавить дополнительную логику
  };

  return (
    <div className="human-night-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="header-text">ТШШ... НАСТУПИЛА НОЧЬ</div>
      <div className="ordinary-text">МАФИЯ ДЕЛАЕТ СВОЙ ВЫБОР</div>
      <div className="timertime">{formatTime(countdown)}</div>
    </div>
  );
};

export default HumanNightScreen;
