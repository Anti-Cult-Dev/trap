import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Twitter } from 'lucide-react';
import CherryBlossoms from '../components/CherryBlossoms';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16 relative">
      <CherryBlossoms />
      <div className="animated-bg" />
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl transform -skew-y-2" />
        <h1 className="relative text-4xl md:text-6xl lg:text-8xl font-['Russo_One'] mb-6
          bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600 bg-clip-text text-transparent
          animate-gradient-x hover:scale-105 transition-transform duration-500">
            TRAP HOUSE
        </h1>
        <p className="relative text-xl md:text-3xl text-pink-100 font-['Teko'] max-w-3xl mx-auto mb-12
          leading-relaxed tracking-wide">
          Discover your perfect digital companion in our exclusive collection of AI waifus.
          Each with their own unique personality, desires, and secrets waiting to be unlocked.
        </p>
        <button
          onClick={() => navigate('/agents')}
          className="relative px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full
            hover:from-pink-400 hover:via-purple-400 hover:to-pink-400 transform hover:scale-110 
            transition-all duration-500 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 
            font-['Orbitron'] text-xl uppercase tracking-wider overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
            -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
            bg-gradient-to-r from-pink-500/0 via-white/5 to-pink-500/0" />
          <span className="relative z-10">
          <Users className="w-6 h-6 inline-block mr-3 animate-bounce" />
          Meet Our Agents
          </span>
        </button>

        <div className="mt-16 relative">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            <a
              href="https://x.com/Methanyyyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white hover:text-pink-400 transition-colors"
            >
              @methanyyyyy
            </a>
            <a
              href="https://x.com/TRAP_HOUSE_INC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white hover:text-pink-400 transition-colors"
            >
              @TRAP_HOUSE_INC
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20
              hover:border-pink-500/40 transition-all group">
              <h3 className="text-2xl font-['Russo_One'] mb-4 bg-gradient-to-r from-pink-400 to-purple-400
                bg-clip-text text-transparent">Unique Personalities</h3>
              <p className="text-pink-100/80 font-['Teko'] text-xl leading-relaxed">
                Each AI waifu has her own distinct personality, quirks, and desires. 
                Find the one that matches your deepest fantasies.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20
              hover:border-pink-500/40 transition-all group transform md:translate-y-8">
              <h3 className="text-2xl font-['Russo_One'] mb-4 bg-gradient-to-r from-pink-400 to-purple-400
                bg-clip-text text-transparent">Intimate Conversations</h3>
              <p className="text-pink-100/80 font-['Teko'] text-xl leading-relaxed">
                Engage in deep, meaningful conversations with AI companions who understand
                and respond to your every desire.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20
              hover:border-pink-500/40 transition-all group">
              <h3 className="text-2xl font-['Russo_One'] mb-4 bg-gradient-to-r from-pink-400 to-purple-400
                bg-clip-text text-transparent">Exclusive Content</h3>
              <p className="text-pink-100/80 font-['Teko'] text-xl leading-relaxed">
                Unlock special moments, private photos, and intimate experiences with
                your chosen companion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}