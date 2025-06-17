import type { ModelConfig, ChatMessage, ChatResponse } from './types';

const CLOUD_FUNCTION_URL = 'https://living-persona-back-816746757912.us-central1.run.app';
const SECRET_KEY = 'Y7mA3rftGFrSSed87dXfK9Zq1VtPgUcY8WrQjN6e2Hxs';

async function sendToCloudFunction(
  type: 'chat' | 'suggestions',
  payload: object
): Promise<string> {
  try {
    const response = await fetch(CLOUD_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: SECRET_KEY,
        type,
        ...payload,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    if (result.response) {
      return result.response;
    } else if (result.message) {
      return result.message;
    } else {
      return JSON.stringify(result);  // fallback for unexpected structure
    }
  } catch (err: any) {
    console.error('Error communicating with backend:', err);
    return `Error: ${err.message}`;
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
    const responseText = await sendToCloudFunction('chat', { query: fullMessage });
    return this.wrapResponse(responseText);
  }

  async getSuggestions(): Promise<ChatResponse> {
    const responseText = await sendToCloudFunction('suggestions', {});
    return this.wrapResponse(responseText);
  }

  private composeMessageWithHistory(message: string, history: ChatMessage[]): string {
    const instructions = this.modelConfig.systemInstructions.join('\n');
    const historyText = history
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    return `${instructions}\n${historyText}\nuser: ${message}`;
  }

  private wrapResponse(text: string): ChatResponse {
    return {
      content: text,
      metadata: {
        confidence: 1,  // Can update if backend starts returning confidence
        processingTime: 0  // Can update if backend adds timing info
      }
    };
  }
}
