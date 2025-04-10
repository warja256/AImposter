import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import './HumanChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';
import img from '../../assets/images/blue_human.png';
import sendImg from '../../assets/images/send.png';

const socket = io("ws://localhost:8080");

const ChatScreen = () => {
    const [countdown, setCountdown] = useState(250);
    const [round, setRound] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [hasMessageSent, setHasMessageSent] = useState(false);
    const [isFinalReview, setIsFinalReview] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const chatEndRef = useRef(null);
    const { token, playerName, roomCode, playerId } = location.state || {};

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        socket.on('newMessage', (message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage'); 
        };
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            if (round < 6) {
                // Переход к следующему раунду
                setRound(round + 1);
                setCountdown(25);
                setHasMessageSent(false);
            } else if (!isFinalReview) {
                // После 6-го раунда - фаза финального просмотра
                setIsFinalReview(true);
                setCountdown(10); // 10 секунд на финальный просмотр
            } else {
                // После финального просмотра - переход
                navigate('/human-voting');
            }
        }
    }, [countdown, round, isFinalReview]);

    const handleSendMessage = () => {
        if (inputValue.trim() && !hasMessageSent && !isFinalReview) {
            const messageData = {
                token: token, 
                roomCode: roomCode,
                playerId: playerId, 
                content: inputValue
            };

            // Отправка сообщения через WebSocket
            socket.emit('sendMessage', messageData);
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
