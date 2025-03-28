import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../header.css";
import "./Lobby.css";
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";
import { getRoomDetails, joinRoom, leaveRoom } from '../../api/api';

const LobbyScreen = () => {
  const [roomData, setRoomData] = useState(null); // Для хранения данных комнаты
  const [playerData, setPlayerData] = useState(null); // Для хранения данных игроков
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [playerCount, setPlayerCount] = useState(0); // Счётчик игроков
  const navigate = useNavigate();
  const location = useLocation(); // Используем useLocation для получения переданных данных

  useEffect(() => {
    if (location.state) {
      const { playerName, roomCode } = location.state;

      // Устанавливаем имя игрока и код комнаты, полученные из состояния
      setPlayerName(playerName);
      setRoomCode(roomCode);
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
          setPlayerData(response.Players); // Устанавливаем список игроков (заменяем 'players' на 'Players')
        } catch (error) {
          console.error("Error fetching room details:", error);
        }
      };
      

      fetchRoomData(); // Загружаем данные при наличии кода комнаты
    }
  }, [roomCode]); // Зависимость от кода комнаты

  const handleLeaveRoom = async () => {
    if (roomCode) {
      try {
        const response = await leaveRoom(roomCode);
        if (response.success) {
          console.log("Successfully left the room:", response);
          navigate('/', {state: { playerId, roomCode }})
        } // Удаляем игрока из комнаты
      } catch (error) {
        console.error("Ошибка при выходе из комнаты:", error);
      }
    }
    navigate('/'); // Переход на главный экран
  };
  

  // const handleJoinRoom = async () => {
  //   if (roomCode && playerName) {
  //     try {
  //       const response = await joinRoom(roomCode, playerName);
  //       if (response.success) {
  //         console.log("Successfully joined the room:", response);
  //         // Переход в лобби
  //         navigate('/lobby', { state: { playerName, roomCode } });
  //       }
  //     } catch (error) {
  //       console.error("Error joining room:", error);
  //       alert("Ошибка при присоединении к комнате");
  //     }
  //   } else {
  //     alert("Заполните код комнаты и имя игрока");
  //   }
  // };

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
