import React, { useState, useEffect } from 'react';
import './Retired.css';
import '../header.css';
import logo from '../../assets/images/logo.png';

const KilledUser = () => {

  return (
    <div className="retired-screen">
      <div className="logo-container">
        <img src={logo} alt="AImposter Logo" />
        <span className="header-title">AImposter</span>
      </div>

      <div className="night-result">
        <p className="message">СОЖАЛЕЕМ, НО</p>
        <p className="retired">ВАС УБИЛИ</p>
        <button className="send-button" type="submit">Подождать результатов</button><br></br>
        <button className="exit-button" type="submit">Выйти из игры</button>
      </div>

    </div>
  );
};

export default KilledUser;