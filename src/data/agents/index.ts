import { Agent } from '../../types/agent';
import { methany } from './methany';
import { roxy } from './roxy';

export const agents: Record<string, Agent> = {
  methany,
  roxy,
  // Add other agents here
};

export function getAgent(id: string): Agent | undefined {
  return agents[id];
}

export function getAllAgents(): Agent[] {
  return Object.values(agents);
}