// src/App.js
import React from 'react';
import HumanRoleScreen from './components/roles/HumanRoleScreen';
import MafiaScreen from './components/roles/MafiaScreen';
import WelcomeScreen from './components/welcome/WelcomeScreen.js';
import AiChatScreen from './components/ai_chat/AiChat.js';

function App() {
  return (
    <div>
      <AiChatScreen/> 
    </div>
  );
}

export default App;