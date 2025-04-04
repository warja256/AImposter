import axios from "axios";

const API_URL = 'http://localhost:8080/api';
export const playerSetVote = async (voterId, targetId, roomCode) => {
  try {
    const response = await axios.post(`${API_URL}/vote/${roomCode}`, {
      voterId,
      targetId
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке голоса:", error.response?.data || error.message);
    throw error;
  }
};

