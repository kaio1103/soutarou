import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { messages } from '../../constants/messages';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isListening?: boolean;
  onSubmit: () => void;
}

export function InputField({ 
  value, 
  onChange, 
  disabled = false,
  placeholder,
  isListening = false,
  onSubmit
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isListening && !disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isListening, disabled]);

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-6 py-3 pr-14 rounded-lg text-lg
          border-2 border-transparent
          text-white
          focus:outline-none
          transition-all duration-200
          disabled:cursor-not-allowed
          ${isListening 
            ? 'bg-red-500/40 placeholder-white/90'
            : 'bg-white/40 placeholder-gray-500'
          }
          ${disabled || isListening
            ? 'bg-gray-200/40 disabled:placeholder-gray-600'
            : ''
          }
        `}
        disabled={disabled || isListening}
        aria-label={messages.accessibility.messageInput}
      />
      <button
        type="submit"
        onClick={onSubmit}
        disabled={disabled || isListening}
        className={`
          absolute right-3 top-1/2 -translate-y-1/2
          p-2 rounded-md
          text-white/80 hover:text-white
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${disabled || isListening ? 'bg-transparent' : 'hover:bg-white/10'}
        `}
        aria-label={messages.buttons.send}
      >
        <Send size={24} />
      </button>
    </div>
  );
}