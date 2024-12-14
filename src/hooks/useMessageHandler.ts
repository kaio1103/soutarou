import { Message } from '../types/chat';
import { sendMessage } from '../api/chat';
import { messages } from '../constants/messages';
import { APIError } from '../types/errors';
import { createMessage } from '../utils/messageUtils';

interface UseMessageHandlerProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  conversationId: string;
  processStream: (reader: ReadableStreamDefaultReader<Uint8Array>) => Promise<void>;
}

export function useMessageHandler({
  setMessages,
  setIsLoading,
  conversationId,
  processStream,
}: UseMessageHandlerProps) {
  const handleSendMessage = async (input: string) => {
    try {
      const userMessage = createMessage(input, 'user');
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      const response = await sendMessage(input, conversationId);
      if (!response) throw new APIError(messages.errors.noResponse);

      const reader = response.getReader();
      const assistantMessage = createMessage('', 'assistant');
      
      setMessages(prev => [...prev, assistantMessage]);
      await processStream(reader);
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage = error instanceof APIError ? error.message : messages.errors.sendFailed;
      const errorResponse = createMessage(errorMessage, 'assistant');
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSendMessage };
}