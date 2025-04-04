//экран не используется, для выбора просто появляется контейнер с ответами ии

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AiChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';

const AiResponses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode: prevRoomCode, message } = location.state || {};
  
  const [countdown, setCountdown] = useState(15);
  const [roomCode, setRoomCode] = useState(prevRoomCode || '9090');
  const [selectedOption, setSelectedOption] = useState(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval = null;

    if (countdown !== 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      // Автоматический переход при окончании времени
      handleSubmit();
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    // Подготовка данных для передачи
    const transitionData = {
      roomCode: roomCode,
      aiMessage: message,
      selectedOption: selectedOption !== null ? `Вариант ${selectedOption + 1}` : null,
      fromScreen: 'ai-responses'
    };

    // Переход на экран чата с передачей данных
    navigate('/chat', {
      // state: transitionData
    });
  };

  return (
    <div className="ai-chat-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="chat-box">
        <div className="panel">
          <img src={info} alt="Info" className="info" />
          <div className="timer">{formatTime(countdown)}</div>
          <div className="code-panel">
            <p className="code-label">CODE:</p>
            <p className="code-value">{roomCode}</p>
          </div>
        </div>
      </div>

      <div className="responses-container">
        <div className="choice-container">
          {[1, 2, 3].map((value, index) => (
            <input
              key={index}
              className={`message-input ${selectedOption === index ? 'selected' : ''}`}
              readOnly
              value={`Вариант ${value}`}
              onClick={() => handleSelectOption(index)}
            />
          ))}
        </div>
        <button 
          className="send-button" 
          type="submit"
          onClick={handleSubmit}
          disabled={selectedOption === null} // Кнопка неактивна, пока не выбран вариант
        >
          ОТПРАВИТЬ
        </button>
      </div>
    </div>
  );
};

export default AiResponses;