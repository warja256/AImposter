// src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import HumanRoleScreen from './components/roles/HumanRoleScreen';
import MafiaScreen from './components/roles/MafiaScreen';
import WelcomeScreen from './components/welcome/WelcomeScreen.js';
import AiChatScreen from './components/ai_chat/AiChat.js';
import AiResponses from './components/ai_chat/AiResponses.js';
import HumanNightScreen from './components/night_human/HumanNight.js';
import MafiaVotingScreen from './components/MafiaVoting/MafiaVoting.js';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <HumanNightScreen/> 
      </Router>
    </div>
  );
}

export default App;
