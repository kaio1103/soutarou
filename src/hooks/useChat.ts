import { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chat';
import { useChatMessages } from './useChatMessages';
import { useVoiceInput } from './useVoiceInput';
import { useScrollToBottom } from './useScrollToBottom';
import { useFadeOutReload } from './useFadeOutReload';
import { createMessage } from '../utils/messageUtils';
import { INITIAL_GREETING } from '../constants/messages';

export function useChat() {
  const [input, setInput] = useState('');
  const [hasInitialMessage, setHasInitialMessage] = useState(false);
  const [isInitialMessageVisible, setIsInitialMessageVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isLoading,
    isLocked,
    handleSendMessage,
    addMessage,
  } = useChatMessages();

  // 初期メッセージの送信
  useEffect(() => {
    if (!hasInitialMessage && !isLoading) {
      const timer = setTimeout(() => {
        const initialMessage = createMessage(INITIAL_GREETING, 'assistant');
        addMessage(initialMessage);
        setHasInitialMessage(true);
        
        // フェードイン効果のために少し遅延を入れる
        setTimeout(() => {
          setIsInitialMessageVisible(true);
        }, 100);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasInitialMessage, isLoading, addMessage]);

  const handleSubmit = async (text: string) => {
    if (!text.trim() || isLoading || isLocked) return;
    
    await handleSendMessage(text);
    setInput('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(input);
  };

  const { isListening } = useVoiceInput({
    onInput: setInput,
    onSubmit: handleSubmit,
    isLoading,
    isLocked,
  });
  
  useScrollToBottom(messagesEndRef, messages);
  useFadeOutReload(isLocked);

  return {
    messages,
    input,
    isLoading,
    isLocked,
    isListening,
    isInitialMessageVisible,
    messagesEndRef,
    setInput,
    handleSubmit: handleFormSubmit,
  };
}