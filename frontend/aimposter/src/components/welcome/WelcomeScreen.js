import React from "react";
import "./WelcomeScreen.css";
import "../header.css";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png"; 

const WelcomeScreen = () => {
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
                <input type="text" className="input-field" placeholder="Имя..." />
            </div>
          
          
          <div className="room-code-container">
            <button className="join-button">Войти</button>
            <input type="text" className="code-field" value="0000000" readOnly />
          </div>

          <button className="create-game">Создать Игру</button>
        </div>

        {/* Блок инструкции */}
        <div className="info-box">
          <h3>КАК ИГРАТЬ:</h3>
          <p>
            <b>1.</b> Создайте или присоединяйтесь по ссылке к комнате!
          </p>
          <p>
            <b>2.</b> <b>Узнайте свою роль!</b> В поле для ввода сообщений вы увидите, кто вы:
            <span className="player-role"> игрок </span> или <span className="mafia-role">мафия</span>.
          </p>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
