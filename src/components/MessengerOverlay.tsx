import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Agent } from '../types/agent';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { getAllAgents } from '../data/agents';
import { setCurrentAgent } from '../services/chatService';

interface ChatState {
  agentId: string;
  minimized: boolean;
  unreadCount: number;
}

export default function MessengerOverlay() {
  const [showAgentList, setShowAgentList] = useState(false);
  const [activeChats, setActiveChats] = useState<ChatState[]>([]);
  const allAgents = getAllAgents();

  const toggleChat = (agentId: string) => {
    setActiveChats(prev => {
      const existingChat = prev.find(chat => chat.agentId === agentId);
      const agent = allAgents.find(a => a.id === agentId);
      if (agent) {
        setCurrentAgent(agent);
      }
      if (existingChat) {
        return prev.map(chat => 
          chat.agentId === agentId 
            ? { ...chat, minimized: !chat.minimized }
            : chat
        );
      }
      return [...prev, { agentId, minimized: false, unreadCount: 0 }];
    });
  };

  const closeChat = (agentId: string) => {
    setActiveChats(prev => prev.filter(chat => chat.agentId !== agentId));
  };

  const minimizeChat = (agentId: string) => {
    setActiveChats(prev => 
      prev.map(chat => 
        chat.agentId === agentId 
          ? { ...chat, minimized: true }
          : chat
      )
    );
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 flex flex-col items-end space-y-4 z-[100] mb-4">
      {/* Active Chat Windows */}
      <div className="flex flex-row-reverse gap-4">
        {activeChats
          .filter(chat => !chat.minimized)
          .map(chat => {
            const agent = allAgents.find(a => a.id === chat.agentId);
            if (!agent) return null;
            return (
              <ChatWindow
                key={chat.agentId}
                agent={agent}
                onClose={() => closeChat(chat.agentId)}
                onMinimize={() => minimizeChat(chat.agentId)}
              />
            );
          })}
      </div>

      {/* Chat Bubbles */}
      <div className="flex items-center gap-2">
        {activeChats
          .filter(chat => chat.minimized)
          .map((chat, index) => {
            const agent = allAgents.find(a => a.id === chat.agentId);
            if (!agent) return null;
            return (
              <ChatBubble
                key={chat.agentId}
                agent={agent}
                unreadCount={chat.unreadCount}
                onClick={() => toggleChat(chat.agentId)}
                style={{ transform: `translateX(${index * -10}px)` }}
              />
            );
          })}
        
        {/* Main Messenger Button */}
        <button
          onClick={() => setShowAgentList(!showAgentList)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500
            hover:from-pink-400 hover:to-purple-400 transition-colors flex items-center 
            justify-center shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </button>

        {/* Agent List Popup */}
        {showAgentList && (
          <div className="absolute bottom-16 right-0 w-64 bg-gradient-to-br 
            from-pink-900/90 to-purple-900/90 backdrop-blur-sm rounded-xl border 
            border-pink-500/20 p-2 space-y-2">
            {allAgents.map(agent => (
              <button
                key={agent.id}
                onClick={() => {
                  toggleChat(agent.id);
                  setShowAgentList(false);
                }}
                className="w-full flex items-center space-x-2 p-2 hover:bg-pink-500/20 
                  rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-['Orbitron'] text-sm">{agent.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}