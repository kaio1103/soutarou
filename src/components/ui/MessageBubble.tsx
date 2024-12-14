import React from 'react';

interface MessageBubbleProps {
  isUser: boolean;
  children: React.ReactNode;
}

export function MessageBubble({ isUser, children }: MessageBubbleProps) {
  return (
    <div
      className={`
        relative max-w-[80%] px-6 py-4 rounded-lg text-lg leading-relaxed
        ${isUser
          ? 'bg-blue-500 text-white'
          : 'bg-white text-gray-800'
        }
      `}
    >
      {!isUser && (
        <div 
          className="absolute left-[-12px] top-4 w-0 h-0 
            border-t-[12px] border-t-transparent 
            border-r-[12px] border-r-white 
            border-b-[12px] border-b-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}