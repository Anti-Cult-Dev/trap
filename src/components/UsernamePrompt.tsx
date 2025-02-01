import React, { useState } from 'react';
import { useGlobalStore } from '../store/globalStore';

interface UsernamePromptProps {
  onComplete: () => void;
}

export default function UsernamePrompt({ onComplete }: UsernamePromptProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setUsername: saveUsername } = useGlobalStore();

  const handleSubmit = () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (username.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }
    
    saveUsername(username.trim());
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-pink-900/90 to-purple-900/90 rounded-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-['Orbitron'] uppercase tracking-wider mb-4">
          Choose Your Username
        </h3>
        <p className="text-pink-200/80 text-sm mb-6">
          Pick a username to use when commenting and chatting with our agents! 💖
        </p>
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder="Enter your username..."
            className="w-full bg-gradient-to-r from-pink-900/30 to-teal-900/30 border border-pink-500/20 
              rounded-full px-4 py-2 focus:outline-none focus:border-teal-400/40 placeholder-pink-300/50"
          />
          {error && (
            <p className="text-pink-500 text-sm">{error}</p>
          )}
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-2 bg-gradient-to-r from-pink-500 to-teal-400 
              hover:from-pink-400 hover:to-teal-300 rounded-full transition-all duration-300
              font-['Orbitron'] text-sm uppercase tracking-wider"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}