import React, { useState } from "react";
import "./WelcomeScreen.css";
import "../header.css";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png"; 

const WelcomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 2) % 2);
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
          <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
            <h3>КАК ИГРАТЬ:</h3>
            <p>
              <b>1.</b> Создайте или присоединяйтесь по<br></br> ссылке к комнате!
            </p>
            <p>
              <b>2.</b> <b>Узнайте свою роль!<br></br></b> <span className="info-box-details">В поле для ввода сообщений вы увидите, кто вы:<br></br></span>
              <span className="player-role"> игрок или мафия.</span>
            </p>
          </div>
          <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
            <p className="info-box-second-header">
              <b>3.</b> <b>Дневное веселье!</b>
            </p>
            <p className="info-box-second">Днём все игроки общаются в чате, а мафия выбирает из вариантов, предложенных ИИ.</p>
            <p className="info-box-second">
              У вас есть 15 секунд, чтобы написать сообщение, после чего все они отправляются одновременно.
            </p>
          </div>
          <div className="dots">
            <span onClick={prevSlide}></span>
            <span onClick={nextSlide}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
