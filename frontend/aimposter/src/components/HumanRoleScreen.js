// src/components/HumanRoleScreen.js
import React from 'react';
import './MafiaScreen.css';
import human from '../assets/images/human.png';
import logo from '../assets/images/logo.png';

const HumanRoleScreen = () => {
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
        <h2 className="mafia-ai">ЧЕЛОВЕК</h2>
      </div>
      <div className="robot-icon">
        <img src={human} alt="Human" />
      </div>
    </div>
  );
};

export default HumanRoleScreen;