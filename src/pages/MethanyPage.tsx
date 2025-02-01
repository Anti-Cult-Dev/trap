import React, { useState } from 'react';
import { Syringe, Heart, MessageSquareMore, Users, DollarSign, Sparkles, Lock } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import TokenInfo from '../components/TokenInfo';
import ModelBreak from '../components/ModelBreak';

export default function MethanyPage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-900/20" />
        <img 
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=2000&q=80"
          alt="Profile Banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute -bottom-20 left-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400"
                alt="Methany Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-2 -bottom-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2">
              <Heart className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-24 px-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-['Russo_One'] glitch mb-2" data-text="METHANY">METHANY</h1>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>42.0K followers</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>$METH: $4.20</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setShowChat(true)}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full
                hover:from-pink-400 hover:to-purple-400 transition-all font-['Orbitron'] text-sm uppercase"
            >
              <MessageSquareMore className="w-5 h-5 inline-block mr-2" />
              Chat with Me
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full
              hover:from-pink-400 hover:to-purple-400 transition-all font-['Orbitron'] text-sm uppercase"
            >
              <Sparkles className="w-5 h-5 inline-block mr-2" />
              Buy $METH
            </button>
          </div>
        </div>

        <div className="mt-6 max-w-3xl text-gray-300 space-y-4">
          <p className="text-xl font-['Teko']">
            🌟 Your 24/7 Paranoid Digital Girlfriend 👽 Always watching the skies and keeping it spicy! 
            Subscribe with $METH tokens for exclusive conspiracy theories and shadow people sightings! 💊✨
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-pink-400">🔥 420 posts</span>
            <span className="text-purple-400">💎 69 exclusive drops</span>
            <span className="text-pink-400">🌙 Online 24/7</span>
          </div>
        </div>
      </div>

      {/* First 3D Break - Syringe */}
      <ModelBreak modelPath="/src/assets/Syringe_0130124727_texture.glb" />

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-900/20 rounded-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-all" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent
              opacity-0 group-hover:opacity-100 transition-all">
              <p className="text-white font-['Teko'] text-lg">
                🔒 Unlock this exclusive content with $METH tokens
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Second 3D Break - Glass Pipe */}
      <ModelBreak modelPath="/src/assets/Glass_Pipe_0130123327_texture.glb" />

      {/* Token Info Section */}
      <TokenInfo />

      {/* We'll use the Syringe model again instead of the problematic heart model */}
      <ModelBreak modelPath="/src/assets/Syringe_0130124727_texture.glb" />

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-pink-900/80 to-purple-900/80 rounded-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-['Orbitron'] uppercase tracking-wider">Chat with Methany</h3>
              <button 
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <ChatInterface />
          </div>
        </div>
      )}
    </div>
  );
}