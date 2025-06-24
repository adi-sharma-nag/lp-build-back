import type { ModelConfig, ChatMessage, ChatResponse } from './types';
import { useAuthStore } from '../../stores/authStore';

const CLOUD_FUNCTION_URL = 'https://living-persona-back-816746757912.us-central1.run.app';
const SECRET_KEY = 'Y7mA3rftGFrSSed87dXfK9Zq1VtPgUcY8WrQjN6e2Hxs';

const getAuthHeader = (): string => {
  const header = useAuthStore.getState().authHeader;
  if (!header) throw new Error('No auth header found');
  return header;
};

export async function sendToCloudFunction(
  type: string,
  payload: object
): Promise<Record<string, unknown>> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: getAuthHeader(),
  };

  const response = await fetch(CLOUD_FUNCTION_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      key: SECRET_KEY,
      type,
      ...payload,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return (await response.json()).response;
}

export class GeminiChat {
  private modelConfig: ModelConfig;
  private persona = this.modelConfig.persona;

  constructor(modelConfig: ModelConfig) {
    this.modelConfig = modelConfig;
  }

  async chat(message: string, history: ChatMessage[] = [], personaId: string): Promise<ChatResponse> {
    const fullMessage = this.composeMessageWithHistory(message, history);
    const result = await sendToCloudFunction('chat', {
      query: fullMessage,
      personaId,
      historyFileName: `${personaId}.json`,
    });
    return this.wrapResponse(result.chat as string, result.suggestions as string);
  }

  async analyzeImage(imageData: string): Promise<ChatResponse> {
    const result = await sendToCloudFunction('image-analysis', { imageData });
    return this.wrapResponse(result.response as string, undefined, result.image as string);
  }

  private composeMessageWithHistory(message: string, history: ChatMessage[]): string {
    const historyText = history.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    return historyText ? `${historyText}\nuser: ${message}` : message;
  }

  private wrapResponse(text: string, suggestionsText?: string, image?: string): ChatResponse {
    return {
      content: text,
      metadata: { confidence: 1, processingTime: 0 },
      suggestions: suggestionsText
        ? suggestionsText.split('\n').filter(Boolean).slice(0, 5)
        : undefined,
      image,
    };
  }
}

export async function getChatHistory() {
  return sendToCloudFunction('history', {});
}

export async function getChatHistoryContent(historyFileName: string) {
  return sendToCloudFunction('historyChatContent', { historyFileName });
}
