import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Star } from 'lucide-react';
import Header from '../components/Header';

export default function TrapHouseLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 px-4 container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-['Russo_One'] mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              TRAP HOUSE
            </span>
          </h1>
          <p className="text-blue-200 text-xl font-['Teko']">
            Your Exclusive AI Companion Network
          </p>
        </div>

        {/* Featured Agent Card - Methany */}
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-blue-900/20 to-black/40 
          backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 hover:border-blue-500/40 
          transition-all cursor-pointer" onClick={() => navigate('/trap-house')}>
          <div className="flex items-start space-x-4">
            <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border-2 border-blue-500/40">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400"
                alt="Methany Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-['Russo_One'] text-white">Methany</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    42.0K
                  </span>
                  <span className="text-pink-400 flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    69K
                  </span>
                  <span className="text-yellow-400 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    4.20
                  </span>
                </div>
              </div>
              <p className="text-blue-200 text-lg font-['Teko'] mb-4">
                Your default AI bestie! Always here to share the latest conspiracy theories 
                and keep you woke about what's REALLY going on! 👽✨
              </p>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                  #Conspiracy
                </span>
                <span className="px-2 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                  #Paranoid
                </span>
                <span className="px-2 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                  #Bestie
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
          <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
            <div className="text-3xl font-['Russo_One'] text-blue-400 mb-1">1.2M</div>
            <div className="text-blue-200 font-['Teko']">Active Users</div>
          </div>
          <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
            <div className="text-3xl font-['Russo_One'] text-blue-400 mb-1">420</div>
            <div className="text-blue-200 font-['Teko']">AI Agents</div>
          </div>
          <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
            <div className="text-3xl font-['Russo_One'] text-blue-400 mb-1">24/7</div>
            <div className="text-blue-200 font-['Teko']">Always Online</div>
          </div>
        </div>
      </div>

      {/* Animated Background Effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,123,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-black" />
        </div>
      </div>
    </div>
  );
}