import React, { useState, useEffect } from 'react';
import './MafiaVoting.css';
import '../header.css';
import logo from '../../assets/images/logo.png';

const MaifiaVotingScreen = () => {
    const [countdown, setCountdown] = useState(20);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    //   useEffect(() => {
    //     if (countdown > 0) {
    //       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    //       return () => clearTimeout(timer);
    //     }
    //   }, [countdown]);

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

            <div className="chat-box">

                <div className="panel">
                    <div className="head-text">
                        <h1>НОЧЬ, МАФИЯ ДЕЛАЕТ ВЫБОР
                        <div className="timer">{formatTime(countdown)}</div></h1>
                    </div>
                </div>

                <div className="player-list">
                    <button
                        className={`player-button ${selectedPlayer === 1 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(1)}
                    >
                        <div className="text">Игрок 1</div>
                    </button>
                    <button
                        className={`player-button ${selectedPlayer === 2 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(2)}
                    >
                        <div className="text">Игрок 2</div>
                    </button>
                    <button
                        className={`player-button ${selectedPlayer === 3 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(3)}
                    >
                        <div className="text">Игрок 3</div>
                    </button>
                    <button
                        className={`player-button ${selectedPlayer === 4 ? 'selected' : ''}`}
                        onClick={() => handlePlayerSelect(4)}
                    >
                        <div className="text">Игрок 4</div>
                    </button>
                </div>

                <button className="send-button" onClick={handleSend}>
                <div className="button-text">ОТПРАВИТЬ</div>
                </button>
            </div>
        </div>
    );
};

export default MaifiaVotingScreen;
