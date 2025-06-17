import { useState, useCallback } from 'react'
import { GeminiChat, type ChatMessage } from '../lib/gemini'
import toast from 'react-hot-toast'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const chat = useCallback(async (message: string) => {
    setIsProcessing(true)

    const systemPrompt = `You are Avery, a 23-year-old digital marketing professional. You're friendly, knowledgeable about digital trends, and speak naturally with occasional Gen Z expressions. Keep responses concise and authentic. First analyze the message and write your thoughts, then write your actual response.`

    try {
      const gemini = new GeminiChat(systemPrompt)
      const response = await gemini.chat(message, messages)

      const newMessage: ChatMessage = {
        role: 'assistant',
        content: response.content,
        metadata: {
          thoughts: response.metadata?.thoughts
        }
      }

      setMessages(prev => [...prev, newMessage])
      return newMessage
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to get response from Avery')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }, [messages])

  return {
    messages,
    isProcessing,
    chat,
    addMessage: (message: ChatMessage) => setMessages(prev => [...prev, message])
  }
}