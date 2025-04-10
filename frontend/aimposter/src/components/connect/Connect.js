import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRoomDetails } from "../../api/room_api.js";
import { getMafiaId } from "../../api/role_api.js";

const ConnectScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playerName, playerId, roomCode, token, mafiaId } = location.state || {};

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomDetails = await getRoomDetails(roomCode);
        console.log(roomDetails);
        const player = roomDetails.Players.find(p => p.id === playerId);
        const mafiaData = await getMafiaId(roomCode);

        if (mafiaData.message === "В комнате уже есть мафия") {
          console.log("Мафия уже выбрана в этой комнате.");
          return; // Прерываем выполнение, если мафия уже выбрана
        }

        const mafiaId = mafiaData.mafiaId;
        if (player) {
          if (playerId === mafiaId) {
            navigate('/mafia-role', { state: { playerName, roomCode, playerId, token } });
          } else {
            navigate('/human-role', { state: { playerName, roomCode, playerId, token } });
          }
        }
      } catch (error) {
        console.error("Ошибка при получении данных о комнате:", error);
      }
    };

    if (roomCode) {
      fetchRoomDetails();
    }

  }, [roomCode, playerId, mafiaId, navigate]);

  return (
    <div className="connect-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>
            <div>
                <h3 className="connect-header">ОПРЕДЕЛЯЕМ ВАШУ РОЛЬ</h3>
            </div>
            <div className="connect-dots">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
  );
};

export default ConnectScreen;
