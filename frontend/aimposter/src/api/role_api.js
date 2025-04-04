const API_URL = 'http://localhost:8080/api';

export const getMafiaId = async (roomCode) => {
    try {
        const response = await fetch(`${API_URL}/rooms/chooseMafia/${roomCode}`);

        if (!response.ok) {
            throw new Error(`Ошибка! Статус: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Ошибка получения id мафии:", error);
        throw error;
    }
};
