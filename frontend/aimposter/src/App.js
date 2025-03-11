// src/App.js
import React from 'react';
import HumanRoleScreen from './components/roles/HumanRoleScreen';
import MafiaScreen from './components/roles/MafiaScreen';
import WelcomeScreen from './components/welcome/WelcomeScreen.js';
import AiChatScreen from './components/ai_chat/AiChat.js';
import AiResponses from './components/ai_chat/AiResponses.js';

function App() {
  return (
    <div>
      <WelcomeScreen/> 
    </div>
  );
}

export default App;