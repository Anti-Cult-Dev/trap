import { useState, useEffect } from 'react';
import { useGlobalStore } from '../store/globalStore';

export interface PostEngagement {
  id: string;
  likes: number;
  comments: Comment[];
  shares: number;
}

export interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: number;
  likes: number;
}

export function useEngagement() {
  const { getUsername } = useGlobalStore();
  const [engagements, setEngagements] = useState<Record<string, PostEngagement>>(() => {
    const saved = localStorage.getItem('post_engagements');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('post_engagements', JSON.stringify(engagements));
  }, [engagements]);

  const likePost = (postId: string) => {
    setEngagements(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId] || { comments: [], shares: 0 },
        likes: (prev[postId]?.likes || 0) + 1
      }
    }));
  };

  const unlikePost = (postId: string) => {
    setEngagements(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        likes: Math.max(0, (prev[postId]?.likes || 0) - 1)
      }
    }));
  };

  const addComment = (postId: string, content: string) => {
    const comment = {
      id: crypto.randomUUID(),
      username: getUsername(),
      content,
      timestamp: Date.now(),
      likes: 0
    };

    setEngagements(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId] || { likes: 0, shares: 0 },
        comments: [...(prev[postId]?.comments || []), comment]
      }
    }));
  };

  const sharePost = (postId: string) => {
    setEngagements(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId] || { likes: 0, comments: [] },
        shares: (prev[postId]?.shares || 0) + 1
      }
    }));
  };

  return {
    engagements,
    likePost,
    unlikePost,
    addComment,
    sharePost
  };
}