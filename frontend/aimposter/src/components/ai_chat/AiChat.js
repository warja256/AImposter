import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AiChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';

const AiChatScreen = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15); // Таймер
  const [roomCode, setRoomCode] = useState('9090'); // Код комнаты
  const [message, setMessage] = useState(''); // Сообщение
  const [sentMessages, setSentMessages] = useState([]); // Массив для отправленных сообщений
  const [showChoices, setShowChoices] = useState(false); // Показывать варианты выбора
  const [selectedOption, setSelectedOption] = useState(null); // Добавляем состояние для выбранного варианта

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
      setShowChoices(true); // Показываем варианты выбора
      setCountdown(15); // Обновляем таймер
    }
  
    return () => clearInterval(interval);
  }, [countdown]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    
    if (message.trim()) {
      console.log(`Промт мафии: ${message}`);
      setSentMessages([...sentMessages, message]); // Добавляем сообщение в массив
      setMessage(''); // Очищаем поле ввода
      setShowChoices(true); // Переключаемся на отображение вариантов выбора
      setCountdown(15); // Сбрасываем таймер и начинаем отсчет заново
      
      // Переход на страницу ответов
      navigate('/ai-responses', {
        // state: {
        //   roomCode: roomCode,
        //   message: message,
        //   sentMessages: sentMessages
        // }
      });
    }
  };
  
  const handleChange = (event) => {
    setMessage(event.target.value); // Обновление состояния при изменении ввода
  };

  const handleSelectOption = (index) => {
    setSelectedOption(index); // Устанавливаем выбранный вариант
    console.log(`Выбран вариант ${index + 1}`);
  };

  return (
    <div className="ai-chat-screen">
      {/* Логотип и заголовок */}
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      {/* Основной чат-бокс */}
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

      {/* Контейнер для отправки промтов */}
      {!showChoices && (
        <div className="promt-container">
          <div className="promt-label">Задайте промт для ИИ</div>
          <input 
            className="message-input" 
            placeholder="Введите промт..." 
            value={message} 
            onChange={handleChange} 
          />
          <button 
            className="send-button" 
            type="submit" 
            onClick={handleSubmit}
          >
            ОТПРАВИТЬ
          </button>
        </div>
      )}

      {/* Варианты выбора появляются после нажатия на кнопку "Отправить" */}
      {showChoices && (
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
          <button className="send-button" type="submit">ОТПРАВИТЬ</button>
        </div>
      )}
    </div>
  );
};

export default AiChatScreen;