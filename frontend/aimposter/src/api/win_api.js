import config from '../config/config';
import axios from 'axios';
console.log("API URL:", config.apiUrl); 
const API_URL = 'http://localhost:8080/api';

  export const seeWinner = async (roomCode) => {
    try {
      const response = await fetch(`${API_URL}/rooms/${roomCode}/winner`);
      const winnerStatus = await response.text();
      
      if (winnerStatus !== "mafia" && winnerStatus !== "civilian" && winnerStatus !== "continue") {
        throw new Error(`Invalid response from server: ${winnerStatus}`);
      }
      return winnerStatus;
    } catch (error) {
      console.error("Failed to fetch winner status:", error);
      throw error;
    }
  };