import React from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { LoadingMessage } from './LoadingMessage';

interface ChatSectionProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  isLocked: boolean;
  isListening: boolean;
  isInitialMessageVisible?: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatSection({ 
  messages, 
  input, 
  isLoading,
  isLocked,
  isListening,
  isInitialMessageVisible,
  messagesEndRef, 
  onInputChange, 
  onSubmit 
}: ChatSectionProps) {
  const lastMessage = messages[messages.length - 1];
  const showLoading = isLoading && (!lastMessage || lastMessage.role === 'user');

  return (
    <div className="w-1/2 flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide space-y-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isInitialMessage={index === 0 && isInitialMessageVisible}
          />
        ))}
        {showLoading && <LoadingMessage />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput 
        input={input}
        isLoading={isLoading}
        isLocked={isLocked}
        isListening={isListening}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}