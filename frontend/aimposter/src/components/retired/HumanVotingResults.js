import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { changeRoomStatus } from '../../api/room_api.js'; // Импортируем функцию смены статуса
import './Retired.css';
import '../header.css';
import logo from '../../assets/images/logo.png';

const HumanVotingResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleButtonClick = async () => {
    setIsLoading(true);
    
    try {
      await changeRoomStatus(roomCode);

      navigate('/human-night', {
        state: {
          token,
          playerName, 
          roomCode,
          playerId,
        }
      });
      
    } catch (err) {
      console.error('Ошибка при смене статуса игры:', err);
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        >
          {isLoading ? 'Переход...' : 'Продолжить'}
        </button>
        
        <br />
      </div>
    </div>
  );
};

export default HumanVotingResults;