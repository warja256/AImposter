
const API_URL = 'http://localhost:8080/api';

export const sendMessage = async (roomId, playerId, content) => {
    try {
      const response = await axios.post(`${API_URL}/rooms/${roomId}/messages`, { playerId, content });
      return response.data;
    } catch (error) {
      throw error;
    }
  };