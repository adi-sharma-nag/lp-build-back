import type { ModelConfig, ChatMessage, ChatResponse } from './types';
import { useAuthStore } from '../../stores/authStore';

const CLOUD_FUNCTION_URL =
  'https://living-persona-back-816746757912.us-central1.run.app';
const SECRET_KEY = 'Y7mA3rftGFrSSed87dXfK9Zq1VtPgUcY8WrQjN6e2Hxs';

// Generates the correct Authorization header
const getAuthHeader = (): string => {
  const header = useAuthStore.getState().authHeader;

  // Fallback to Basic srk:test if no authHeader in store
  const auth = header || 'Basic ' + btoa('srk:test');

  console.log('Authorization header being sent:', auth);
  return auth;
};

export async function sendToCloudFunction(
  type: 'chat' | 'image-analysis' | 'generate-image' | 'history' | 'historyChatContent',
  payload: object
): Promise<Record<string, unknown>> {
  try {
    const backendType = type;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    };

    console.log('Sending request to backend with headers:', headers);
    console.log('Request payload:', {
      key: SECRET_KEY,
      type: backendType,
      ...payload,
    });

    const response = await fetch(CLOUD_FUNCTION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        key: SECRET_KEY,
        type: backendType,
        ...payload,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = `HTTP ${response.status}: ${errorText}`;
      try {
        const parsed = JSON.parse(errorText);
        if (parsed?.error) {
          message = parsed.error;
        }
      } catch {
        // fallback to raw text
      }
      throw new Error(message);
    }

    const result = await response.json();

    if (typeof result === 'object' && result !== null && 'response' in result) {
      return (result as { response: Record<string, unknown> }).response;
    }

    return result;
  } catch (err: unknown) {
    console.error('Error communicating with backend:', err);
    throw err;
  }
}

export class GeminiChat {
  private modelConfig: ModelConfig
  private persona: ModelConfig['persona'] | undefined

  constructor(modelConfig: ModelConfig) {
    this.modelConfig = modelConfig
    this.persona = modelConfig.persona
  }

  async chat(
    message: string,
    history: ChatMessage[] = [],
    personaId: string
  ): Promise<ChatResponse> {
    const fullMessage = this.composeMessageWithHistory(message, history)
    const result = await sendToCloudFunction('chat', {
      query: fullMessage,
      personaId,
      historyFileName: `${personaId}.json`,
    })
    return this.wrapResponse(result.chat as string, result.suggestions as string)
  }

  // Suggestions are now returned with chat, so this is unused but kept
  // for backwards compatibility.
  async getSuggestions(): Promise<ChatResponse> {
    const result = await sendToCloudFunction('chat', {})
    return this.wrapResponse(result.chat as string, result.suggestions as string)
  }

  async analyzeImage(imageData: string): Promise<ChatResponse> {
    const result = await sendToCloudFunction('image-analysis', { imageData })
    return this.wrapResponse(result.response as string, undefined, result.image as string)
  }

  private composeMessageWithHistory(message: string, history: ChatMessage[]): string {
    const historyText = history.map(msg => `${msg.role}: ${msg.content}`).join('\n')
    if (historyText) {
      return `${historyText}\nuser: ${message}`
    }
    return message
  }

  private wrapResponse(
    text: string,
    suggestionsText?: string,
    image?: string
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
    }
  }
}


export class GeminiChat {
  private modelConfig: ModelConfig
  private persona: ModelConfig['persona'] | undefined

  constructor(modelConfig: ModelConfig) {
    this.modelConfig = modelConfig
    this.persona = modelConfig.persona
  }

  async chat(
    message: string,
    history: ChatMessage[] = [],
    personaId: string
  ): Promise<ChatResponse> {
    const fullMessage = this.composeMessageWithHistory(message, history)
    const result = await sendToCloudFunction('chat', {
      query: fullMessage,
      personaId,
      historyFileName: `${personaId}.json`,
    })
    return this.wrapResponse(result.chat as string, result.suggestions as string)
  }

  // Suggestions are now returned with chat, so this is unused but kept
  // for backwards compatibility.
  async getSuggestions(): Promise<ChatResponse> {
    const result = await sendToCloudFunction('chat', {})
    return this.wrapResponse(result.chat as string, result.suggestions as string)
  }

  async analyzeImage(imageData: string): Promise<ChatResponse> {
    const result = await sendToCloudFunction('image-analysis', { imageData })
    return this.wrapResponse(result.response as string, undefined, result.image as string)
  }

  private composeMessageWithHistory(message: string, history: ChatMessage[]): string {
    const historyText = history.map(msg => `${msg.role}: ${msg.content}`).join('\n')
    if (historyText) {
      return `${historyText}\nuser: ${message}`
    }
    return message
  }

  private wrapResponse(
    text: string,
    suggestionsText?: string,
    image?: string
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
    }
  }
}

export async function getChatHistory() {
  return sendToCloudFunction('history', {})
}

export async function getChatHistoryContent(historyFileName: string) {
  return sendToCloudFunction('historyChatContent', { historyFileName })
}
