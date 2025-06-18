import type { ModelConfig, ChatMessage, ChatResponse } from './types';

const CLOUD_FUNCTION_URL =
  'https://living-persona-back-816746757912.us-central1.run.app';
const SECRET_KEY = 'Y7mA3rftGFrSSed87dXfK9Zq1VtPgUcY8WrQjN6e2Hxs';

export async function sendToCloudFunction(
  type: 'chat' | 'image-analysis' | 'generate-image',
  payload: object
): Promise<any> {
  try {
    const backendType = type

    const response = await fetch(CLOUD_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: SECRET_KEY,
        type: backendType,
        ...payload,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (err: any) {
    console.error('Error communicating with backend:', err);
    throw err;
  }
}

export class GeminiChat {
  private modelConfig: ModelConfig;
  private persona: ModelConfig['persona'];

  constructor(modelConfig: ModelConfig) {
    this.modelConfig = modelConfig;
    this.persona = modelConfig.persona;
  }

  async chat(
    message: string,
    history: ChatMessage[] = [],
    personaId: string
  ): Promise<ChatResponse> {
    const fullMessage = this.composeMessageWithHistory(message, history);
    const result = await sendToCloudFunction('chat', {
      query: fullMessage,
      personaId,
    });
    return this.wrapResponse(result.chat, result.suggestions);
  }

  // Suggestions are now returned with chat, so this is unused but kept
  // for backwards compatibility.
  async getSuggestions(): Promise<ChatResponse> {
    const result = await sendToCloudFunction('chat', {});
    return this.wrapResponse(result.chat, result.suggestions);
  }

  async analyzeImage(imageData: string): Promise<ChatResponse> {
    const result = await sendToCloudFunction('image-analysis', { imageData });
    return this.wrapResponse(result.response, undefined, result.image);
  }

  private composeMessageWithHistory(message: string, history: ChatMessage[]): string {
    const historyText = history
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    if (historyText) {
      return `${historyText}\nuser: ${message}`;
    }
    return message;
  }

  private wrapResponse(
    text: string,
    suggestionsText?: string,
    image?: string,
  ): ChatResponse {
    return {
      content: text,
      metadata: {
        confidence: 1,
        processingTime: 0,
      },
      suggestions: suggestionsText
        ? suggestionsText
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.replace(/^["'\d.\s-]+/, '').trim())
            .slice(0, 5)
        : undefined,
      image,
    };
  }
}
