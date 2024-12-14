import React from 'react';
import { User } from 'lucide-react';
import { messages } from '../../constants/messages';

export function UserAvatar() {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center relative"
        aria-label={messages.accessibility.userAvatar}
      >
        <User size={22} className="text-white" />
        <span className="absolute -top-6 text-sm tracking-wider font-medium text-white/70">
          あなた
        </span>
      </div>
    </div>
  );
}