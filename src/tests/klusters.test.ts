import { describe, it, expect, vi } from 'vitest';
import { KlustersClient } from '../services/chatService';

describe('KlustersClient', () => {
  const mockApiKey = 'test-api-key';
  const client = new KlustersClient(mockApiKey);

  it('should make a successful chat completion request', async () => {
    const mockMessages = [
      { role: 'user', content: 'Hello' }
    ];

    const mockResponse = {
      choices: [{
        message: {
          content: 'Hi there!'
        }
      }]
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await client.createChatCompletion(mockMessages);

    expect(result).toBe('Hi there!');
    expect(fetch).toHaveBeenCalledWith('https://api.kluster.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockApiKey}`
      },
      body: JSON.stringify({
        messages: mockMessages,
        model: 'meta-llama-2-70b-chat',
        temperature: 0.9,
        max_tokens: 1000
      })
    });
  });

  it('should handle API errors gracefully', async () => {
    const mockMessages = [
      { role: 'user', content: 'Hello' }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error'
    });

    const consoleSpy = vi.spyOn(console, 'error');
    const result = await client.createChatCompletion(mockMessages);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error calling Klusters API:',
      expect.any(Error)
    );
    expect(result).toBeDefined(); // Should return a mock response
  });
});