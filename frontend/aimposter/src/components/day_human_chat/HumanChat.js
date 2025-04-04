import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HumanChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';
import img from '../../assets/images/blue_human.png';
import sendImg from '../../assets/images/send.png';

const ChatScreen = () => {
    const [roomCode, setRoomCode] = useState('9090');
    const [countdown, setCountdown] = useState(25);
    const [round, setRound] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [hasMessageSent, setHasMessageSent] = useState(false);
    const [isFinalReview, setIsFinalReview] = useState(false);
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
            if (round < 6) {
                // Переход к следующему раунду
                handleNextRound();
            } else if (!isFinalReview) {
                // После 6-го раунда - фаза финального просмотра
                handleFinalReview();
            } else {
                // После финального просмотра - переход
                navigate('/human-voting');
            }
        }
    }, [countdown, round, isFinalReview]);

    const handleNextRound = () => {
        // Добавляем сообщения от других игроков
        const mockMessages = [
            { text: `Сообщение от игрока 1`, sender: 'other', name: 'Player1' },
            { text: `Сообщение от игрока 2`, sender: 'other', name: 'Player2' },
            { text: `Сообщение от игрока 3`, sender: 'other', name: 'Player3' }
        ];

        setChatMessages(prev => [...prev, ...mockMessages]);
        setRound(round + 1);
        setCountdown(25);
        setHasMessageSent(false);
    };

    const handleFinalReview = () => {
        // Добавляем финальные сообщения
        const finalMessages = [
            { text: `Сообщение от игрока 1`, sender: 'other', name: 'Player1' },
            { text: `Сообщение от игрока 2`, sender: 'other', name: 'Player2' },
            { text: `Сообщение от игрока 3`, sender: 'other', name: 'Player3' }
        ];

        setChatMessages(prev => [...prev, ...finalMessages]);
        setIsFinalReview(true);
        setCountdown(10); // 10 секунд на финальный просмотр
    };

    const handleSendMessage = () => {
        if (inputValue.trim() && !hasMessageSent && !isFinalReview) {
            setChatMessages(prev => [
                ...prev,
                { text: `${inputValue}`, sender: 'user' }
            ]);
            setInputValue('');
            setHasMessageSent(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !isFinalReview) {
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
                    {chatMessages.map((msg, i) => (
                        <div key={i} className={`chat-message ${msg.sender}`}>
                            {msg.sender !== 'user' && msg.name && (
                                <div className="nickname">{msg.name}:</div>
                            )}
                            <div className="message-text">{msg.text}</div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="input-line">
                    <input
                        className="chat-input-line"
                        placeholder={isFinalReview ? "Финальный просмотр..." : "Введите сообщение..."}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsInputActive(e.target.value.length > 0);
                        }}
                        onKeyDown={handleKeyDown}
                        disabled={isFinalReview || hasMessageSent || countdown === 0}
                    />
                    <div className='img-inside-input'>
                        <img
                            src={isInputActive ? sendImg : img}
                            alt="Send"
                            onClick={isFinalReview ? undefined : handleSendMessage}
                            style={{ 
                                cursor: isFinalReview ? 'not-allowed' : 'pointer',
                                opacity: isFinalReview ? 0.5 : 1
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;