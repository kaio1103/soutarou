import React from 'react';
import { Message } from '../types/chat';
import { UserAvatar } from './ui/UserAvatar';
import { MessageBubble } from './ui/MessageBubble';

interface ChatMessageProps {
  message: Message;
  isInitialMessage?: boolean;
}

export function ChatMessage({ message, isInitialMessage = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const hasContent = message.content?.trim().length > 0;

  return (
    <div 
      className={`
        flex gap-3 
        ${isUser ? 'flex-row-reverse' : ''} 
        ${isInitialMessage ? 'animate-fadeIn' : ''}
      `}
    >
      {isUser && <UserAvatar />}
      <MessageBubble isUser={isUser}>
        <p className="whitespace-pre-wrap break-words min-h-[1.5em]">
          {hasContent ? message.content : ' '}
        </p>
      </MessageBubble>
    </div>
  );
}