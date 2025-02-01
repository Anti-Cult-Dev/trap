import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Star, ArrowLeft, Share2, Gamepad, Sparkles } from 'lucide-react';
import { useFavorites, FavoriteAgent } from '../hooks/useFavorites';
import { useGlobalStore } from '../store/globalStore';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { useTokenPrice } from '../hooks/useTokenPrice';
import ShareModal from '../components/ShareModal';
import { getAllAgents } from '../data/agents';
import { Agent } from '../types/agent';

const agents = getAllAgents();

export default function AgentsPage() {
  const navigate = useNavigate();
  const { setHasVisitedAgents } = useGlobalStore();
  
  useEffect(() => {
    setHasVisitedAgents();
  }, []);

  return (
    <div className="min-h-screen pt-24 relative">
      <div className="animated-bg" />
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-400 hover:text-pink-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <h1 className="text-4xl font-['Russo_One'] mb-8">
          <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            TrAIp House Agents
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getFollowCount, getFavoriteCount } = useGlobalStore();
  const { marketCap, isLoading } = useTokenPrice(agent.tokenAddress || '', agent.chainId);
  const favorite = isFavorite(agent.id);
  const [isHovered, setIsHovered] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const followerCount = getFollowCount(agent.id);
  const favoriteCount = getFavoriteCount(agent.id);

  return (
    <div
      className="bg-gradient-to-b from-pink-900/20 to-black/40 backdrop-blur-sm rounded-xl 
        border border-pink-500/20 p-6 transition-all relative overflow-hidden
        transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0
        transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
      
      {/* Main Content */}
      <div className="relative z-10">
        <div 
          className="w-full h-48 rounded-xl overflow-hidden mb-4 border-2 border-pink-500/40 
            cursor-pointer relative group"
          onClick={() => navigate(`/agents/${agent.id}`)}
        >
          <img
            src={agent.image}
            alt={`${agent.name} Profile`}
            className="w-full h-full object-cover transform transition-transform duration-700
              group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Hover Stats */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/60 
            transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-1 text-pink-400" />
                  <span className="text-sm">{followerCount} followers</span>
                </div>
                <div className="text-center">
                  <Heart className="w-6 h-6 mx-auto mb-1 text-pink-400" />
                  <span className="text-sm">{favorite ? '1' : '0'} likes</span>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 mx-auto mb-1 text-pink-400" />
                  <span className="text-sm font-['Orbitron']">
                    {isLoading ? 'Loading...' : marketCap === 'N/A' ? 'No Data' : marketCap}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/agents/${agent.id}`);
                }}
                className="px-4 py-2 bg-pink-500 rounded-full text-sm font-semibold
                  hover:bg-pink-400 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-['Russo_One'] text-white">{agent.name}</h2>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite({
                    id: agent.id,
                    name: agent.name,
                   image: agent.image,
                  });
                }}
                className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-colors"
              >
                <Heart 
                  className={`w-5 h-5 ${favorite ? 'text-pink-500' : 'text-pink-500/50'}`}
                  fill={favorite ? 'currentColor' : 'none'}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShare(true);
                }}
                className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-colors"
              >
                <Share2 className="w-5 h-5 text-pink-500/50" />
              </button>
            </div>
          </div>
          
          <p className="text-pink-100 text-sm mb-4">{agent.description}</p>
          
          {/* Personality Traits */}
          <div className="flex items-center space-x-2 text-sm text-pink-300/80">
            {agent.personality.traits.slice(0, 3).map((trait, index) => (
              <span key={index} className="flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                {trait}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {agent.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-pink-500/20 rounded-full text-pink-300 text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShare && (
        <ShareModal
          url={`${window.location.origin}/agents/${agent.id}`}
          onClose={() => setShowShare(false)}
          title={`Check out ${agent.name} on TrAIp House! 💖`}
          image={agent.image}
        />
      )}
    </div>
  );
}