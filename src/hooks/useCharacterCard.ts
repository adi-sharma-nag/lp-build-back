import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import type { 
  CharacterCard, 
  CharacterCardFormData 
} from '../types/character'
import { PersonaAgent } from '../lib/llm/agents/PersonaAgent'

export function useCharacterCard(initialCard?: CharacterCard) {
  const [card, setCard] = useState<CharacterCard | null>(initialCard || null)
  const [agent, setAgent] = useState<PersonaAgent | null>(null)

  const saveCard = useCallback(async (data: CharacterCardFormData) => {
    // In production, this would call an API to save the card
    const newCard: CharacterCard = {
      ...data,
      id: card?.id || crypto.randomUUID(),
      createdAt: card?.createdAt || new Date(),
      updatedAt: new Date()
    }
    
    setCard(newCard)

    // Initialize agent with new card data
    const newAgent = new PersonaAgent({
      id: newCard.id,
      name: newCard.name,
      role: newCard.background.occupation,
      traits: newCard.traits.reduce((acc, trait) => ({
        ...acc,
        [trait.name]: trait.value
      }), {}),
      background: newCard.background.background,
      voice: newCard.voice
    })

    setAgent(newAgent)

    return newCard
  }, [card])

  const chat = useCallback(async (
    message: string,
    history: Array<{ role: string; content: string }> = []
  ) => {
    if (!agent) {
      throw new Error('Agent not initialized')
    }

    try {
      return await agent.chat(message, history)
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to process message')
      throw error
    }
  }, [agent])

  return {
    card,
    saveCard,
    chat,
    isInitialized: !!agent
  }
}