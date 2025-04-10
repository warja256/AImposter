const API_URL = 'http://localhost:8080/api';

export const getMafiaId = async (roomCode) => {
    try {
      const response = await fetch(`${API_URL}/rooms/chooseMafia/${roomCode}`);
      if (!response.ok) {
        throw new Error(`Ошибка! Статус: ${response.status}`);
      }
      const data = await response.json();
      
      // Проверяем, есть ли сообщение о том, что мафия уже назначена
      if (data.message === "В комнате уже есть мафия") {
        throw new Error("Мафия уже выбрана в комнате.");
      }
      
      return data; // Возвращаем данные, если всё прошло успешно
    } catch (error) {
      console.error("Ошибка получения ID мафии:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  };
  