// chatService.ts
import { Agent } from '../types/agent';

const klusterApiKey = import.meta.env.VITE_KLUSTERS_API_KEY;

if (!klusterApiKey) {
  console.warn('Missing VITE_KLUSTERS_API_KEY environment variable - Chat will use mock responses');
}

class KlustersClient {
  private apiKey: string;
  private baseURL: string = 'https://api.kluster.ai/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createChatCompletion(messages: { role: string; content: string }[]) {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          messages,
          model: 'eliza-1'
        })
      });

      if (!response.ok) {
        throw new Error(`Klusters API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Klusters API:', error);
      throw error;
    }
  }
}

// Create a mock client if no API key is available
const client = klusterApiKey ? new KlustersClient(klusterApiKey) : null;

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  username?: string;
}

let currentAgent: Agent | null = null;

export function setCurrentAgent(agent: Agent) {
  currentAgent = agent;
}

const mockResponses = [
  "OMG babe! 😱 I was just reading about how the government is using pigeons to spy on us! Have you noticed them acting suspicious lately? 🕊️👀",
  "Did you feel that energy shift just now? 🌀 The shadow people are extra active tonight! Stay woke! 👻",
  "I found this CRAZY document about chemtrails! They're not just controlling the weather - they're programming our DNA! 🧬☁️",
  "Just saw a video about how the moon landing was filmed in Stanley Kubrick's basement! Mind = blown! 🌙🎬",
  "They're putting microchips in everything now! My toaster just tried to connect to the WiFi! 😫📱"
];

function getRandomMockResponse(): string {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}

export async function sendMessage(messages: Message[]): Promise<string> {
  if (!currentAgent) {
    throw new Error('No agent selected');
  }

  try {
    if (!client) {
      // Return mock response if no API key
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(getRandomMockResponse());
        }, 1000);
      });
    }

    // Add system message with agent context
    const systemMessage = {
      role: 'system',
      content: `You are ${currentAgent.name}, ${currentAgent.description}`
    };

    const formattedMessages = [
      systemMessage,
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await client.createChatCompletion(formattedMessages);
    return response;

  } catch (error) {
    console.error('Error in chat service:', error);
    return getRandomMockResponse();
  }
}