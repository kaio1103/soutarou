import { StreamData, ProcessedStreamData } from '../types/stream';
import { ValidationError } from '../types/errors';
import { messages } from '../constants/messages';
import { isValidStreamData } from './validationUtils';

export function processStreamData(data: string): ProcessedStreamData | null {
  try {
    // 不完全なJSONデータの処理を防ぐ
    if (!data.trim() || !data.endsWith('}')) {
      return null;
    }

    const parsedData = JSON.parse(data) as StreamData;
    
    if (!isValidStreamData(parsedData)) {
      return null;
    }

    // 必要なデータのみを抽出して返す
    return {
      message: parsedData.answer || '',
      conversationId: parsedData.conversation_id,
    };
  } catch (error) {
    // エラーログを改善
    if (error instanceof SyntaxError) {
      console.error('Stream processing error:', {
        data,
        error: error.message
      });
    }
    return null;
  }
}