const API_URL = 'http://localhost:8080/api';

export const getMafiaId = async (roomCode) => {
  const response = await fetch(`${API_URL}/rooms/chooseMafia/${roomCode}`);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 400 && data.message === "В комнате уже есть мафия") {
      return { mafiaId: null, alreadyChosen: true };
    }
    throw new Error(`Ошибка! Статус: ${response.status}, Сообщение: ${data.message}`);
  }

  return { mafiaId: data.mafiaId, alreadyChosen: false };
};

  