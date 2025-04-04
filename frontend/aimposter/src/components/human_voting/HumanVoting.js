import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HumanVoting.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";

const HumanVotingScreen = () => {
    const [countdown, setCountdown] = useState(20);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

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
            handleCountdownEnd();
        }
    }, [countdown]);

    const handleCountdownEnd = () => {
        const { roomCode, playerId } = location.state || {};
        navigate('/killed', {
            state: {
                roomCode: roomCode,
                playerId: playerId,
                votedPlayer: selectedPlayer
            }
        });
    };

    const handlePlayerSelect = (playerId) => {
        setSelectedPlayer(playerId);
    };

    const handleSend = () => {
        if (selectedPlayer !== null) {
            console.log(`Отправлен выбор: Игрок ${selectedPlayer}`);
            handleCountdownEnd();
        }
    };

    // Новая функция для перехода на экран голосования мафии
    const handleNightTransition = () => {
        const { roomCode, playerId } = location.state || {};
        navigate('/mafia-voting', {
            state: {
                roomCode: roomCode,
                playerId: playerId,
                dayVote: selectedPlayer // Передаем результаты дневного голосования
            }
        });
    };

    return (
        <div className="human-voting-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>

            <div className="central-box-h">
                <div className="up-panel-h">
                    <div className="head-text-h">
                        ГОЛОСОВАНИЕ
                        <div className="timerr-h">{formatTime(countdown)}</div>
                    </div>
                </div>

                <div className="player-list">
                    {[1, 2, 3, 4].map((playerId) => (
                        <button
                            key={playerId}
                            className={`player-button-h ${selectedPlayer === playerId ? 'selected' : ''}`}
                            onClick={() => handlePlayerSelect(playerId)}
                        >
                            <img src={avatar} className="avatar" alt={`Player ${playerId}`} />
                            <div className="text">Игрок {playerId}</div>
                        </button>
                    ))}
                </div>

                <button 
                    className="send-button-h" 
                    onClick={handleSend}
                    disabled={selectedPlayer === null}
                >
                    <div className="button-text">ОТПРАВИТЬ</div>
                </button>
            </div>
            
            {/* Кнопка для перехода в ночную фазу */}
            <button 
                className="but-night" 
                onClick={handleNightTransition}
            >
                <div className="button-text">НОЧЬ</div>
            </button>
        </div>
    );
};

export default HumanVotingScreen;