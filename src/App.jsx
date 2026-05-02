import React, { useState } from 'react';
import Timeline from './components/Timeline';
import AssistantChat from './components/AssistantChat';

function App() {
  const [activeStep, setActiveStep] = useState(null);
  const [activePrompt, setActivePrompt] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleStepClick = (index, prompt) => {
    setActiveStep(index);
    setActivePrompt(prompt);
    setHasInteracted(true);
    // Reset the prompt immediately so clicking the same step twice triggers the effect in AssistantChat
    setTimeout(() => setActivePrompt(''), 100);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Election Assistant</h1>
        <p>Your interactive guide to the voting process</p>
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
        />
      </aside>
    </div>
  );
}

export default App;
