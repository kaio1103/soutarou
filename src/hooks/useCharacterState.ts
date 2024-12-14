import { useEffect, useState, useRef } from 'react';
import { Message } from '../types/chat';
import { imageConfig } from '../config/images';
import { INITIAL_GREETING } from '../constants/messages';

export function useCharacterState(messages: Message[], input: string) {
  const [characterPublicId, setCharacterPublicId] = useState(imageConfig.character.talking);
  const lastAssistantMessageRef = useRef<string | null>(null);
  const hasUserInputRef = useRef(false);
  const isInitialMessageRef = useRef(true);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage?.role === 'assistant') {
      lastAssistantMessageRef.current = lastMessage.content;
      hasUserInputRef.current = false;

      // 初期メッセージの場合は listening 状態を維持
      if (isInitialMessageRef.current && lastMessage.content === INITIAL_GREETING) {
        isInitialMessageRef.current = false;
        setCharacterPublicId(imageConfig.character.listening);
      } else {
        setCharacterPublicId(imageConfig.character.talking);
      }
      return;
    }

    if (lastMessage?.role === 'user') {
      lastAssistantMessageRef.current = null;
      setCharacterPublicId(imageConfig.character.listening);
    }
  }, [messages]);

  useEffect(() => {
    if (lastAssistantMessageRef.current) {
      if (!hasUserInputRef.current && input.length > 0) {
        hasUserInputRef.current = true;
        setCharacterPublicId(imageConfig.character.listening);
      }
    } else {
      setCharacterPublicId(imageConfig.character.listening);
    }
  }, [input]);

  return characterPublicId;
}