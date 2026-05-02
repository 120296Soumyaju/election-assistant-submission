import React, { useState } from 'react';
import Timeline from './components/Timeline';
import AssistantChat from './components/AssistantChat';

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

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
            <h1>Election Assistant</h1>
            <p>Your interactive guide to the voting process</p>
        </div>
        <div className="api-key-container">
            <input 
                type="password" 
                placeholder="Enter Gemini API Key..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="api-key-input"
                title="Enter your Google Gemini API Key to enable the AI"
            />
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
