import React from 'react';
import { Calendar, Users, Mail, Vote, BarChart } from 'lucide-react';

const steps = [
  {
    id: 'register',
    icon: <Users size={24} />,
    title: 'Register to Vote',
    description: 'Ensure you are eligible and registered in your state before the deadline.',
    prompt: 'How do I register to vote and what are the deadlines?'
  },
  {
    id: 'research',
    icon: <Users size={24} />,
    title: 'Research Candidates',
    description: 'Look into the candidates and ballot measures to make an informed decision.',
    prompt: 'Where can I find unbiased information about the candidates?'
  },
  {
    id: 'early',
    icon: <Mail size={24} />,
    title: 'Early & Mail-in Voting',
    description: 'Request an absentee ballot or find an early voting location to avoid the crowds.',
    prompt: 'How do I request a mail-in ballot and when is it due?'
  },
  {
    id: 'election-day',
    icon: <Calendar size={24} />,
    title: 'Election Day',
    description: 'Head to your designated polling place. Remember to bring required ID.',
    prompt: 'What do I need to bring with me on Election Day?'
  },
  {
    id: 'results',
    icon: <BarChart size={24} />,
    title: 'Election Results',
    description: 'Follow the certified results as they are reported after polls close.',
    prompt: 'When and where are the official election results announced?'
  }
];

export default function Timeline({ activeStep, onStepClick }) {
  return (
    <div className="timeline-container glass glass-panel">
      <div className="timeline-line"></div>
      
      {steps.map((step, index) => (
        <div 
          key={step.id} 
          className={`timeline-step ${activeStep === index ? 'active' : ''}`}
          onClick={() => onStepClick(index, step.prompt)}
        >
          <div className="step-indicator">
            {step.icon}
          </div>
          <div className="step-content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
