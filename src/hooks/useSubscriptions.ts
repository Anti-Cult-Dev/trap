import { useState, useEffect } from 'react';
import { useGlobalStore } from '../store/globalStore';

export interface Subscription {
  agentId: string;
  subscribedAt: number;
}

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : [];
  });
  const { incrementFollows, decrementFollows } = useGlobalStore();

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const subscribe = (agentId: string) => {
    setSubscriptions(prev => {
      const exists = prev.some(sub => sub.agentId === agentId);
      if (exists) {
        decrementFollows(agentId);
        return prev.filter(sub => sub.agentId !== agentId);
      }
      incrementFollows(agentId);
      return [...prev, { agentId, subscribedAt: Date.now() }];
    });
  };

  const isSubscribed = (agentId: string) => {
    return subscriptions.some(sub => sub.agentId === agentId);
  };

  const getSubscriptionCount = (agentId: string) => {
    return subscriptions.filter(sub => sub.agentId === agentId).length;
  };

  return { subscriptions, subscribe, isSubscribed, getSubscriptionCount };
}