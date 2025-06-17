import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { useCharacterCard } from '../hooks/useCharacterCard'
import ChatHeader from '../components/chat/ChatHeader'
import MessageInput from '../components/chat/MessageInput'
import Message from '../components/chat/Message'

export default function Chat() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { characters } = useCharacterStore()
  const character = characters.find((c) => c.id === id)
  const { chat, isInitialized } = useCharacterCard(character)
  
  const [messages, setMessages] = useState<Array<{
    role: string
    content: string
    timestamp: Date
  }>>([])
  
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!character) {
      navigate('/')
      return
    }
    
    // Add initial greeting
    if (messages.length === 0 && character.greeting) {
      setMessages([{
        role: 'assistant',
        content: character.greeting,
        timestamp: new Date()
      }])
    }
  }, [character, navigate])

  if (!character || !isInitialized) {
    return <div className="h-screen flex items-center justify-center bg-[#1A1A1A] text-white">
      <p>Loading...</p>
    </div>
  }

  const handleSend = async (content: string) => {
    const userMessage = {
      role: 'user',
      content,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      const response = await chat(content, messages)
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#1A1A1A] text-white">
      <ChatHeader
        name={character.name}
        role={character.background.occupation}
        avatar={character.avatar}
      />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, i) => (
          <Message
            key={i}
            content={message.content}
            sender={message.role === 'user' ? 'user' : 'persona'}
            timestamp={message.timestamp}
            avatar={message.role === 'user' ? undefined : character.avatar}
          />
        ))}
      </div>

      <MessageInput onSend={handleSend} isTyping={isTyping} />
    </div>
  )
}