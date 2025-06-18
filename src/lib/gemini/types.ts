// Types for Gemini API
export interface GenerationConfig {
  temperature: number
  topP: number
  topK: number
  maxOutputTokens: number
  candidateCount?: number
}

export interface SafetySettings {
  category: string
  threshold: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  content: string
  metadata?: {
    confidence?: number
    processingTime?: number
    thoughts?: string
  }
  suggestions?: string[]
}

export interface ModelConfig {
  modelId: string
  systemInstructions: string[]
  generationConfig: GenerationConfig
  safetySettings?: SafetySettings[]
  persona?: {
    id: string
    name: string
    role: string
    systemPrompt: string
  }
}

export interface MultiModalContent {
  text?: string
  inlineData?: {
    mimeType: string
    data: string
  }
}