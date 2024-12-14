import { Message } from '../types/chat';
import { processStreamData } from '../utils/streamUtils';

interface UseStreamProcessorProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
}

export function useStreamProcessor({
  setMessages,
  setConversationId,
}: UseStreamProcessorProps) {
  const processStream = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    let assistantMessage = '';
    const assistantId = Date.now().toString();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = new TextDecoder().decode(value);
      const lines = text.split('\n').filter(line => line.trim());

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const result = processStreamData(line.slice(6));
          if (!result) continue;

          const { message, conversationId } = result;
          if (message) {
            assistantMessage += message;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === assistantId
                  ? { ...msg, content: assistantMessage }
                  : msg
              )
            );
          }
          if (conversationId) {
            setConversationId(conversationId);
          }
        }
      }
    }
  };

  return { processStream };
}