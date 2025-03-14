//экран не используется, для выбора просто появляется контейнер с ответами ии

import React, { useState, useEffect } from 'react';
import './AiChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';

const AiResponses = () => {
  const [countdown, setCountdown] = useState(15); // Таймер
  const [roomCode, setRoomCode] = useState('9090'); // Код комнаты

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
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const [selectedOption, setSelectedOption] = useState(null); // Начальное состояние: ни один вариант не выбран

  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex); // Устанавливаем выбранный вариант
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
              readOnly // Делаем поле только для чтения
              value={`Вариант ${value}`} // Значение для примера
              onClick={() => handleSelectOption(index)} // Обработчик выбора
            />
          ))}
        </div>
        <button className="send-button" type="submit">ОТПРАВИТЬ</button>
      </div>

    </div>
  );
};

export default AiResponses;
