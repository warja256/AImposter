import "../header.css";
import "./Lobby.css";
import React from 'react';
import logo from '../../assets/images/logo.png';
import avatar from "../../assets/images/avatar.png"; 


const LobbyScreen = () => {
    return (
        <div className="lobby-screen">
            <div className="logo-container">
                <img src={logo} alt="AImposter Logo" />
                <span className="header-title">AImposter</span>
            </div>
            <div>
                <h3 className="lobby-header">
                Создание игровой комнаты
                </h3>
            </div>
            <div className="lobby">
                <div className="lobby-buttons">
                    <div>
                        <button className="create-game">Начать</button>
                    </div>
                    <div>
                    <div className="center">
                        <div className="room-code-container">
                        <div className="combined-button">
                            <button className="join-button">Войти</button>
                            <div className="input-filed">
                            <input type="text" className="code-field" value="0000000" readOnly />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                        <button className=" create-game go-back">Назад</button>
                    </div>
                </div>
                <div className="lobby-users">
                    <h3>УЧАСТНИКИ 2/4</h3>
                    <button className="player-button">
                        <img src={avatar} className="avatar" />
                        <div className="text">Игрок 1</div>
                    </button>
                    <button className="player-button">
                        <img src={avatar} className="avatar" />
                        <div className="text">Никнейм игрока 2</div>
                    </button>
                    <button className="player-button">
                        <div className="text"></div>
                    </button>
                    <button className="player-button">
                        <div className="text"></div>
                    </button>

                </div>
            </div>

        </div>
    );
 };

 export default LobbyScreen;