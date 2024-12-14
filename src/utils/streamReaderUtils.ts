import { StreamReader, ProcessedStreamData } from '../types/stream';
import { processStreamData } from './streamUtils';
import { StreamProcessingError } from '../types/errors';
import { messages } from '../constants/messages';

export async function processStreamChunk(
  chunk: Uint8Array
): Promise<ProcessedStreamData[]> {
  const text = new TextDecoder().decode(chunk);
  const lines = text.split('\n').filter(line => line.trim());
  
  const processedData: ProcessedStreamData[] = [];
  
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    
    const data = line.slice(6);
    const processed = processStreamData(data);
    
    if (processed) {
      processedData.push(processed);
    }
  }
  
  return processedData;
}

export async function* createStreamProcessor(reader: StreamReader) {
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done || !value) break;

      const processedData = await processStreamChunk(value);
      for (const data of processedData) {
        yield data;
      }
    }
  } catch (error) {
    console.error('Stream processing error:', error);
    throw new StreamProcessingError(messages.errors.streamProcessing);
  }
}