import config from '../config/config';
import axios from 'axios';
console.log("API URL:", config.apiUrl); 
const API_URL = 'http://localhost:8080/api';

export const getRoomDetails = async (roomCode) => {
    try {
      const response = await fetch(`${API_URL}/rooms/${roomCode}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching room details:", error);
      throw error;
    }
  };
  
  export const leaveRoom = async (roomCode, playerId) => {
    try {
      const response = await fetch(`${API_URL}/rooms/leave/${roomCode}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerId }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка при выходе из комнаты:", error);
      throw error;
    }
  };

  export const createRoom = async (playerName) => {
    try {
      const response = await axios.post(`${API_URL}/rooms`, { playerName });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  
  export const joinRoom = async (roomCode, playerName) => {
    try {
      const response = await axios.post(`${API_URL}/rooms/join`, { roomCode, playerName });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const changeRoomStatus = async (roomCode) => {
    try {
      const response = await fetch(`${API_URL}/rooms/${roomCode}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // если используете куки для аутентификации
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Ошибка при смене статуса игры:", error);
      throw error;
    }
  };