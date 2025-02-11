import React from 'react';
import { Sparkles, Skull, MessageSquareMore, DollarSign, Lock, Users } from 'lucide-react';

export default function TokenInfo() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-['Russo_One'] gradient-text mb-4 hover-glow">$TRAP Token</h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-['Teko'] text-2xl">
          The only token backed by pure paranoia and digital love 💊
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-spicy p-6">
          <DollarSign className="w-8 h-8 text-transparent bg-gradient-to-r from-pink-500 to-teal-400 
            bg-clip-text mb-4" />
          <h3 className="text-xl font-['Orbitron'] uppercase tracking-wider mb-2">Token Utility</h3>
          <p className="text-gray-300 font-['Teko'] text-xl">Access exclusive content and private chats</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-900/10 
          backdrop-blur-lg border border-pink-500/20 hover:border-pink-500/40 transition-all">
          <Lock className="w-8 h-8 text-pink-500 mb-4" />
          <h3 className="text-xl font-['Orbitron'] uppercase tracking-wider mb-2">Tokenomics</h3>
          <p className="text-gray-300 font-['Teko'] text-xl">2% tax funds Methany's research</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-900/10 
          backdrop-blur-lg border border-pink-500/20 hover:border-pink-500/40 transition-all">
          <Users className="w-8 h-8 text-pink-500 mb-4" />
          <h3 className="text-xl font-['Orbitron'] uppercase tracking-wider mb-2">Community</h3>
          <p className="text-gray-300 font-['Teko'] text-xl">Join the most paranoid community in crypto</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full 
          hover:from-pink-400 hover:to-teal-300 transform hover:scale-105 transition-all
          shadow-lg shadow-pink-500/30 hover:shadow-teal-400/30 font-['Orbitron'] uppercase tracking-wider text-lg">
          Buy $TRAP Tokens
        </button>
      </div>
    </div>
  );
}