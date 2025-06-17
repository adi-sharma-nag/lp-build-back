import { useState, useEffect } from 'react'
import { Sparkles, X } from 'lucide-react'

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void
  context?: string // Last message content for context-aware suggestions
}

// Initial prompt categories with examples
const PROMPT_CATEGORIES = {
  'Shopping Behavior': [
    'How do you research products before buying?',
    'What makes you trust a brand?',
    'Tell me about your last impulse purchase',
  ],
  'Digital Culture': [
    'How does TikTok influence your shopping?',
    'What social media trends are you following?',
    'How do you discover new brands?',
  ],
  'Values & Ethics': [
    'What sustainability practices matter to you?',
    'How important is brand authenticity?',
    'What makes you loyal to a brand?',
  ],
  'Lifestyle': [
    "What's your typical shopping routine?",
    "How do you balance online and in-store shopping?",
    "What's your approach to fashion trends?",
  ]
}

function SuggestedPrompts({ onSelectPrompt, context }: SuggestedPromptsProps) {
  const [prompts, setPrompts] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // In a real implementation, this would call an LLM to generate contextual prompts
    // For now, we'll randomly select from our predefined categories
    const allPrompts = Object.values(PROMPT_CATEGORIES).flat()
    const randomPrompts = allPrompts
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    setPrompts(randomPrompts)
  }, [context])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="absolute -top-12 left-4 px-3 py-1.5 text-sm bg-white rounded-t-lg shadow-sm border border-gray-200 text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Show suggestions
      </button>
    )
  }

  return (
    <div className="absolute -top-20 left-0 right-0 flex items-center gap-2 overflow-x-auto py-2 px-4">
      <div className="flex items-center gap-2 min-w-0 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="px-4 py-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-white transition-all whitespace-nowrap text-sm"
          >
            {prompt}
          </button>
        ))}
        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SuggestedPrompts