import { useState, useEffect } from 'react';
import { useGlobalStore } from '../store/globalStore';

export interface FavoriteAgent {
  id: string;
  name: string;
  image: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteAgent[]>(() => {
    const saved = localStorage.getItem('favorites');
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      // Validate the structure of each favorite
      return parsed.filter(fav => fav && fav.id && fav.name && fav.image);
    } catch (e) {
      console.error('Error parsing favorites:', e);
      return [];
    }
  });
  const { incrementFavorites, decrementFavorites } = useGlobalStore();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (agent: FavoriteAgent) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === agent.id);
      // Ensure we have all required fields
      if (!agent.id || !agent.name || !agent.image) {
        console.error('Invalid agent data for favorites:', agent);
        return prev;
      }
      if (exists) {
        decrementFavorites(agent.id);
        return prev.filter(fav => fav.id !== agent.id);
      }
      incrementFavorites(agent.id);
      return [...prev, {
        id: agent.id,
        name: agent.name,
        image: agent.image
      }];
    });
  };

  const isFavorite = (agentId: string) => {
    return favorites?.some(fav => fav.id === agentId) || false;
  };

  return { favorites, toggleFavorite, isFavorite };
}