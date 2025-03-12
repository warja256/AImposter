import React, { useState, useEffect } from "react";
import "./WelcomeScreen.css";
import "../header.css";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";

const WelcomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManual, setIsManual] = useState(false); // Отслеживание ручного переключения

  useEffect(() => {
    if (!isManual) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
      }, 3000); // Автоматическое переключение каждые 3 секунды

      return () => clearInterval(interval); // Очистка интервала при размонтировании
    }
  }, [isManual]); // Запускаем эффект, если isManual меняется

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsManual(true); // Останавливаем автоматическую прокрутку
    setTimeout(() => setIsManual(false), 5000); // Через 5 секунд возобновляем автоматическую прокрутку
  };

  return (
    <div className="main-screen">
      {/* Логотип */}
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="content">
        {/* Блок входа */}
        <div className="login-box">
          <div className="avatar-name">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" />
            </div>
            <input type="text" className="name-field" placeholder="Имя..." />
          </div>

          <div className="center">
            <div className="room-code-container">
              <div className="combined-button">
                <button className="join-button">Войти</button>
                <div className="input-filed">
                  <input type="text" className="code-field" value="0000000" readOnly />
                </div>
              </div>
            </div>
          </div>

          <button className="create-game">Создать Игру</button>
        </div>

        {/* Блок инструкции */}
        <div className="info-box">
          <div className={`slide ${currentSlide === 0 ? "active" : ""}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p>
              <b>1.</b> Создайте или присоединяйтесь по<br />ссылке к комнате!
            </p>
            <p>
              <b>2.</b> <b>Узнайте свою роль!<br /></b>
              <span className="info-box-details">В поле для ввода сообщений вы увидите, кто вы:<br /></span>
              <span className="player-role">игрок или мафия.</span>
            </p>
          </div>
          <div className={`slide ${currentSlide === 1 ? "active" : ""}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p className="info-box-second-header">
              <b>3.</b> <b>Дневное веселье!</b>
            </p>
            <p className="info-box-second">
              Днём все игроки общаются в чате, а мафия выбирает из вариантов, предложенных ИИ.
            </p>
            <p className="info-box-second">
              У вас есть <span className="player-role">15 секунд,</span> чтобы написать сообщение, после чего все они отправляются одновременно.
            </p>
          </div>
          <div className={`slide ${currentSlide === 2 ? "active" : ""}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p className="info-box-third-header">
              <b>4.</b> Раунды и голосования!
            </p>
            <p className="info-box-second">
              Каждый раунд длится <span className="player-role">1,5 минуты.</span> В конце раунда вы должны проголосовать и выгнать одного участника.
            </p>
            <p className="info-box-third-header">
              <b>5.</b> Ночные интриги!
            </p>
            <p className="info-box-second">
              Ночью мафия выбирает свою жертву за <span className="player-role">20 секунд.</span>
            </p>
          </div>

          {/* Навигация (Точки) */}
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
