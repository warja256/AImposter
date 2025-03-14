import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createRoom = async (playerName) => {
  try {
    const response = await axios.post(`${API_URL}/rooms`, { playerName });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const joinRoom = async (roomId, playerName) => {
  try {
    const response = await axios.post(`${API_URL}/rooms/${roomId}/join`, { playerName });
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
