import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './WinnerScreen.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import { leaveRoom } from '../../api/room_api';

const HumanWinnerScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExitGame = async () => {
    const { roomCode, playerId } = location.state || {};

    if (!roomCode || !playerId) {
      console.error("Ошибка: Не указан roomCode или playerId");
      navigate('/');  // Переход на главную страницу, если данных нет
      return;
    }

    try {
      const leavePlayerResponse = await leaveRoom(roomCode, playerId);

      if (leavePlayerResponse.message === "Комната удалена") {
        console.log("Комната была удалена, перенаправляем на главную");
      } else if (leavePlayerResponse.status === 200) {
        console.log("Игрок успешно покинул комнату");
      } else {
        console.error("Ошибка при удалении игрока из комнаты:", leavePlayerResponse);
        alert("Ошибка при удалении игрока из комнаты: " + leavePlayerResponse.message);
      }
    } catch (error) {
      if (error.message === "Комната удалена" || error.response?.status === 404) {
        console.log("Комната была удалена, перенаправляем на главную");
      } else if (error.message === "Игрок не найден") {
        console.log("Игрок не найден, возможно, он уже покинул комнату");
      } else {
        console.error("Неизвестная ошибка при выходе из комнаты:", error);
      }
    } finally {
      navigate('/');  // Переход на главную страницу в любом случае
    }
  };

  return (
    <div className="mafia-winner-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="night-result">
        <p className="message">ПОБЕДИЛИ</p>
        <p className="human">МИРНЫЕ ЖИТЕЛИ!</p>
        <button className="exit-button" type="submit" onClick={handleExitGame}>Выйти из игры</button>
      </div>

    </div>
  );
};

export default HumanWinnerScreen;