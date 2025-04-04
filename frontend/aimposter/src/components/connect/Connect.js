import "../header.css";
import "./Connect.css";
import React, { useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const ConnectScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/mafia-role');
        }, 5000);

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="connect-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>
            <div>
                <h3 className="connect-header">СЕЙЧАС ОПРЕДЕЛЯЕМ ВАШУ РОЛЬ</h3>
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