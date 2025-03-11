// src/components/MafiaScreen.js
import React from 'react';
import './MafiaScreen.css';
import robot from '../assets/images/mafia_ai.png';
import logo from '../assets/images/logo.png';

const MafiaScreen = () => {
  return (
    <div className="welcome-screen">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="title-container">
          <span className="mafia-title">AImposter</span>
        </div>
      </div>
      <div className="text">
        <h1>ПОЗДРАВЛЯЕМ! ВАША РОЛЬ</h1>
        <h2 className="mafia-ai">МАФИЯ AI</h2>
      </div>
      <div className="robot-icon">
        <img src={robot} alt="Robot" />
      </div>
    </div>
  );
};

export default MafiaScreen;