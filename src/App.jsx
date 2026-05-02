import React, { useState } from 'react';
import Timeline from './components/Timeline';
import AssistantChat from './components/AssistantChat';
import VaultUI from './components/VaultUI';

function App() {
  const [activeStep, setActiveStep] = useState(null);
  const [activePrompt, setActivePrompt] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleStepClick = (index, prompt) => {
    setActiveStep(index);
    setActivePrompt(prompt);
    setHasInteracted(true);
    // Reset the prompt immediately so clicking the same step twice triggers the effect in AssistantChat
    setTimeout(() => setActivePrompt(''), 100);
  };

  const handleUnlock = (key) => {
    setApiKey(key);
  };

  const handleLock = () => {
    setApiKey('');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
            <img src="/favicon.png" alt="VoterVault Logo" className="header-logo" />
            <div>
                <h1>VoterVault AI</h1>
                <p>Your interactive guide to the voting process</p>
            </div>
        </div>
        <div className="api-key-container">
            <VaultUI onUnlock={handleUnlock} onLock={handleLock} />
        </div>
      </header>

      <main>
        <Timeline 
          activeStep={activeStep} 
          onStepClick={handleStepClick} 
        />
      </main>

      <aside>
        <AssistantChat 
          activePrompt={activePrompt}
          setHasInteracted={setHasInteracted}
          apiKey={apiKey}
        />
      </aside>
    </div>
  );
}

export default App;
