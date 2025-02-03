import { useGlobalStore } from '../store/globalStore';

export interface FavoriteAgent {
  id: string;
  name: string;
  image: string;
}

export function useFavorites() {
  const { 
    toggleFavoriteAgent, 
    isFavoriteAgent, 
    getFavoriteAgents,
    incrementFavorites, 
    decrementFavorites 
  } = useGlobalStore();

  const toggleFavorite = (agent: FavoriteAgent) => {
    toggleFavoriteAgent(agent);
    if (isFavoriteAgent(agent.id)) {
      incrementFavorites(agent.id);
    } else {
      decrementFavorites(agent.id);
    }
  };

  return {
    favorites: getFavoriteAgents(),
    toggleFavorite,
    isFavorite: isFavoriteAgent
  };
}