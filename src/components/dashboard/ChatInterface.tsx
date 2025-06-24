import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePersonaStore } from '../../stores/personaStore'
import { GeminiChat } from '../../lib/gemini'
import type { Message } from '../../types'
import Message from '../chat/Message'
import MessageInput from '../chat/MessageInput'
import ChatHeader from '../chat/ChatHeader'
import SuggestionsSidebar from './SuggestionsSidebar'
import PersonaSelector from './PersonaSelector'
import toast from 'react-hot-toast'

function ChatInterface() {
  const navigate = useNavigate()
  const { selectedPersonaId, selectPersona, personas } = usePersonaStore()
  const [activeView, setActiveView] = useState<'chat' | 'research'>('chat')
  
  // Get current persona with fallback
  const currentPersona = useMemo(() => {
    const selected = personas.find(p => p.id === selectedPersonaId)
    if (!selected) {
      console.warn('Selected persona not found, using default')
      return personas[0]
    }
    return selected
  }, [selectedPersonaId, personas])

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPersonaSelector, setShowPersonaSelector] = useState(false)

  // Scroll management
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [chat, setChat] = useState<GeminiChat | null>(null)

  // Initialize chat when persona changes
  useEffect(() => {
    if (!currentPersona) return
    const config = currentPersona.modelConfig
    if (!config) {
      console.error('Missing model config for persona:', currentPersona.id)
      return
    }
    const newChat = new GeminiChat(config)
    setChat(newChat)
  }, [currentPersona?.id])

  // Format messages for API
  const formattedMessages = useMemo(() => 
    messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    [messages]
  )

  // Initialize chat with greeting
  useEffect(() => {
    if (!currentPersona) return
    setMessages([])
    setSuggestions([])
    
    // Add greeting after a small delay
    setTimeout(() => {
      if (!currentPersona.greeting) return
      
      setMessages([{
        id: crypto.randomUUID(),
        content: currentPersona.greeting as string,
        sender: 'persona',
        timestamp: new Date()
      }])
    }, 100)
  }, [currentPersona?.id, currentPersona?.greeting]) // Reset when persona or greeting changes

  // Scroll handling
  const scrollToBottom = useCallback((smooth = true) => {
    if (!messagesContainerRef.current) return
    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    })
  }, [])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 100)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom()
    }
  }, [messages, isAtBottom, scrollToBottom])

  // Message handling
  const handleSend = useCallback(async (message: string) => {
    if (isProcessing || !currentPersona || !chat) return

    // Clear previous suggestions while processing new message
    setSuggestions([])

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)

    try {
      const response = await chat.chat(
        message,
        formattedMessages,
        currentPersona.id
      )

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: response.content,
        sender: 'persona',
        timestamp: new Date(),
        metadata: {
          thoughts: response.metadata?.thoughts,
        },
      }
      setMessages(prev => [...prev, assistantMessage])
      if (response.suggestions) {
        setSuggestions(response.suggestions)
      }
    } catch (error) {
      console.error('Failed to process message:', error)
      toast.error('Failed to get response. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, currentPersona, chat, formattedMessages])

  const handleImageUpload = useCallback(async (imageData: string) => {
    if (isProcessing || !currentPersona) return
    setIsProcessing(true)
    setSuggestions([])

    try {
      // Add user message with image
      const userMessage: Message = {
        id: crypto.randomUUID(),
        content: "Could you analyze this image and share your thoughts?",
        sender: 'user',
        timestamp: new Date(),
        image: imageData
      }
      setMessages(prev => [...prev, userMessage])

      // Process image
      const imageChat = new GeminiChat(currentPersona.modelConfig)
      const response = await imageChat.analyzeImage(imageData)

      const analysisMessage: Message = {
        id: crypto.randomUUID(),
        content: response.content,
        sender: 'persona',
        timestamp: new Date(),
        metadata: response.metadata
      }
      setMessages(prev => [...prev, analysisMessage])

      if (response.image) {
        const imageMessage: Message = {
          id: crypto.randomUUID(),
          content: 'Here is a new image based on your input.',
          sender: 'persona',
          timestamp: new Date(),
          image: response.image,
        }
        setMessages(prev => [...prev, imageMessage])
      }
    } catch (error) {
      console.error('Failed to analyze image:', error)
      toast.error('Failed to analyze image. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, currentPersona])

  // Handle persona selection
  const handlePersonaSelect = useCallback((persona: typeof currentPersona) => {
    selectPersona(persona.id)
    setShowPersonaSelector(false)
  }, [selectPersona])

  if (!currentPersona || !chat) return null

  return (
    <div className="h-[100dvh] flex bg-white overflow-hidden fixed inset-0"> 
      {activeView === 'chat' ? (
        <>
      {/* Left Sidebar */}
      <div className="hidden sm:flex w-80 border-r border-gray-200 bg-gray-50 flex-col">
        <SuggestionsSidebar
          messages={messages}
          suggestions={suggestions}
          isLoading={isProcessing}
          onSuggestionClick={handleSend}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          name={currentPersona.name}
          role={currentPersona.role}
          persona={currentPersona}
          onHome={() => navigate('/')}
          onResearch={() => setActiveView('research')}
          onPersonaSelect={() => setShowPersonaSelector(true)}
        />

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hidden px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-b from-gray-50 to-white relative z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-transparent" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                sender={message.sender}
                timestamp={message.timestamp}
                image={message.image}
                metadata={message.metadata}
                persona={message.sender === 'persona' ? currentPersona : undefined}
                name={message.sender === 'persona' ? currentPersona.name : undefined}
              />
            ))}
            {isProcessing && (
              <div className="flex items-center gap-3">
                <img 
                  src={currentPersona.avatar}
                  alt={`${currentPersona.name} avatar`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
                />
                <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg backdrop-blur-sm border border-gray-200">
                  <span className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary-300 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-primary-300 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <MessageInput
          className="relative z-[40] flex-shrink-0 safe-bottom"
          onSend={handleSend}
          onImageUpload={handleImageUpload}
          isTyping={isProcessing}
          messages={messages}
          lastMessage={messages[messages.length - 1]?.content}
          suggestions={suggestions}
        />

        {/* Persona Selector */}
        <div className={`fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          showPersonaSelector ? 'translate-x-0' : 'translate-x-full'
        } z-[150] safe-bottom`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Select Persona</h2>
                <button
                  onClick={() => setShowPersonaSelector(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600">Choose a persona to chat with. Each persona has a unique style.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <PersonaSelector
                selectedId={currentPersona.id}
                onSelect={handlePersonaSelect}
              />
            </div>
          </div>
        </div>

        {/* Overlay */}
        {showPersonaSelector && (
          <div
            className="fixed inset-0 right-[400px] bg-black/20 backdrop-blur-sm transition-opacity z-[45]"
            onClick={() => setShowPersonaSelector(false)}
          />
        )}
      </div>
      </>
      ) : (
        <PersonaSelector selectedId ={currentPersona.id} onSelect = {handlePersonaSelect} />
      )}
    </div>
  )
}
export default ChatInterface