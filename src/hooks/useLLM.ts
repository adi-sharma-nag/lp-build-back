import { useState, useCallback, useEffect } from 'react'
import { usePersona } from './usePersona'
import type { Message } from '../types'
import toast from 'react-hot-toast'

export function useLLM(personaId: string) {
  const { persona, chat, isInitialized } = usePersona(personaId)
  const [isProcessing, setIsProcessing] = useState(false)
  const [history, setHistory] = useState<Message[]>([])

  useEffect(() => {
    if (persona?.greeting && history.length === 0) {
      setHistory([{
        id: crypto.randomUUID(),
        content: persona.greeting,
        sender: 'persona',
        timestamp: new Date()
      }])
    }
  }, [persona, history.length])

  const processMessage = useCallback(async (
    message: string
  ): Promise<Message> => {
    setIsProcessing(true)
    
    try {
      const formattedHistory = history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))

      const response = await chat(message, formattedHistory)
      
      const newMessage: Message = {
        id: crypto.randomUUID(),
        content: response.content,
        sender: 'persona',
        timestamp: new Date(),
        metadata: response.metadata
      }

      setHistory(prev => [...prev, newMessage])
      return newMessage
    } catch (error) {
      console.error('Failed to process message:', error)
      toast.error('Failed to process message')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }, [chat, history])

  return {
    processMessage,
    isProcessing,
    isInitialized,
    history
  }
}