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
import MafiaWinnerScreen from './components/winner/MafiaWinnerScreen.js';
import HumanWinnerScreen from './components/winner/HumanWinnerScreen.js';
import HumanVotingResults from './components/retired/HumanVotingResults.js';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/human-night" element={<HumanNightScreen />} />
        <Route path="/night-result" element={<NightResult />} />
        <Route path="/killed" element={<KilledUser />} />
        <Route path="/retired" element={<RetiredUser />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/mafia-winner" element={<MafiaWinnerScreen />} />
        <Route path="/human-winner" element={<HumanWinnerScreen />} />
        <Route path="/ai-responses" element={<AiResponses />} />
        <Route path="/human-voting" element={<HumanVotingScreen />} />
        <Route path="/ai-chat" element={<AiChatScreen />} />
        <Route path="/killed" element={<KilledUser />} />
        <Route path="/mafia-voting" element={<MafiaVotingScreen />} />
        <Route path="/connection" element={<ConnectScreen />} />
        <Route path="/mafia-role" element={<MafiaScreen />} />
        <Route path="/human-role" element={<HumanRoleScreen />} />
        <Route path="/human-voting-results" element={<HumanVotingResults />} />
      </Routes>
    </Router>
  );
};

export default App;