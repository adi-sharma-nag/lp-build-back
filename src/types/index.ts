// Unified type system for personas/characters
export interface Persona {
  id: string
  name: string
  shortBio: string
  role: string
  avatar: string
  background: string
  occupation: string
  interests: string[]
  values: string[]
  traits: Record<string, number>
  voice: {
    style: 'casual' | 'formal' | 'technical' | 'playful'
    examples: string[]
    vocabulary: string[]
    speechPatterns: string[]
  }
  greeting: string
  knowledgeBase: string[]
  createdAt: Date
  updatedAt: Date

export interface ConversationContext {
  environment: {
    formality: number
    privacy: number
    stressLevel: number
  }
  socialContext: {
    relationship: string
    powerDynamic: number
    groupSize: number
  }
  emotionalState: {
    valence: number
    arousal: number
    dominance: number
  }
}

export interface Message {
  id: string
  content: string
  sender: 'user' | 'persona'
  timestamp: Date
  metadata?: {
    emotion?: string
    confidence?: number
    context?: Partial<ConversationContext>
  }
}