export interface StreamData {
  event: string;
  answer?: string;
  conversation_id?: string;
  task_id?: string;
  created_at?: number;
}

export interface ProcessedStreamData {
  message: string;
  conversationId?: string;
}

export interface StreamReader {
  read(): Promise<{
    done: boolean;
    value?: Uint8Array;
  }>;
}