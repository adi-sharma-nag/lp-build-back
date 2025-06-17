export interface CharacterTrait {
  name: string
  value: number // 0-1 scale
  description: string
}

export interface CharacterBackground {
  age?: number
  occupation: string
  background: string
  interests: string[]
  values: string[]
}

export interface CharacterVoice {
  style: 'casual' | 'formal' | 'technical' | 'playful'
  examples: string[]
  vocabulary: string[]
  speechPatterns: string[]
}

export interface CharacterCard {
  id: string
  name: string
  avatar: string
  shortBio: string
  traits: CharacterTrait[]
  background: CharacterBackground
  voice: CharacterVoice
  greeting: string
  knowledgeBase: string[]
  scenario?: string
  createdAt: Date
  updatedAt: Date
}

export type CharacterCardFormData = Omit<
  CharacterCard,
  'id' | 'createdAt' | 'updatedAt'
>