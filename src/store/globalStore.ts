import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  follows: Record<string, number>;
  favorites: Record<string, number>;
  username: string | null;
  hasVisitedAgents: boolean;
  incrementFollows: (agentId: string) => void;
  decrementFollows: (agentId: string) => void;
  incrementFavorites: (agentId: string) => void;
  decrementFavorites: (agentId: string) => void;
  getFollowCount: (agentId: string) => number;
  getFavoriteCount: (agentId: string) => number;
  setUsername: (username: string) => void;
  getUsername: () => string;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      follows: {},
      favorites: {},
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