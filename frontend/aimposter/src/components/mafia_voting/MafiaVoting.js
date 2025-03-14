import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MafiaVoting.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";

const MafiaVotingScreen = () => {
    const [countdown, setCountdown] = useState(180); // 3 minutes
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

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
            // Placeholder for future code to navigate to another page
            handleCountdownEnd();
        }
    }, [countdown, navigate]);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            if (selectedPlayer !== null) {
                console.log(`Отправлен выбор: Игрок ${selectedPlayer}`);
            }
        }, 25000); // 25 seconds

        return () => clearInterval(messageInterval);
    }, [selectedPlayer]);

    const handleCountdownEnd = () => {
        // Logic for navigating to another page
        console.log("Таймер завершен! Переход на другую страницу...");
        // navigate('/next-page'); // Uncomment this line when ready to navigate
    };

    const handlePlayerSelect = (playerId) => {
        setSelectedPlayer(playerId);
    };

    const handleSend = () => {
        if (selectedPlayer !== null) {
            console.log(`Отправлен выбор: Игрок ${selectedPlayer}`);
        }
    };

    return (
        <div className="mafia-night-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>

            <div className="central-box">
                <div className="up-panel">
                    <div className="head-text">
                        НОЧЬ, МАФИЯ ДЕЛАЕТ ВЫБОР
                        <div className="timerr">{formatTime(countdown)}</div>
                    </div>
                </div>

                <div className="player-list">
                    <button
                        className={`player-button-m ${selectedPlayer === 1 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(1)}
                    >
                        <img src={avatar} className="avatar" />
                        <div className="text">Игрок 1</div>
                    </button>
                    <button
                        className={`player-button-m ${selectedPlayer === 2 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(2)}
                    >
                        <img src={avatar} className="avatar" />
                        <div className="text">Игрок 2</div>
                    </button>
                    <button
                        className={`player-button-m ${selectedPlayer === 3 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(3)}
                    >
                        <img src={avatar} className="avatar" />
                        <div className="text">Игрок 3</div>
                    </button>
                    <button
                        className={`player-button-m ${selectedPlayer === 4 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(4)}
                    >
                        <img src={avatar} className="avatar" />
                        <div className="text">Игрок 4</div>
                    </button>
                </div>

                <button className="send-button-m" onClick={handleSend}>
                    <div className="button-text">ОТПРАВИТЬ</div>
                </button>
            </div>
        </div>
    );
};

export default MafiaVotingScreen;