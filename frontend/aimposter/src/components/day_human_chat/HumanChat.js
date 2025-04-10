import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HumanChat.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';
import img from '../../assets/images/blue_human.png';
import sendImg from '../../assets/images/send.png';
import socket from "../../config/socket";

const ChatScreen = () => {
    const [countdown, setCountdown] = useState(140);
    const [round, setRound] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
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
        if (roomCode) {
            console.log("Присоединение к комнате:", roomCode);
        }
    }, [roomCode]);

    useEffect(() => {
        socket.on('newMessage', (message) => {
            console.log("Сообщение от сервера:", message);
            if (message.content) {
                setChatMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, { name: message.name, content: message.content }];
                    console.log("Обновленные сообщения:", updatedMessages);
                    return updatedMessages;
                });
            }
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
                setRound(round + 1);
                setCountdown(25);
            } else if (!isFinalReview) {
                setIsFinalReview(true);
                setCountdown(10);
            } else {
                navigate('/human-voting');
            }
        }
    }, [countdown, round, isFinalReview]);

    const handleSendMessage = () => {
        const trimmed = inputValue.trim();

        if (trimmed && !isFinalReview) {
            const messageData = {
                token,
                roomCode,
                playerId,
                content: trimmed
            };

            console.log("Отправка сообщения с задержкой в 20 секунд:", messageData);

            // Устанавливаем задержку в 20 секунд перед отправкой
            setTimeout(() => {
                socket.emit('sendMessage', messageData);
                setInputValue('');
            }, 20000); // 20 секунд
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsInputActive(value.trim().length > 0);
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
                        <div key={i} className={`chat-message ${msg.name === playerName ? 'user' : 'other'}`}>
                            {msg.name && (
                                <div className="nickname">{msg.name}:</div>
                            )}
                            <div className="message-text">{msg.content}</div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="input-line">
                    <input
                        className="chat-input-line"
                        placeholder={isFinalReview ? "Финальный просмотр..." : "Введите сообщение..."}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isFinalReview) {
                                handleSendMessage();
                            }
                        }}
                        disabled={isFinalReview || countdown === 0}
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
