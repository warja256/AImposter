import React, { useState, useEffect } from 'react';
import './HumanNight.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const HumanNightScreen = () => {
  const [countdown, setCountdown] = useState(20);
  const navigate = useNavigate();

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

  const handleCountdownEnd = () => {
    // Заглушка для будущего кода перехода на другую страницу
    console.log("Таймер завершен! Переход на другую страницу...");
    navigate('/night-result'); // Раскомментируйте эту строку, когда будете готовы к переходу
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
