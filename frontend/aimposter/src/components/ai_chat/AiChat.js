import React, { useState, useEffect } from 'react';
import './AiChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';

const AiChatScreen = () => {
  const [countdown, setCountdown] = useState(15); // Таймер
  const [roomCode, setRoomCode] = useState('9090'); // Код комнаты
  const [message, setMessage] = useState(''); // Сообщение
  const [sentMessages, setSentMessages] = useState([]); // Массив для отправленных сообщений

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

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    
    if (message.trim()) {
      console.log(`Промт мафии: ${message}`);
      setSentMessages([...sentMessages, message]); // Добавляем сообщение в массив
      setMessage(''); // Очищаем поле ввода
    }
  };
  
  const handleChange = (event) => {
    setMessage(event.target.value); // Обновление состояния при изменении ввода
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

      <div className="promt-label">Задайте промт для ИИ</div>

      <form onSubmit={handleSubmit}>
        <input className="message-input" placeholder="Введите промт..." value={message} onChange={handleChange} /><br></br>
        <button className="send-button" type="submit">ОТПРАВИТЬ</button>
      </form>

    </div>
  );
};

export default AiChatScreen;
