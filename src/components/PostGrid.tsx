import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Lock } from 'lucide-react';
import { useGlobalStore } from '../store/globalStore';
import UsernamePrompt from './UsernamePrompt';
import ShareModal from './ShareModal';
import PostComments from './PostComments';

interface Post {
  id: string;
  imageUrl: string;
  isLocked: boolean;
  description: string;
  previewUrl?: string;
}

interface PostGridProps {
  posts: Post[];
  isSubscribed: boolean;
}

export default function PostGrid({ posts, isSubscribed }: PostGridProps) {
  const { username, getUsername, getComments } = useGlobalStore();
  const [activePost, setActivePost] = useState<string | null>(null);
  const [shareModalPost, setShareModalPost] = useState<Post | null>(null);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showSubscribePrompt, setShowSubscribePrompt] = useState(false);

  const handleCommentClick = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post?.isLocked && !isSubscribed) {
      setShowSubscribePrompt(true);
      return;
    }
    setActivePost(postId);
  };

  const handlePostClick = (post: Post) => {
    if (post.isLocked && !isSubscribed) {
      setSelectedPost(post);
      if (post.previewUrl) {
        setShowPreview(true);
      } else {
        setShowSubscribePrompt(true);
      }
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedPost(null);
  };

  const closeSubscribePrompt = () => {
    setShowSubscribePrompt(false);
    setSelectedPost(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
          onClick={() => handlePostClick(post)}
        >
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
            <img
              src={post.imageUrl}
              alt={post.description}
              className={`w-full h-full object-cover ${post.isLocked && !isSubscribed ? 'blur-xl brightness-50' : ''}`}
            />
            {post.isLocked && !isSubscribed && (
              <div 
                className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
                onClick={() => setShowSubscribePrompt(true)}
              >
                <Lock className="w-8 h-8 text-white/80" />
                <p className="text-white/80 text-sm mt-2">Subscribe to unlock</p>
              </div>
            )}
            <div className={`absolute inset-0 transition-all flex items-center justify-center 
              ${(!post.isLocked || isSubscribed) ? 'bg-black/0 group-hover:bg-black/60 opacity-0 group-hover:opacity-100' : ''}`}>
              {(!post.isLocked || isSubscribed) && (
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommentClick(post.id);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShareModalPost(post);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between text-gray-400">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommentClick(post.id);
                }}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{post.isLocked && !isSubscribed ? '?' : getComments(post.id).length}</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Comments Modal */}
      {activePost && (
        <PostComments
          postId={activePost}
          onClose={() => setActivePost(null)}
        />
      )}

      {/* Share Modal */}
      {shareModalPost && (
        <ShareModal
          post={shareModalPost}
          onClose={() => setShareModalPost(null)}
        />
      )}

      {/* Preview Modal - Only for first locked image */}
      {showPreview && selectedPost && selectedPost.previewUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-2xl w-full mx-4">
            <button
              onClick={closePreview}
              className="absolute -top-10 right-0 text-white hover:text-pink-400"
            >
              Close
            </button>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={selectedPost.previewUrl}
                alt="Preview content"
                className="w-full h-auto"
              />
              <div className="p-4 text-white text-center">
                <p className="text-xl font-bold mb-2">Want to see more? 😘</p>
                <p className="mb-4">Subscribe to unlock all my exclusive content! 💋</p>
                <button
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full"
                  onClick={closePreview}
                >
                  Subscribe Now 🔥
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Prompt - For all other locked images */}
      {showSubscribePrompt && selectedPost && !selectedPost.previewUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-md w-full mx-4">
            <button
              onClick={closeSubscribePrompt}
              className="absolute -top-10 right-0 text-white hover:text-pink-400"
            >
              Close
            </button>
            <div className="bg-gray-900 rounded-lg p-6 text-white text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <h2 className="text-2xl font-bold mb-2">Exclusive Content 🔒</h2>
              <p className="mb-6">Subscribe to unlock this and all other exclusive content! 💕</p>
              <button
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full"
                onClick={closeSubscribePrompt}
              >
                Subscribe Now 🔥
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Username Prompt */}
      {showUsernamePrompt && (
        <UsernamePrompt onComplete={() => setShowUsernamePrompt(false)} />
      )}
    </div>
  );
}