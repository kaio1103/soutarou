import { useEffect, useCallback, useState } from 'react';
import { createSpeechRecognition } from '../utils/speechUtils';
import { messages } from '../constants/messages';

interface UseVoiceInputProps {
  onInput: (text: string) => void;
  onSubmit: (text: string) => void;
  isLoading: boolean;
  isLocked: boolean;
}

export function useVoiceInput({ 
  onInput, 
  onSubmit, 
  isLoading,
  isLocked 
}: UseVoiceInputProps) {
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = useCallback(() => {
    // チャットボットの応答待ち中または会話がロックされている場合は音声入力を開始しない
    if (isLoading || isLocked) return;
    
    if (!('webkitSpeechRecognition' in window)) {
      console.warn(messages.errors.speechRecognitionNotSupported);
      return;
    }

    const recognition = createSpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onInput(text);
      // チャットボットの応答待ち中でなく、会話がロックされていない場合のみ送信
      if (!isLoading && !isLocked) {
        onSubmit(text);
      }
    };

    recognition.start();
  }, [onInput, onSubmit, isLoading, isLocked]);

  // チャットボットの応答待ち中に音声入力中だった場合、音声入力を停止
  useEffect(() => {
    if (isLoading && isListening) {
      setIsListening(false);
    }
  }, [isLoading, isListening]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        startVoiceInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [startVoiceInput]);

  return { isListening };
}