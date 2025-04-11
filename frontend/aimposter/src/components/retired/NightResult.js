  import React, { useState, useEffect } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import './Retired.css';
  import '../header.css';
  import logo from '../../assets/images/logo.png';

  const NightResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { eliminatedPlayerName, playerName, roomCode, playerId, token } = location.state || {};


    const handleButtonClick = () => {
      navigate('/chat', { state: { playerName, roomCode, playerId, token } });
    };

    return (
      <div className="retired-screen">
        <div className="logo-container">
          <img src={logo} alt="AImposter Logo" />
          <span className="header-title">AImposter</span>
        </div>

        <div className="night-result">
          <p className="message">ЭТОЙ НОЧЬЮ НАС ПОКИНУЛ</p>
          <p className="retired-user">{eliminatedPlayerName}</p>
          <button className="send-button" type="submit" onClick={handleButtonClick}>Продолжить</button><br></br>
        </div>

      </div>
    );
  };

  export default NightResult;