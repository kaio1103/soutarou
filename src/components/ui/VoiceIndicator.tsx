import React from 'react';

export function VoiceIndicator() {
  return (
    <div className="flex items-center justify-center text-sm text-white animate-pulse">
      <span className="mr-2">●</span>
      音声入力中...
    </div>
  );
}