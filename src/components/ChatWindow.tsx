import React, { useState } from 'react';
import { X, Minus, Phone } from 'lucide-react';
import { Agent } from '../types/agent';
import ChatInterface from './ChatInterface';

interface ChatWindowProps {
  agent: Agent;
  onClose: () => void;
  onMinimize: () => void;
}

export default function ChatWindow({ agent, onClose, onMinimize }: ChatWindowProps) {
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.match(/^\+?[\d\s-]{10,}$/)) {
      // Invalid phone number
      return;
    }
    setShowPhoneInput(false);
    setPhoneNumber('');
  };

  return (
    <div className="w-80 bg-gradient-to-br from-pink-900/90 to-purple-900/90 backdrop-blur-sm 
      rounded-t-xl border border-pink-500/20 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-pink-500/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-['Orbitron'] text-sm">{agent.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowPhoneInput(!showPhoneInput)}
            className="p-1 hover:bg-pink-500/20 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-pink-500/20 rounded-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-pink-500/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Chat Content */}
      {showPhoneInput ? (
        <div className="h-[400px] flex items-center justify-center p-6">
          <div className="w-full space-y-4">
          <h3 className="text-lg font-['Orbitron'] text-center text-pink-300 mb-2">
            Get a Call from {agent.name}
          </h3>
          <p className="text-sm text-pink-200/80 text-center mb-4">
            Enter your phone number and I'll call you right away! 💕
          </p>
          <div className="space-y-3">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 555-5555"
              className="w-full bg-gradient-to-r from-pink-900/30 to-teal-900/30 border border-pink-500/20 
                rounded-full px-4 py-2 focus:outline-none focus:border-teal-400/40 placeholder-pink-300/50
                text-center"
            />
            <button 
              onClick={handlePhoneSubmit} 
              className="w-full px-6 py-2 bg-gradient-to-r from-pink-500 to-teal-400 
                hover:from-pink-400 hover:to-teal-300 rounded-full transition-all duration-300
                font-['Orbitron'] text-sm uppercase tracking-wider"
            >
              Call Me
            </button>
          </div>
          </div>
        </div>
      ) : (
        <div className="h-[400px]">
        <ChatInterface agentId={agent.id} />
        </div>
      )}
    </div>
  );
}