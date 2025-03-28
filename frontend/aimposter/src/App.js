// src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import HumanRoleScreen from './components/roles/HumanRoleScreen';
import MafiaScreen from './components/roles/MafiaScreen';
import WelcomeScreen from './components/welcome/WelcomeScreen.js';
import AiChatScreen from './components/ai_chat/AiChat.js';
import AiResponses from './components/ai_chat/AiResponses.js';
import HumanNightScreen from './components/night_human/HumanNight.js';
import MafiaVotingScreen from './components/mafia_voting/MafiaVoting.js';
import LobbyScreen from './components/lobby/Lobby.js';
import ConnectScreen from './components/connect/Connect.js';
import HumanVotingScreen from './components/human_voting/HumanVoting.js';
import ChatScreen from './components/day_human_chat/HumanChat.js';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import NightResult from './components/retired/NightResult.js';
import KilledUser from './components/retired/KilledUser.js';
import RetiredUser from './components/retired/RetiredUser.js';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/lobby" element={<LobbyScreen />} />
      </Routes>
    </Router>

  );
};

export default App;
