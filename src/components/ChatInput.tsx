import React from 'react';
import { messages } from '../constants/messages';
import { CHAT_LOCKED_MESSAGE } from '../constants/limits';
import { InputField } from './ui/InputField';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  isLocked: boolean;
  isListening: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ 
  input, 
  isLoading, 
  isLocked,
  isListening,
  onInputChange, 
  onSubmit 
}: ChatInputProps) {
  const placeholder = isLocked 
    ? CHAT_LOCKED_MESSAGE 
    : isListening
      ? messages.placeholders.voiceInput
      : messages.placeholders.messageInput;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex">
        <InputField
          value={input}
          onChange={onInputChange}
          disabled={isLoading || isLocked}
          placeholder={placeholder}
          isListening={isListening}
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
}