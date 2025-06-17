import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SuggestionsService } from '../../lib/suggestions'
import type { Message } from '../../types'
import { MessageSquare } from 'lucide-react'

interface SuggestionsSidebarProps {
  messages: Message[]
  onSuggestionClick: (suggestion: string) => void
}

const suggestionsService = new SuggestionsService()

export default function SuggestionsSidebar({ messages, onSuggestionClick }: SuggestionsSidebarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const lastMessage = messages[messages.length - 1]

  useEffect(() => {
    let mounted = true
    
    const loadSuggestions = async () => {
      if (!lastMessage || lastMessage.sender === 'user') {
        setSuggestions([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const newSuggestions = await suggestionsService.getSuggestions(lastMessage.content)
        if (mounted) {
          setSuggestions(newSuggestions)
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadSuggestions()
    return () => { mounted = false }
  }, [lastMessage])

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-5 h-5 text-primary-400" />
          <h2 className="font-medium text-gray-900">Follow-up Questions</h2>
        </div>
        <p className="text-sm text-gray-500">
          Explore deeper insights with AI-suggested follow-up questions
        </p>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-400/40 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-primary-400/40 animate-pulse [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-primary-400/40 animate-pulse [animation-delay:0.4s]" />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="w-full p-4 text-left rounded-xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary-300/30 transition-all shadow-sm hover:shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                >
                  <p className="text-gray-900 text-sm font-medium">{suggestion}</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}