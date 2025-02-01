import { useState, useEffect } from 'react';
import { Message } from '../services/chatService';

interface ChatHistory {
  agentId: string;
  messages: Message[];
}

export function useChat(agentId: string) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(`chat_history_${agentId}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return [{
      role: 'assistant',
      content: "Hey baby! 👋 Did you see that weird light in the sky last night? I swear the government's testing something new! 🛸 What's on your mind?"
    }];
  });

  useEffect(() => {
    localStorage.setItem(`chat_history_${agentId}`, JSON.stringify(messages));
  }, [messages, agentId]);

  return {
    messages,
    setMessages
  };
}