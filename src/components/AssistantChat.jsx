import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';

const simulatedResponses = {
  default: "I'm your Election Assistant! I can help you understand voter registration, deadlines, and what to expect on Election Day. How can I help you today?",
  register: "To register to vote, you typically need to be a U.S. citizen, meet your state's residency requirements, and be 18 years old on or before Election Day. You can usually register online, by mail, or in person at your local election office. Deadlines vary wildly by state (from 30 days before to same-day registration), so it's critical to check your specific state's rules at vote.gov.",
  research: "Finding unbiased information is key. Start with non-partisan organizations like the League of Women Voters (VOTE411.org) or Ballotpedia. They provide sample ballots and candidate stances without endorsing anyone. You can also check local news sources and candidate debates.",
  early: "Many states offer early voting in person, allowing you to vote days or weeks before Election Day. Mail-in (or absentee) voting allows you to receive a ballot by mail. Some states require an excuse to vote by mail, while others have 'no-excuse' absentee voting. Always check your state's specific deadlines for requesting and returning mail-in ballots.",
  "election-day": "On Election Day, polls are usually open from early morning (around 6 or 7 AM) until evening (7 or 8 PM). If you are in line when the polls close, STAY IN LINE; you have the right to vote. Depending on your state, you may need to bring a photo ID or a utility bill as proof of residence.",
  results: "Official election results are rarely finalized on Election night. Media outlets project winners based on exit polls and early returns, but official certification happens days or weeks later after all mail-in, provisional, and overseas ballots are counted by local election officials.",
};

export default function AssistantChat({ activePrompt, setHasInteracted }) {
  const [messages, setMessages] = useState([
    { text: simulatedResponses.default, sender: 'bot', id: 1 }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (activePrompt) {
      handleSend(activePrompt, true);
    }
  }, [activePrompt]);

  const handleSend = (text, isAutomated = false) => {
    if (!text.trim()) return;
    
    if (!isAutomated) {
        setHasInteracted(true);
    }

    const newUserMsg = { text, sender: 'user', id: Date.now() };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      let responseText = simulatedResponses.default;
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('register') || lowerText.includes('deadline')) {
        responseText = simulatedResponses.register;
      } else if (lowerText.includes('research') || lowerText.includes('unbiased')) {
        responseText = simulatedResponses.research;
      } else if (lowerText.includes('early') || lowerText.includes('mail')) {
        responseText = simulatedResponses.early;
      } else if (lowerText.includes('bring') || lowerText.includes('election day')) {
        responseText = simulatedResponses["election-day"];
      } else if (lowerText.includes('result') || lowerText.includes('announced')) {
        responseText = simulatedResponses.results;
      } else {
          responseText = "That's a great question about the election process. While I'm a simulated assistant right now, typically you'd want to check your local state election website for the most accurate information on that topic!"
      }

      setMessages(prev => [...prev, { text: responseText, sender: 'bot', id: Date.now() + 1 }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="assistant-container glass glass-panel">
      <div className="chat-header">
        <div className="bot-avatar">
          <Bot size={20} color="white" />
        </div>
        <div>
          <h2>Election Assistant AI</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Always here to help</p>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="suggested-prompts">
          <button className="prompt-btn" onClick={() => handleSend("Am I eligible to vote?")}>Eligibility?</button>
          <button className="prompt-btn" onClick={() => handleSend("What is a provisional ballot?")}>Provisional Ballot?</button>
        </div>
        <form 
          className="input-wrapper"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
        >
          <input 
            type="text" 
            placeholder="Ask about the election process..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="send-btn" disabled={!inputValue.trim() || isTyping}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
