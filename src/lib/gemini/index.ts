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
