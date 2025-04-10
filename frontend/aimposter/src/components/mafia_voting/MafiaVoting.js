import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRoomDetails } from '../../api/room_api';
import './MafiaVoting.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";

const MafiaVotingScreen = () => {
    const [countdown, setCountdown] = useState(25);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { playerName, roomCode, playerId, token } = location.state || {};

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const data = await getRoomDetails(roomCode);
                setRoomData(data);
            } catch (error) {
                console.error("Ошибка при получении данных о комнате:", error);
            }
        };

        fetchRoomDetails();
    }, [roomCode]);

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
        console.log("Таймер завершен! Переход на другую страницу...");
        // navigate('/ai-chat', { state: { playerName, roomCode, playerId, token }});
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
                    {roomData && roomData.Players ? (
                        roomData.Players.map((player) => (
                            <button
                                key={player.id}
                                className={`player-button-m ${selectedPlayer === player.id ? 'selected' : ''}`}
                                onClick={() => handlePlayerSelect(player.id)}
                            >
                                <img src={player.avatar || avatar} className="avatar" alt={`Игрок ${player.name}`} />
                                <div className="text">{player.name}</div>
                            </button>
                        ))
                    ) : (
                        <p>Загрузка участников...</p>
                    )}
                </div>

                <button className="send-button-m" onClick={handleSend}>
                    <div className="button-text">ОТПРАВИТЬ</div>
                </button>
            </div>
        </div>
    );
};

export default MafiaVotingScreen;