import { Message } from '../types/chat';

export function createMessage(
  content: string,
  role: 'user' | 'assistant'
): Message {
  return {
    id: Date.now().toString(),
    content,
    role,
    timestamp: Date.now(),
  };
}