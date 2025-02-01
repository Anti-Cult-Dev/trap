import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Lock } from 'lucide-react';
import { useEngagement } from '../hooks/useEngagement';
import { useGlobalStore } from '../store/globalStore';
import UsernamePrompt from './UsernamePrompt';
import ShareModal from './ShareModal';

interface Post {
  id: string;
  imageUrl: string;
  isLocked: boolean;
  isFreebie?: boolean;
  description: string;
}

interface PostGridProps {
  posts: Post[];
  isSubscribed: boolean;
}

export default function PostGrid({ posts, isSubscribed }: PostGridProps) {
  const { engagements, likePost, unlikePost, addComment, sharePost } = useEngagement();
  const { username, getUsername } = useGlobalStore();
  const [activePost, setActivePost] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [shareModalPost, setShareModalPost] = useState<Post | null>(null);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [pendingComment, setPendingComment] = useState<string | null>(null);
  const [unlockedFreebies, setUnlockedFreebies] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    const hasLiked = engagements[postId]?.likes > 0;
    if (hasLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const handleComment = (postId: string) => {
    if (!comment.trim()) return;
    
    if (!username) {
      setPendingComment(comment);
      setShowUsernamePrompt(true);
      return;
    }
    
    addComment(postId, comment);
    setComment('');
  };

  const handleUsernameComplete = () => {
    setShowUsernamePrompt(false);
    if (pendingComment && activePost) {
      addComment(activePost, pendingComment);
      setComment('');
      setPendingComment(null);
    }
  };

  const handleUnlockFreebie = (postId: string) => {
    setUnlockedFreebies(prev => new Set([...prev, postId]));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => {
        const isUnlocked = isSubscribed || (post.isFreebie && unlockedFreebies.has(post.id));
        
        return (
          <div key={post.id} className="relative group">
            <div className={`aspect-square relative overflow-hidden rounded-xl 
              ${post.isLocked && !isUnlocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              {/* Image with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-900/20 
                group-hover:opacity-0 transition-opacity duration-300" />
              
              <img
                src={post.imageUrl}
                alt="Post content"
                className={`w-full h-full object-cover transform transition-transform duration-700
                  group-hover:scale-110 ${post.isLocked && !isUnlocked ? 'blur-3xl brightness-[0.3]' : ''}`}
              />

              {/* Locked overlay */}
              {post.isLocked && !isUnlocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-lg">
                  <div className="flex flex-col items-center space-y-4">
                    <Lock className="w-12 h-12 text-pink-500 drop-shadow-glow animate-pulse-slow" />
                    {post.isFreebie && !unlockedFreebies.has(post.id) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlockFreebie(post.id);
                        }}
                        className="px-4 py-2 bg-pink-500 rounded-full text-white hover:bg-pink-400 
                          transition-colors transform hover:scale-105"
                      >
                        Click to Unlock Free! 🎁
                      </button>
                    ) : (
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-center bg-gradient-to-t from-black/90 to-transparent">
                        <p className="text-pink-300 font-['Teko'] text-lg drop-shadow-glow">
                          Subscribe to unlock this content
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Engagement overlay */}
              {(!post.isLocked || isUnlocked) && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 p-4 flex flex-col justify-between">
                  <div className="text-pink-100 font-['Teko'] text-lg">
                    {post.description}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-pink-300 hover:text-pink-400 transition-colors"
                    >
                      <Heart
                        className="w-6 h-6"
                        fill={engagements[post.id]?.likes > 0 ? 'currentColor' : 'none'}
                      />
                      <span>{engagements[post.id]?.likes || 0}</span>
                    </button>
                    
                    <button
                      onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                      className="flex items-center space-x-2 text-pink-300 hover:text-pink-400 transition-colors"
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>{engagements[post.id]?.comments?.length || 0}</span>
                    </button>
                    
                    <button
                      onClick={() => setShareModalPost(post)}
                      className="flex items-center space-x-2 text-pink-300 hover:text-pink-400 transition-colors"
                    >
                      <Share2 className="w-6 h-6" />
                      <span>{engagements[post.id]?.shares || 0}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Comments section */}
            {activePost === post.id && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm 
                rounded-xl p-4 z-10 border border-pink-500/20">
                <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                  {engagements[post.id]?.comments?.map(comment => (
                    <div key={comment.id} className="text-pink-100 text-sm">
                      <span className="text-pink-400">{comment.username}:</span> {comment.content}
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-pink-900/20 border border-pink-500/20 rounded-full px-4 py-2
                      focus:outline-none focus:border-pink-500/40 text-pink-100 placeholder-pink-300/50"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="px-4 py-2 bg-pink-500 rounded-full text-white hover:bg-pink-400 
                      transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Share Modal */}
      {shareModalPost && (
        <ShareModal
          url={`${window.location.href}#post-${shareModalPost.id}`}
          onClose={() => {
            setShareModalPost(null);
            sharePost(shareModalPost.id);
          }}
          title={`Check out this post! 💖`}
          image={shareModalPost.imageUrl}
        />
      )}
      
      {/* Username Prompt */}
      {showUsernamePrompt && (
        <UsernamePrompt onComplete={handleUsernameComplete} />
      )}
    </div>
  );
}