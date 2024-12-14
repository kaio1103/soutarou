import React from 'react';

export function LoadingMessage() {
  return (
    <div className="flex gap-3">
      <div className="relative max-w-[80%] px-6 py-4 rounded-lg bg-white/80 text-black">
        <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-white/80 border-b-[8px] border-b-transparent" />
        <div className="flex items-center gap-2">
          <span className="text-lg animate-pulse tracking-widest">・・・・・</span>
        </div>
      </div>
    </div>
  );
}