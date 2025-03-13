import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HumanChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';
import img from '../../assets/images/blue_human.png';
import sendImg from '../../assets/images/send.png'; // Изображение для кнопки отправки

const ChatScreen = () => {
    const [roomCode, setRoomCode] = useState('9090');
    const [countdown, setCountdown] = useState(15);
    const [round, setRound] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [hasMessageSent, setHasMessageSent] = useState(false); // Новый флаг
    const navigate = useNavigate();
    const chatEndRef = useRef(null);

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
            handleSendPendingMessages();
        }
    }, [countdown]);

    useEffect(() => {
        if (round > 6) {
            handleCountdownEnd();
        }
    }, [round]);

    const handleCountdownEnd = () => {
        console.log("Таймер завершен! Переход на другую страницу...");
        // navigate('/next-page'); // Раскомментируйте эту строку, когда будете готовы к переходу
    };

    const handleSendPendingMessages = () => {
        // Добавляем заглушки сообщений от других игроков
        const mockMessages = [
            { text: 'Сообщение от игрока 1', sender: 'other', name: 'Player1' },
            { text: 'Сообщение от игрока 2', sender: 'other', name: 'Player2' },
            { text: 'Сообщение от игрока 3', sender: 'other', name: 'Player3' }
        ];

        // Обновляем chatMessages с новыми сообщениями
        setChatMessages((prevMessages) => [
            ...prevMessages,
            ...mockMessages
        ]);

        // Переход к следующему раунду
        if (round < 6) {
            setRound(round + 1);
            setCountdown(15);
            setHasMessageSent(false); // Сбрасываем флаг для нового раунда
        }
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '' && !hasMessageSent) { // Проверка на отправку только одного сообщения
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { text: inputValue, sender: 'user' }
            ]);
            setInputValue('');
            setHasMessageSent(true); // Отмечаем, что сообщение отправлено
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

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
                    {chatMessages.map((chatMessage, index) => (
                        <div key={index} className={`chat-message ${chatMessage.sender}`}>
                            {chatMessage.sender !== 'user' && (
                                <div className="nickname">{chatMessage.name}:</div>
                            )}
                            <div className="message-text">{chatMessage.text}</div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
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
                        onKeyDown={handleKeyDown} // Обработчик нажатия клавиши Enter
                        disabled={countdown === 0 || hasMessageSent} // Отключаем поле ввода, если время истекло или сообщение отправлено
                    />
                    <div className='img-inside-input'>
                        <img
                            src={isInputActive ? sendImg : img}
                            alt="Human Img"
                            onClick={handleSendMessage}
                            style={{ cursor: 'pointer' }}
                            disabled={countdown === 0 || hasMessageSent} // Отключаем кнопку отправки
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
