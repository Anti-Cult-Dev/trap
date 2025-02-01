import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Star } from 'lucide-react';
import { useFavorites, FavoriteAgent } from '../hooks/useFavorites';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { getAgent } from '../data/agents';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { getSubscriptionCount } = useSubscriptions();

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

        <h1 className="text-3xl font-['Russo_One'] mb-8">
          <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Your Favorites
          </span>
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-pink-500/50" />
            <p className="text-gray-400 text-lg">No favorites yet</p>
            <button
              onClick={() => navigate('/agents')}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full
                hover:from-pink-400 hover:to-purple-400 transition-all text-sm uppercase tracking-wider"
            >
              Discover Agents
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((agent) => (
              <div
                key={agent.id}
                className="bg-gradient-to-r from-pink-900/20 to-black/40 backdrop-blur-sm rounded-xl 
                  border border-pink-500/20 p-4 hover:border-pink-500/40 transition-all
                  group relative overflow-hidden flex items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 
                  transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"/>
                
                <div 
                  className="w-24 h-24 rounded-xl overflow-hidden cursor-pointer mr-4"
                  onClick={() => navigate(`/agents/${agent.id}`)}
                >
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 
                    className="text-2xl font-['Russo_One'] text-white cursor-pointer mb-2 
                      bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent"
                    onClick={() => navigate(`/agents/${agent.id}`)}
                  >
                    {agent.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-pink-300/80">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{getSubscriptionCount(agent.id)} followers</span>
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      <TokenPrice agentId={agent.id} />
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleFavorite(agent)}
                  className="p-3 rounded-full bg-pink-500/20 hover:bg-pink-500/30 
                    transition-colors ml-4"
                >
                  <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TokenPrice({ agentId }: { agentId: string }) {
  const agent = getAgent(agentId);
  const { marketCap, isLoading } = useTokenPrice(
    agent?.tokenAddress || '',
    agent?.chainId
  );

  return (
    <span className="font-['Orbitron']">
      {isLoading ? 'Loading...' : marketCap}
    </span>
  );
}