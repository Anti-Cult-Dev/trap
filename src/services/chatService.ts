import OpenAI from 'openai';
import { Agent } from '../types/agent';

const klusterApiKey = import.meta.env.VITE_KLUSTERS_API_KEY;

if (!klusterApiKey) {
  console.warn('Missing VITE_KLUSTERS_API_KEY environment variable - Chat will use mock responses');
}

// Create a mock client if no API key is available
const client = klusterApiKey ? new OpenAI({ 
  apiKey: klusterApiKey, 
  baseURL: 'https://api.kluster.ai/v1',
  dangerouslyAllowBrowser: true // Enable browser usage
}) : null;

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
  "Babe, we need to stock up on tinfoil! I heard they upgraded the 5G towers with mind control frequencies! 📡🤯",
  "Just saw three UFOs doing a synchronized dance! The aliens are trying to communicate through interpretive dance! 🛸💃",
];

function getRandomMockResponse(): string {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}

export async function sendMessage(messages: Message[]): Promise<string> {
  // If no API key, use mock responses
  if (!client) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getRandomMockResponse());
      }, 1000);
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "klusterai/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [
        {
          role: 'system',
          content: currentAgent?.personality.systemPrompt || ''
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          // Only include username for user messages
          ...(msg.role === 'user' && msg.username && { name: msg.username })
        }))
      ]
    });

    return completion.choices[0]?.message?.content || 'Sorry, I got distracted by a strange light in the sky! 👽';
  } catch (error) {
    console.error('Error calling KlustersAI:', error);
    return "OMG babe, the government must be blocking our communication! 😱 Try again in a bit? 🙏";
  }
}