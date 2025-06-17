import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import type { Persona } from '../types'
import { PersonaAgent } from '../lib/llm/agents/PersonaAgent'
import { usePersonaStore } from '../stores/personaStore'

export function usePersona(personaId?: string) {
  const { personas, addPersona, updatePersona } = usePersonaStore()
  const [agent, setAgent] = useState<PersonaAgent | null>(null)

  const persona = personaId ? personas.find(p => p.id === personaId) : null

  const savePersona = useCallback(async (data: Omit<Persona, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPersona: Persona = {
      ...data,
      id: persona?.id || crypto.randomUUID(),
      createdAt: persona?.createdAt || new Date(),
      updatedAt: new Date()
    }
    
    if (persona) {
      updatePersona(persona.id, newPersona)
    } else {
      addPersona(newPersona)
    }

    // Initialize agent with new persona data
    const newAgent = new PersonaAgent(newPersona)
    setAgent(newAgent)

    return newPersona
  }, [persona, addPersona, updatePersona])

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
    persona,
    savePersona,
    chat,
    isInitialized: !!agent
  }
}