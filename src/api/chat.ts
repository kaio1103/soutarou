import { APIError } from '../types/errors';
import { messages } from '../constants/messages';
import { ChatResponse } from '../types/chat';

const API_KEY = 'app-wgYwnACEDkj78ClufSb6oLFP';
const API_URL = 'https://api.dify.ai/v1/chat-messages';

interface SendMessageOptions {
  inputs?: Record<string, unknown>;
  query: string;
  response_mode: 'streaming';
  conversation_id?: string;
  user: string;
  files: never[];
}

export async function sendMessage(message: string, conversationId: string = ''): Promise<ReadableStream<Uint8Array> | null> {
  if (!message.trim()) {
    throw new APIError(messages.errors.emptyMessage);
  }

  try {
    const options: SendMessageOptions = {
      inputs: {},
      query: message,
      response_mode: 'streaming',
      conversation_id: conversationId,
      user: 'Kai_neko',
      files: [],
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || messages.errors.sendFailed,
        response.status
      );
    }

    return response.body;
  } catch (error) {
    console.error('API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    });
    throw error instanceof APIError ? error : new APIError(messages.errors.sendFailed);
  }
}