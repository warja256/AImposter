import "../header.css";
import React from 'react';
import logo from '../../assets/images/logo.png';

const LobbyScreen = () => {
    return (
        <div className="lobby-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>

        </div>
    );
 };

 export default LobbyScreen;