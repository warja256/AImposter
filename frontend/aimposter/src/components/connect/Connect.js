import "../header.css";
import "./Connect.css";
import React from 'react';
import logo from '../../assets/images/logo.png';

const ConnectScreen = () => {
    return (
        <div className="connect-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>
            <div>
                <h3 className="connect-header">ОЖИДАНИЕ ПОДКЛЮЧЕНИЯ</h3>
            </div>
            <div>
                <p className="connect-users-text">УЧАСТНИКИ 2/4</p>
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