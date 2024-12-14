import { StreamData } from '../types/stream';

export function isValidStreamData(data: unknown): data is StreamData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const streamData = data as StreamData;
  
  // イベントタイプの検証
  if (typeof streamData.event !== 'string' || !streamData.event) {
    return false;
  }

  // メッセージイベントの場合の追加検証
  if (streamData.event === 'message') {
    // answer は undefined または文字列
    if (streamData.answer !== undefined && typeof streamData.answer !== 'string') {
      return false;
    }
    
    // conversation_id は undefined または文字列
    if (streamData.conversation_id !== undefined && typeof streamData.conversation_id !== 'string') {
      return false;
    }
  }

  return true;
}