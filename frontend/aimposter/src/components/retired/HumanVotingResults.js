import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { changeRoomStatus, getRoomDetails } from '../../api/room_api.js';
import './Retired.css';
import '../header.css';
import logo from '../../assets/images/logo.png';

const HumanVotingResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [playerRole, setPlayerRole] = useState(null);
  
  const { 
    token, 
    playerName, 
    roomCode, 
    playerId, 
    eliminatedPlayer 
  } = location.state || {};

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchPlayerRole = async () => {
      if (!roomCode || !playerId) return;
      
      try {
        const roomData = await getRoomDetails(roomCode);
        const player = roomData.Players.find(p => p.id === playerId);
        if (player) {
          setPlayerRole(player.role);
        }
      } catch (error) {
        console.error('Ошибка при получении роли игрока:', error);
      }
    };

    fetchPlayerRole();
  }, [roomCode, playerId]);

  useEffect(() => {
    if (eliminatedPlayer) {
      setUserName(eliminatedPlayer);
    }
  }, [eliminatedPlayer]);

  const handleButtonClick = async () => {
    if (!playerRole) return;
    
    setIsLoading(true);
    
    try {

      await changeRoomStatus(roomCode);

      const nextScreen = playerRole === 'mafia' ? '/mafia-voting' : '/human-night';
      
      navigate(nextScreen, {
        state: {
          token,
          playerName, 
          roomCode,
          playerId,
          playerRole
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
          disabled={isLoading || !playerRole}
        >
          {isLoading ? 'Переход...' : 'Продолжить'}
        </button>
        
        <br />
      </div>
    </div>
  );
};

export default HumanVotingResults;