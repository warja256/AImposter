import "../header.css";
import "./Connect.css";
import React, { useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMafiaId } from '../../api/role_api';

const ConnectScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { playerName, playerId, roomCode, token } = location.state || {};

    useEffect(() => {
        const fetchMafiaId = async () => {
            try {
                const mafiaData = await getMafiaId(roomCode);
                console.log(mafiaData.mafiaId || "нет");
                if (mafiaData.mafiaId === playerId) {
                    
                    // Если игрок — мафия
                    navigate('/mafia-role', { state: { playerName, roomCode, playerId, token } });
                } else {
                    // Если игрок — человек
                    navigate('/human-role', { state: { playerName, roomCode, playerId, token } });
                }
            } catch (error) {
                console.error("Ошибка при определении мафии:", error);
            }
        };

        const timer = setTimeout(() => {
            fetchMafiaId(); 
        }, 3000);

        return () => clearTimeout(timer);

    }, [navigate, playerId, roomCode, token]);

    return (
        <div className="connect-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>
            <div>
                <h3 className="connect-header">ОПРЕДЕЛЯЕМ ВАШУ РОЛЬ</h3>
            </div>
            <div className="connect-dots">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default ConnectScreen;
