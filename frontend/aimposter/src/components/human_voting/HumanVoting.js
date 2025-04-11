import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { playerSetVote, endVotingRound } from '../../api/vote_api.js';
import { getRoomDetails } from '../../api/room_api'; // Используем существующую функцию
import './HumanVoting.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";

const HumanVotingScreen = () => {
    const [countdown, setCountdown] = useState(20);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [players, setPlayers] = useState([]);
    const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { token, playerName, roomCode, playerId } = location.state || {};

    // Загружаем данные комнаты и игроков
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                if (roomCode) {
                    const roomData = await getRoomDetails(roomCode);
                    const roomPlayers = roomData.Players || roomData.players || [];
                    setPlayers(roomPlayers);
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных комнаты:', error);
            } finally {
                setIsLoadingPlayers(false);
            }
        };

        fetchRoomData();
    }, [roomCode, playerId]);

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

    const handleCountdownEnd = async () => {
        try {
            if (roomCode) {
                const response = await endVotingRound(roomCode);
                console.log('Результат голосования:', response);

                if (response.id && response.id.toString() === playerId.toString()) {
                    navigate('/retired', {
                        state: {
                            token,
                            playerName,
                            roomCode,
                            playerId,
                            isEliminated: true
                        }
                    });
                } else {
                    navigate('/human-voting-results', {
                        state: {
                            token,
                            playerName,
                            roomCode,
                            playerId,
                            eliminatedPlayer: response.name
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Ошибка при завершении голосования:', error);
            navigate('/human-voting-results', {
                state: {
                    token,
                    playerName,
                    roomCode,
                    playerId,
                    error: 'Не удалось завершить голосование'
                }
            });
        }
    };

    const handlePlayerSelect = (playerId) => {
        setSelectedPlayer(prev => prev === playerId ? null : playerId);
    };

    const handleSend = async () => {
        if (selectedPlayer === null || isLoading) return;
        
        try {
            setIsLoading(true);
            
            if (!roomCode || !playerId) {
                throw new Error("Отсутствуют roomCode или playerId");
            }
            
            await playerSetVote(playerId, selectedPlayer, roomCode);
            console.log(`Голос успешно отправлен за игрока ${selectedPlayer}`);
            handleCountdownEnd();
        } catch (error) {
            console.error("Не удалось отправить голос:", error);
        } finally {
            setIsLoading(false);
        }
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

                {isLoadingPlayers ? (
                    <div className="loading-players">Загрузка списка игроков...</div>
                ) : players.length === 0 ? (
                    <div className="no-players">Нет доступных игроков для голосования</div>
                ) : (
                    <div className="player-list">
                        {players.map((player) => (
                            <button
                                key={player.id}
                                className={`player-button-h ${selectedPlayer === player.id ? 'selected' : ''}`}
                                onClick={() => handlePlayerSelect(player.id)}
                                disabled={isLoading}
                            >
                                <img 
                                    src={player.avatar || avatar} 
                                    className="avatar" 
                                    alt={`Player ${player.name}`} 
                                />
                                <div className="text">{player.name}</div>
                            </button>
                        ))}
                    </div>
                )}

                <button 
                    className="send-button-h" 
                    onClick={handleSend}
                    disabled={selectedPlayer === null || isLoading || isLoadingPlayers}
                >
                    <div className="button-text">
                        {isLoading ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default HumanVotingScreen;