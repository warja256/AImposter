import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Retired.css';
import '../header.css';
import logo from '../../assets/images/logo.png';

const HumanVotingResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    token, 
    playerName, 
    roomCode, 
    playerId, 
    eliminatedPlayer 
  } = location.state || {};


  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (eliminatedPlayer) {
        setUserName(eliminatedPlayer);
    }
  }, [eliminatedPlayer]);

  const handleButtonClick = () => {
    navigate('/human-night', {
      state: {
        token,
        playerName, 
        roomCode,
        playerId,
      }
    });
  };

  return (
    <div className="retired-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="night-result">
        <p className="message">ПО ИТОГАМ ГОЛОСОВАНИЯ НАС ПОКИНУЛ</p>
        <p className="retired-user">{userName}</p>
        <button 
          className="send-button" 
          type="button"
          onClick={handleButtonClick}
        >
          Продолжить
        </button>
        <br />
      </div>
    </div>
  );
};

export default HumanVotingResults;