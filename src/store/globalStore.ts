import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteAgent {
  id: string;
  // Add other properties as needed
}

interface Comment {
  id: string;
  agentId: string;
  username: string;
  content: string;
  timestamp: number;
}

interface GlobalState {
  follows: Record<string, number>;
  favorites: Record<string, number>;
  favoriteAgents: FavoriteAgent[];
  comments: Comment[];
  username: string | null;
  hasVisitedAgents: boolean;
  incrementFollows: (agentId: string) => void;
  decrementFollows: (agentId: string) => void;
  incrementFavorites: (agentId: string) => void;
  decrementFavorites: (agentId: string) => void;
  getFollowCount: (agentId: string) => number;
  getFavoriteCount: (agentId: string) => number;
  toggleFavoriteAgent: (agent: FavoriteAgent) => void;
  getFavoriteAgents: () => FavoriteAgent[];
  isFavoriteAgent: (agentId: string) => boolean;
  addComment: (agentId: string, content: string) => void;
  getComments: (agentId: string) => Comment[];
  setUsername: (username: string) => void;
  getUsername: () => string | null;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      follows: {},
      favorites: {},
      favoriteAgents: [],
      comments: [],
      username: null,
      hasVisitedAgents: false,
      
      incrementFollows: (agentId: string) =>
        set((state) => ({
          follows: {
            ...state.follows,
            [agentId]: (state.follows[agentId] || 0) + 1,
          },
        })),
        
      decrementFollows: (agentId: string) =>
        set((state) => ({
          follows: {
            ...state.follows,
            [agentId]: Math.max(0, (state.follows[agentId] || 0) - 1),
          },
        })),
        
      incrementFavorites: (agentId: string) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [agentId]: (state.favorites[agentId] || 0) + 1,
          },
        })),
        
      decrementFavorites: (agentId: string) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [agentId]: Math.max(0, (state.favorites[agentId] || 0) - 1),
          },
        })),
        
      getFollowCount: (agentId: string) => get().follows[agentId] || 0,
      getFavoriteCount: (agentId: string) => get().favorites[agentId] || 0,
      
      toggleFavoriteAgent: (agent: FavoriteAgent) =>
        set((state) => {
          const exists = state.favoriteAgents.some(fav => fav.id === agent.id);
          if (exists) {
            return {
              favoriteAgents: state.favoriteAgents.filter(fav => fav.id !== agent.id)
            };
          }
          return {
            favoriteAgents: [...state.favoriteAgents, agent]
          };
        }),
      
      getFavoriteAgents: () => get().favoriteAgents,
      
      isFavoriteAgent: (agentId: string) => 
        get().favoriteAgents.some(fav => fav.id === agentId),
      
      addComment: (agentId: string, content: string) => {
        const username = get().username;
        if (!username) return;
        
        set((state) => ({
          comments: [
            ...state.comments,
            {
              id: crypto.randomUUID(),
              agentId,
              username,
              content,
              timestamp: Date.now()
            }
          ]
        }));
      },

      getComments: (agentId: string) => 
        get().comments
          .filter(comment => comment.agentId === agentId)
          .sort((a, b) => b.timestamp - a.timestamp),
      
      setUsername: (username: string) =>
        set({ username }),
        
      getUsername: () => {
        const state = get();
        return state.username || 'Anonymous';
      },
      
      setHasVisitedAgents: () =>
        set({ hasVisitedAgents: true }),
    }),
    {
      name: 'traphouse-store',
    }
  )
);