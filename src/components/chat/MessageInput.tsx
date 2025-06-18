import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Send, X, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface MessageInputProps {
  onSend: (message: string) => void
  onImageUpload: (imageData: string) => void
  isTyping: boolean
  lastMessage?: string
  messages?: Array<{ sender: string }>
  suggestions?: string[]
  className?: string
}

function MessageInput({ onSend, onImageUpload, isTyping, lastMessage, messages = [], suggestions = [], className = '' }: MessageInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resizeObserver = useRef<ResizeObserver>()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Only accept images
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      onImageUpload(imageData)
    }
    reader.readAsDataURL(file)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Only show suggestions after persona messages
  const shouldShowSuggestions = lastMessage && messages?.length > 0 && messages[messages.length - 1]?.sender === 'persona'

  // Auto-resize textarea
  useEffect(() => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    
    const resize = () => {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }

    textarea.addEventListener('input', resize)
    window.addEventListener('resize', resize)

    // Initial resize
    resize()

    // Cleanup
    return () => {
      textarea.removeEventListener('input', resize)
      window.addEventListener('resize', resize)
    }
  }, [])

  // Update loading state when new suggestions arrive
  useEffect(() => {
    if (shouldShowSuggestions) {
      setIsLoadingSuggestions(false)
    } else {
      setIsLoadingSuggestions(false)
    }
  }, [suggestions, shouldShowSuggestions])

  // Duplicate suggestions array for seamless loop
  const displaySuggestions = [...suggestions, ...suggestions]

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isTyping) return
    onSend(inputValue)
    setInputValue('')
  }, [inputValue, isTyping, onSend])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  const handleSuggestionClick = async (suggestion: string, event: React.MouseEvent) => {
    // Animate out current suggestions
    setShowSuggestions(false)
    setScrollPosition(0) // Reset scroll position

    // Send message
    onSend(suggestion)
    // Wait a moment before showing new suggestions from parent
    setTimeout(() => {
      setIsLoadingSuggestions(false)
      setShowSuggestions(true)
    }, 300)
  }

  return (
    <div className={`px-4 sm:px-6 py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm sticky bottom-0 shadow-lg z-[100] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent" aria-hidden="true" />
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <div className="relative max-w-3xl mx-auto flex items-center gap-2 sm:gap-4 mt-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isTyping}
          className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Upload image"
        >
          <ImageIcon className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              aria-label="Message input"
              className="w-full bg-gray-50 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-300 border border-gray-200 hover:border-primary-300/50 transition-all text-sm sm:text-base translate-z-0"
              rows={1}
              style={{
                minHeight: '44px',
                maxHeight: '120px'
              }}
              enterKeyHint="send"
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          className="p-4 bg-gradient-to-r from-primary-300 to-primary-400 rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-95 shadow-lg hover:shadow-xl hover:shadow-primary-300/20 active:scale-95 active:shadow-md"
          aria-label="Send message"
          style={{ touchAction: 'manipulation' }}
        >
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

export default MessageInput