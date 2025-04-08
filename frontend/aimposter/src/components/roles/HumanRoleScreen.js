import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleScreen.css';
import '../header.css';
import human from '../../assets/images/human.png';
import logo from '../../assets/images/logo.png';

const HumanRoleScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, playerName, roomCode, playerId } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/chat', {state: {token, playerName, roomCode, playerId}});
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate, token, playerName, roomCode, playerId]);

  return (
    <div className="role-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="text">
        <h1>ПОЗДРАВЛЯЕМ! ВАША РОЛЬ</h1>
        <h2 className="role-name">ЧЕЛОВЕК</h2>
      </div>

      <div className="role">
        <img src={human} alt="Human" />
      </div>
    </div>
  );
};

export default HumanRoleScreen;
