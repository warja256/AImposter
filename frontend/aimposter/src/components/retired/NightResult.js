import React, { useState, useEffect } from 'react';
import './Retired.css';
import '../header.css';
import logo from '../../assets/images/logo.png';
import info from '../../assets/images/info.png';

const NightResult = () => {
    const [userName, setUserName] = useState('ИГРОК 3');

  return (
    <div className="retired-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="night-result">
        <p className="message">ЭТОЙ НОЧЬЮ НАС ПОКИНУЛ</p>
        <p className="retired-user">{userName}</p>
      </div>

    </div>
  );
};

export default NightResult;