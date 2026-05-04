import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are an expert, non-partisan election assistant called VoterVault AI. 
Your goal is to help users understand the US electoral process, registration deadlines, early voting, and how to research candidates. 
Keep your answers concise, encouraging, and factual. Always direct users to official state resources or vote.gov for binding specific information.
Do not endorse any political party or candidate.`;

export default function AssistantChat({ activePrompt, setHasInteracted, apiKey }) {
  const [messages, setMessages] = useState([
    { text: "I'm your VoterVault AI! I can help you understand voter registration, deadlines, and what to expect on Election Day. How can I help you today?", sender: 'bot', id: 1 }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, error]);

  useEffect(() => {
    if (activePrompt) {
      handleSend(activePrompt, true);
    }
  }, [activePrompt]);

  const handleSend = async (text, isAutomated = false) => {
    if (!text.trim()) return;

    if (!isAutomated) {
      setHasInteracted(true);
    }

    if (!apiKey) {
      setError("Vault is locked. Connect MetaMask and unlock your vault in the top right to enable the AI.");
      return;
    }

    setError('');
    const newUserMsg = { text, sender: 'user', id: Date.now() };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

      const chatHistory = messages.filter(m => m.id !== 1).map(m => ({
        role: m.sender === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
        }
      });

      const responseText = response.text;
      setMessages(prev => [...prev, { text: responseText, sender: 'bot', id: Date.now() + 1 }]);
    } catch (err) {
      console.error('Gemini Error:', err);
      setError(`Gemini Error: ${err.message || "Unknown error."}`);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="assistant-container glass glass-panel">
      <div className="chat-header">
        <div className="bot-avatar">
          <Bot size={20} color="white" />
        </div>
        <div>
          <h2>VoterVault AI</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Secure Voter Guidance</p>
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
        {error && (
          <div className="message bot" style={{ color: '#fca5a5', border: '1px solid #ef4444', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <AlertCircle size={16} />
            {error}
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
            disabled={isTyping}
          />
          <button type="submit" className="send-btn" disabled={!inputValue.trim() || isTyping}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
