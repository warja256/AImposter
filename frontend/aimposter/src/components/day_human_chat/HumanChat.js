import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HumanChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';
import img from '../../assets/images/blue-human.png';
import sendImg from '../../assets/images/send.png'; // Изображение для кнопки отправки

const ChatScreen = () => {
    const [roomCode, setRoomCode] = useState('9090');
    const [countdown, setCountdown] = useState(15);
    const [round, setRound] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const navigate = useNavigate();

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            if (round < 6) {
                setRound(round + 1);
                setCountdown(15);
            } else {
                handleCountdownEnd();
            }
        }
    }, [countdown, round]);

    const handleCountdownEnd = () => {
        console.log("Таймер завершен! Переход на другую страницу...");
        // navigate('/next-page'); // Раскомментируйте эту строку, когда будете готовы к переходу
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            console.log('Сообщение отправлено:', inputValue);
            // Здесь можно добавить логику для отправки сообщения в чат
            setInputValue('');
            setIsInputActive(false);
        }
    };

    return (
        <div className="human-chat-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>

            <div className="box">
                <div className="up-header">
                    <img src={info} alt="Info" className="info" />
                    <div className="timer">{formatTime(countdown)}</div>
                    <div className="code-panel">
                        <p className="code-label">CODE:</p>
                        <p className="code-value">{roomCode}</p>
                    </div>
                </div>

                <div className="chat">
                    {/* Здесь будут отображаться сообщения */}
                </div>

                <div className="input-line">
                    <input
                        className="chat-input-line"
                        placeholder="Введите сообщение..."
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsInputActive(true);
                        }}
                    />
                    <div className='img-inside-input'>
                        <img
                            src={isInputActive ? sendImg : img}
                            alt="Human Img"
                            onClick={handleSendMessage}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
