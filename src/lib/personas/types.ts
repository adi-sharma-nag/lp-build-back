import type { ModelConfig } from '../gemini/types'

export interface PersonaTrait {
  name: string
  value: number
}

export interface PersonaVoice {
  style: 'casual' | 'formal' | 'technical' | 'playful'
  examples: string[]
  vocabulary: string[]
  speechPatterns: string[]
}

export interface Persona {
  id: string
  name: string
  role: string
  avatar: string
  description: string
  traits: Record<string, number>
  values: string[]
  voice: PersonaVoice
  background: string
  knowledgeBase: string[]
  systemPrompt: string
  modelConfig: ModelConfig
  greeting?: string
  config?: {
    temperature: number
    topP: number
    topK: number
    maxOutputTokens: number
  }
}