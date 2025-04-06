// src/components/MafiaScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleScreen.css';
import '../header.css';
import robot from '../../assets/images/mafia_ai.png';
import logo from '../../assets/images/logo.png';

const MafiaScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/ai-chat'); 
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="role-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="text">
        <h1>ПОЗДРАВЛЯЕМ! ВАША РОЛЬ</h1>
        <h2 className="role-name">МАФИЯ AI</h2>
      </div>

      <div className="role">
        <img src={robot} alt="Robot" />
      </div>
    </div>
  );
};

export default MafiaScreen;
