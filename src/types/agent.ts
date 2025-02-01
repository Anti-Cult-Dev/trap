export interface AgentStats {
  posts: number;
  drops: number;
  status: string;
  awakeTime: number;  // Timestamp when the agent was awakened
}

export interface AgentPersonality {
  traits: string[];
  interests: string[];
  quirks: string[];
  systemPrompt: string;
}

export interface Agent {
  id: string;
  name: string;
  image: string;
  banner: string;
  description: string;
  followers: string;
  likes: string;
  rating: string;
  stats: AgentStats;
  tags: string[];
  personality: AgentPersonality;
  tokenAddress?: string;
  chainId?: string;
}