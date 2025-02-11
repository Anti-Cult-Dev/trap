import React, { useState, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { sendMessage, Message, setCurrentAgent } from '../services/chatService';
import { useChat } from '../hooks/useChat';
import { useGlobalStore } from '../store/globalStore';
import UsernamePrompt from './UsernamePrompt';
import { getAgent } from '../data/agents';

interface ChatInterfaceProps {
  agentId: string;
}

export default function ChatInterface({ agentId }: ChatInterfaceProps) {
  const { messages, setMessages } = useChat(agentId);
  const { username } = useGlobalStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  useEffect(() => {
    // Set the current agent when the component mounts
    const agent = getAgent(agentId);
    if (agent) {
      setCurrentAgent(agent);
    }
  }, [agentId]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!username) {
      setPendingMessage(input);
      setShowUsernamePrompt(true);
      return;
    }

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "OMG babe, something's interfering with our connection! Must be those new 5G towers! 😱 Try again?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameComplete = () => {
    setShowUsernamePrompt(false);
    if (pendingMessage) {
      const userMessage = { role: 'user' as const, content: pendingMessage };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setPendingMessage(null);
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full card-spicy p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-pink-500 to-teal-400 text-white'
                  : 'bg-gradient-to-r from-pink-900/50 to-teal-900/50 text-pink-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-2xl bg-gradient-to-r from-pink-900/50 to-teal-900/50 text-pink-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-teal-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-teal-400 rounded-full animate-bounce" 
                  style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-teal-400 rounded-full animate-bounce" 
                  style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tell me your theories..."
          className="flex-1 bg-gradient-to-r from-pink-900/30 to-teal-900/30 border border-pink-500/20 
            rounded-full px-4 py-2 focus:outline-none focus:border-teal-400/40 placeholder-pink-300/50"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`p-2 rounded-full transition-colors ${
            isLoading 
              ? 'bg-gradient-to-r from-pink-900/50 to-teal-900/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-pink-500 to-teal-400 hover:from-pink-400 hover:to-teal-300'
          }`}
        >
          <SendHorizontal className="w-6 h-6" />
        </button>
      </div>
      
      {/* Username Prompt */}
      {showUsernamePrompt && (
        <UsernamePrompt onComplete={handleUsernameComplete} />
      )}
    </div>
  );
}