import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../header.css";
import "./Lobby.css";
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";
import { getRoomDetails, leaveRoom } from '../../api/api';

const LobbyScreen = () => {
  const [roomData, setRoomData] = useState(null); // Для хранения данных комнаты
  const [playerData, setPlayerData] = useState(null); // Для хранения данных игроков
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [playerCount, setPlayerCount] = useState(0); // Счётчик игроков
  const [playerId, setPlayerId] = useState(null); // Убираем дублирование

  const navigate = useNavigate();
  const location = useLocation(); // Используем useLocation для получения переданных данных

  useEffect(() => {
    if (location.state) {
      const { playerName, roomCode, playerId } = location.state;

      // Устанавливаем имя игрока, код комнаты и playerId
      setPlayerName(playerName);
      setRoomCode(roomCode);
      setPlayerId(playerId); // Устанавливаем playerId
    }
  }, [location.state]); // Зависимость от состояния

  useEffect(() => {
    if (roomCode) {
      // Функция для получения данных о комнате и её участниках
      const fetchRoomData = async () => {
        try {
          const response = await getRoomDetails(roomCode);
          setRoomData(response);  // Теперь мы устанавливаем всю комнату
          setPlayerCount(response.playerCount); // Устанавливаем количество игроков
          setPlayerData(response.Players); 
          setPlayerId(response.playerId);
          setRoomCode(response.roomCode);// Устанавливаем список игроков
        } catch (error) {
          console.error("Error fetching room details:", error);
        }
      };

      fetchRoomData(); // Первоначальный запрос
      const interval = setInterval(fetchRoomData, 5000); // Запрашиваем каждые 5 сек

      return () => clearInterval(interval); // Очищаем интервал при выходе
    }
  }, [roomCode]); // Зависимость от кода комнаты

  const handleLeaveRoom = async () => {
    if (roomCode && playerId) {  
        try {
            // Отправляем запрос с roomCode и playerId
            const response = await leaveRoom(roomCode, playerId);
            
            // Проверяем статус ответа и переходим на главную страницу
            if (response.status === 200) {
                console.log("Successfully left the room:");
                navigate('/');
            } else {
                console.error("Ошибка при выходе из комнаты:", response);
            }
        } catch (error) {
            console.error("Ошибка при выходе из комнаты:", error);
        }
    } else {
        console.error("Ошибка: Не указан roomCode или playerId");
    }
  };

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomCode)
      .then(() => alert("Код комнаты скопирован!"))
      .catch(err => console.error("Ошибка при копировании:", err));
  };

  return (
    <div className="lobby-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>
      <div>
        <h3 className="lobby-header">Создание игровой комнаты</h3>
      </div>
      <div className="lobby">
        <div className="lobby-buttons">
          <div>
            <button className="create-game">Начать</button>
          </div>
          <div>
            <div className="center">
              <div className="room-code-container">
                <div className="combined-button">
                  {roomCode && (
                    <div className="code-container">
                      <input 
                        type="text" 
                        className="code-field" 
                        value={roomCode} 
                        readOnly
                      />
                      <button className="copy-button" onClick={handleCopyRoomCode}>
                        📋 Копировать
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            
              <button className="create-game go-back" onClick={handleLeaveRoom}>Назад</button>
            
          </div>
        </div>
        <div className="lobby-users">
          <h3>УЧАСТНИКИ {playerCount}/4</h3>
          {playerData ? (
            playerData.map((player, index) => (
              <button key={index} className="player-button">
                <img src={avatar} className="avatar" alt={`Игрок ${index + 1}`} />
                <div className="text">{player.name}</div> {/* Отображаем имя игрока */}
              </button>
            ))
          ) : (
            <p>Загрузка участников...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
