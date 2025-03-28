import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const createRoom = async (playerName) => {
  try {
    const response = await axios.post(`${API_URL}/rooms`, { playerName });
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

export const sendMessage = async (roomId, playerId, content) => {
  try {
    const response = await axios.post(`${API_URL}/rooms/${roomId}/messages`, { playerId, content });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const castVote = async (roomId, voterId, targetId) => {
  try {
    const response = await axios.post(`${API_URL}/rooms/${roomId}/vote`, { voterId, targetId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

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


