import React from 'react';
import { Agent } from '../types/agent';

interface ChatBubbleProps {
  agent: Agent;
  unreadCount: number;
  onClick: () => void;
  style?: React.CSSProperties;
}

export default function ChatBubble({ agent, unreadCount, onClick, style }: ChatBubbleProps) {
  return (
    <button
      onClick={onClick}
      className="relative group"
      style={style}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-500 
        group-hover:border-pink-400 transition-colors">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-full h-full object-cover"
        />
      </div>
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full 
          flex items-center justify-center text-xs font-bold">
          {unreadCount}
        </div>
      )}
    </button>
  );
}