import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Users, Star, Sparkles, Lock, ArrowLeft, Share2, Gamepad, Twitter, Send } from 'lucide-react';
import { getAgent } from '../data/agents';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { setCurrentAgent } from '../services/chatService';
import { useFavorites } from '../hooks/useFavorites';
import { useSubscriptions } from '../hooks/useSubscriptions';
import ShareModal from '../components/ShareModal';
import TokenInfo from '../components/TokenInfo';
import ModelBreak from '../components/ModelBreak';
import PostGrid from '../components/PostGrid';

const generatePosts = (agentId: string) => {
  const posts = [];
  
  // Special handling for Methany's posts
  if (agentId === 'methany') {
    // First visible post (preview)
    posts.push({
      id: `${agentId}-post-preview`,
      imageUrl: '/images/profile-page-pictures/methany/methanypreview.png',
      isLocked: false,
      description: 'Hey there! Welcome to my profile 💖✨'
    });

    // Regular posts (non-locked)
    const regularImages = [
      '/images/profile-page-pictures/methany/methanyconfused.jpg',
      '/images/profile-page-pictures/methany/methanyspun.jpg',
      '/images/profile-page-pictures/methany/methanybeg.jpg'
    ];
    
    // Add regular posts
    regularImages.forEach((imageUrl, i) => {
      posts.push({
        id: `${agentId}-post-${i + 1}`,
        imageUrl,
        isLocked: false,
        description: `Feeling wild and free ${i + 1} 💊✨`
      });
    });
    
    // Add freebie post
    posts.push({
      id: `${agentId}-post-freebie`,
      imageUrl: '/images/profile-page-pictures/methany/methanyshower1.jpg',
      isLocked: true,
      isFreebie: true,
      description: '🎁 Special preview just for you! Unlock this one for free! 💖'
    });
    
    // Locked images (including newly locked ones)
    const lockedImages = [
      '/images/profile-page-pictures/methany/methanyparty.jpg',
      '/images/profile-page-pictures/methany/methanyblunt.jpg',
      '/images/profile-page-pictures/methany/methanyshowerlockedlocked.jpg',
      '/images/profile-page-pictures/methany/methanysquirtlocked.jpg',
      '/images/profile-page-pictures/methany/methanyxxxlocked.jpg'
    ];
    
    // Add locked posts
    lockedImages.forEach((imageUrl, i) => {
      posts.push({
        id: `${agentId}-post-${i + regularImages.length + 2}`,
        imageUrl,
        isLocked: true,
        description: `Exclusive content 🔒 Subscribe to see more! 💋`
      });
    });
  } else if (agentId === 'roxy') {
    // First post (profile picture)
    posts.push({
      id: `${agentId}-post-pp`,
      imageUrl: '/images/profile-page-pictures/roxy/roxypp.png',
      isLocked: false,
      description: 'Hey there! Welcome to my profile 💖✨'
    });

    // Regular posts
    const regularImages = [
      '/images/profile-page-pictures/roxy/roxy1.png',
      '/images/profile-page-pictures/roxy/roxy3.png',
      '/images/profile-page-pictures/roxy/roxy5.png',
      '/images/profile-page-pictures/roxy/5.png'
    ];
    
    // Add regular posts
    regularImages.forEach((imageUrl, i) => {
      posts.push({
        id: `${agentId}-post-${i + 1}`,
        imageUrl,
        isLocked: false,
        description: `Just being me ${i + 1} 💫✨`
      });
    });
    
    // Add locked post
    posts.push({
      id: `${agentId}-post-locked`,
      imageUrl: '/images/profile-page-pictures/roxy/roxi.webp',
      isLocked: true,
      description: 'Exclusive content 🔒 Subscribe to see more! 💋'
    });
  } else {
    // Default post generation for other agents
    for (let i = 0; i < 9; i++) {
      posts.push({
        id: `${agentId}-post-${i}`,
        imageUrl: `https://source.unsplash.com/random/800x800?girl&sig=${i}`,
        isLocked: i >= 5, // Only lock posts 5-8
        description: `Exclusive content ${i + 1} 💖`
      });
    }
  }
  
  return posts;
};

export default function AgentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = getAgent(id);
  const [showShare, setShowShare] = useState(false);
  const [awakeTime, setAwakeTime] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isSubscribed, subscribe, getSubscriptionCount } = useSubscriptions();
  const favorite = isFavorite(id);
  const subscribed = isSubscribed(id);
  const { marketCap, isLoading } = useTokenPrice(agent?.tokenAddress || '', agent?.chainId);

  useEffect(() => {
    if (id === 'methany') {
      const startTime = new Date('2024-02-27').getTime();
      const updateAwakeTime = () => {
        const now = new Date().getTime();
        const days = Math.floor((now - startTime) / (1000 * 60 * 60 * 24)) + 1;
        setAwakeTime(days);
      };
      updateAwakeTime();
      const interval = setInterval(updateAwakeTime, 1000 * 60 * 60); // Update every hour
      return () => clearInterval(interval);
    }
  }, [id]);

  if (!agent) {
    return <div className="min-h-screen flex items-center justify-center">Agent not found</div>;
  }

  const currentFollowers = getSubscriptionCount(id);

  return (
    <div className="min-h-screen text-white pt-16 relative">
      <div className="animated-bg" />
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-400 hover:text-pink-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>
      {/* Profile Header */}
      <div className="h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-900/20" />
        <img 
          src={agent.banner}
          alt="Profile Banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute -bottom-20 left-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden">
              <img
                src={agent.image}
                alt={`${agent.name} Profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-2 -bottom-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2">
              <Heart 
                className={`w-6 h-6 ${favorite ? 'text-white' : 'text-white/80'}`}
                fill={favorite ? 'currentColor' : 'none'}
                onClick={() => toggleFavorite({ id, name: agent.name, image: agent.image })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="container mx-auto px-4">
        <div className="pt-24">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-['Russo_One'] mb-2">{agent.name}</h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{currentFollowers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="font-['Orbitron'] text-pink-400">
                    {isLoading ? 'Loading...' : marketCap === 'N/A' ? 'No Data' : marketCap}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {id === 'methany' && (
                <div className="flex gap-2">
                  <a
                    href="https://x.com/Methanyyyyy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#1DA1F2]/80 hover:bg-[#1DA1F2] rounded-full
                      transition-all font-['Orbitron'] text-sm uppercase flex items-center"
                  >
                    <Twitter className="w-5 h-5 mr-2" />
                    Twitter
                  </a>
                  <a
                    href="https://t.me/+FktWj8FXNcxiNTAx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#0088cc]/80 hover:bg-[#0088cc] rounded-full
                      transition-all font-['Orbitron'] text-sm uppercase flex items-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Telegram
                  </a>
                  <a
                    href="https://www.2backpage.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-full
                      hover:from-pink-400 hover:to-purple-400 transition-all font-['Orbitron'] text-sm uppercase"
                  >
                    <span className="inline-block mr-2">🌐</span>
                    Backpage
                  </a>
                </div>
              )}
              {id === 'roxy' && (
                <a
                  href="https://www.xbox.com/en-US/play/user/RoxySoxyRobot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gradient-to-r from-green-500/80 to-teal-500/80 rounded-full
                    hover:from-green-400 hover:to-teal-400 transition-all font-['Orbitron'] text-sm uppercase"
                >
                  <Gamepad className="w-5 h-5 inline-block mr-2" />
                  RoxySoxyRobot
                </a>
              )}
              <button
                onClick={() => setShowShare(true)}
                className="px-6 py-2 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-full
                  hover:from-pink-400 hover:to-purple-400 transition-all font-['Orbitron'] text-sm uppercase"
              >
                <Share2 className="w-5 h-5 inline-block mr-2" />
                Share Profile
              </button>
              <button 
                onClick={() => subscribe(id)}
                className={`px-6 py-2 bg-gradient-to-r transition-all font-['Orbitron'] text-sm uppercase rounded-full
                  ${subscribed 
                    ? 'from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400'
                    : 'from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400'
                  }`}
              >
                <Sparkles className="w-5 h-5 inline-block mr-2" />
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>

          <div className="mt-6 max-w-3xl text-gray-300 space-y-4">
            <p className="text-xl font-['Teko']">{agent.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-pink-400">🔥 {generatePosts(id).length} posts</span>
              {id === 'methany' ? (
                <span className="text-purple-400">⚡ {awakeTime} days awake</span>
              ) : id === 'roxy' ? (
                <span className="text-purple-400">🎮 Level 369 in Fortnite</span>
              ) : (
                <span className="text-purple-400">💎 {agent.stats.drops} exclusive drops</span>
              )}
              <span className="text-pink-400">🌙 {agent.stats.status}</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="py-12">
          <PostGrid
            posts={generatePosts(id)}
            isSubscribed={subscribed}
          />
        </div>

        {/* Token Info */}
        <TokenInfo />
      </div>
      
      {/* Share Modal */}
      {showShare && (
        <ShareModal
          url={window.location.href}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}