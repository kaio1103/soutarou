import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types/chat';
import { sendMessage } from '../api/chat';
import { messages, LAST_GREETING } from '../constants/messages';
import { APIError } from '../types/errors';
import { createMessage } from '../utils/messageUtils';
import { MAX_ASSISTANT_MESSAGES } from '../constants/limits';
import { createStreamProcessor } from '../utils/streamReaderUtils';

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  // Add Control key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && !isLocked) {
        setIsLocked(true);
        setTimeout(() => {
          addMessage(createMessage(LAST_GREETING, 'assistant'));
        }, 800);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, addMessage]);

  const handleSendMessage = async (input: string) => {
    if (!input.trim() || isLoading || isLocked) return;

    try {
      const userMessage = createMessage(input, 'user');
      addMessage(userMessage);
      setIsLoading(true);

      const response = await sendMessage(input, conversationId);
      if (!response) throw new APIError(messages.errors.noResponse);

      const reader = response.getReader();
      const assistantMessage = createMessage('', 'assistant');
      addMessage(assistantMessage);

      let fullResponse = '';
      
      try {
        for await (const data of createStreamProcessor(reader)) {
          if (data?.message) {
            fullResponse += data.message;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === assistantMessage.id
                  ? { ...msg, content: fullResponse }
                  : msg
              )
            );
          }
          if (data?.conversationId) {
            setConversationId(data.conversationId);
          }
        }

        const assistantCount = messages.filter(msg => msg.role === 'assistant').length;
        if (assistantCount >= MAX_ASSISTANT_MESSAGES) {
          setIsLocked(true);
          setTimeout(() => {
            addMessage(createMessage(LAST_GREETING, 'assistant'));
          }, 800);
        }
      } catch (error) {
        console.error('Stream processing error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage = error instanceof APIError 
        ? error.message 
        : messages.errors.sendFailed;
      addMessage(createMessage(errorMessage, 'assistant'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    isLocked,
    handleSendMessage,
    addMessage,
  };
}