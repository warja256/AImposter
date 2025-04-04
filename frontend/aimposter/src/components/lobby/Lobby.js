import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../header.css";
import "./Lobby.css";
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png";
import { getRoomDetails, leaveRoom } from '../../api/room_api';

const LobbyScreen = () => {
  const [roomData, setRoomData] = useState(null); // Для хранения данных комнаты
  const [playerData, setPlayerData] = useState(null); // Для хранения данных игроков
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [playerCount, setPlayerCount] = useState(0); // Счётчик игроков
  const [playerId, setPlayerId] = useState(null); // Убираем дублирование
  const [isCreator, setIsCreator] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Используем useLocation для получения переданных данных

  useEffect(() => {
    if (location.state) {
      const { playerName, roomCode, playerId, isCreator } = location.state;
      setPlayerName(playerName);
      setRoomCode(roomCode);
      setPlayerId(playerId);
      console.log("Получены данные: ", { playerName, roomCode, playerId, isCreator });
       setIsCreator(isCreator);  
    }
  }, [location.state]);
  
  
  

  useEffect(() => {
    if (roomCode) {
      const fetchRoomData = async () => {
        try {
          const response = await getRoomDetails(roomCode);
          if (response.status === 404) {
            alert("Комната не найдена или была удалена.");
            navigate('/');  // Переход на главную страницу, если комната удалена
            return;
          }
          setRoomData(response);
          setPlayerCount(response.playerCount);
          setPlayerData(response.Players);
          setRoomCode(response.roomCode);
        } catch (error) {
          console.error("Ошибка при получении данных о комнате:", error);
          if (error.response && error.response.status === 404) {
            alert("Комната была удалена или не существует.");
            navigate('/');  // Переход на главную страницу, если комната удалена
          }
        }
      };
  
      fetchRoomData();
      const interval = setInterval(fetchRoomData, 5000);
  
      return () => clearInterval(interval);
    }
  }, [roomCode]);


  const handleLeaveRoom = async () => {
    if (!roomCode || !playerId) {
      console.error("Ошибка: Не указан roomCode или playerId");
      navigate('/');  // Переход на главную страницу, если данных нет
      return;
    }
  
    try {
      // Сначала пробуем удалить игрока
      const leavePlayerResponse = await leaveRoom(roomCode, playerId);
  
      // Если комната удалена
      if (leavePlayerResponse.message === "Комната удалена") {
        console.log("Комната была удалена, перенаправляем на главную");
        navigate('/'); // Переход на главную страницу
      } else if (leavePlayerResponse.status === 200) {
        console.log("Игрок успешно покинул комнату");
        navigate('/'); // Переход на главную страницу
      } else {
        console.error("Ошибка при удалении игрока из комнаты:", leavePlayerResponse);
        alert("Ошибка при удалении игрока из комнаты: " + leavePlayerResponse.message);
      }
    } catch (error) {
      // Обработка ошибки, если комната была удалена
      if (error.message === "Комната удалена" || error.response?.status === 404) {
        console.log("Комната была удалена, перенаправляем на главную");
        navigate('/');
      } else if (error.message === "Игрок не найден") {
        console.log("Игрок не найден, возможно, он уже покинул комнату");
        navigate('/');
      } else {
        console.error("Неизвестная ошибка при выходе из комнаты:", error);
        navigate('/'); // Переход на главную страницу в случае других ошибок
      }
    }
  };
  
  const handleStartGame = async () => {
    try {
      navigate('/connection', { state: { playerName, roomCode, playerId} });
    } catch (error) {
      console.error("Ошибка при определении мафии:", error);
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
        {isCreator && (
             <div>
               <button className="create-game" onClick={handleStartGame}>Начать</button>
             </div>
           )}
          <div>
            <div className="center">
              <div className="room-code-container">
              <div className="combined-lobby-button">
                {roomCode && (
                  <div className="code-container">
                    <button className="copy-button" onClick={handleCopyRoomCode}>Копировать</button>
                    <input 
                      type="text" 
                      className="code-field" 
                      value={roomCode} 
                      readOnly
                    />
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
