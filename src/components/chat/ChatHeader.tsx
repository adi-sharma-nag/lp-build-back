import { Users, Home, BarChart } from 'lucide-react'
import { useState } from 'react'
import PersonaProfile from '../persona/PersonaProfile'
import { personas } from '../../lib/personas'

interface ChatHeaderProps {
  name: string
  role: string
  persona: Persona
  onHome: () => void
  onResearch?: () => void
  isOnline?: boolean
  onPersonaSelect?: () => void
  rightContent?: React.ReactNode
}

function ChatHeader({ name, role, persona, onHome, onResearch, isOnline = true, onPersonaSelect, rightContent }: ChatHeaderProps) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
    <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-200 bg-white/95 backdrop-blur-sm flex items-center gap-3 sm:gap-4 shadow-sm flex-shrink-0 sticky top-0 z-50">
      <button 
        onClick={onHome}
        className="shrink-0 p-2 sm:px-5 sm:py-3 flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-secondary-300/5 hover:bg-secondary-300/10 text-gray-700 hover:text-gray-900 transition-all font-medium text-sm sm:text-base border border-gray-200/50 hover:border-gray-300/50 shadow-sm active:scale-95 active:bg-secondary-300/20"
        title="Back to Home"
        style={{ touchAction: 'manipulation' }}
      >
        <Home className="w-5 h-5" />
        <span className="hidden sm:inline">Home</span>
      </button>
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <button 
          onClick={() => setShowProfile(true)}
          className="relative group shrink-0"
        >
          <img 
            src={persona.avatar}
            alt={name}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-all duration-300 bg-gray-100"
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-400 border-2 border-white" />
          )}
        </button>
        <button 
          onClick={() => setShowProfile(true)}
          className="text-left group min-w-0"
        >
          <h2 className="font-semibold text-lg sm:text-xl text-gray-900 truncate" title={name}>{name}</h2>
          <p className="text-sm sm:text-base text-gray-500 truncate" title={role}>{role}</p>
        </button>
      </div>
      <div className="flex items-center gap-2">
        {rightContent}
        {onResearch && (
          <button 
            onClick={onResearch}
            className="shrink-0 p-2 sm:px-5 sm:py-3 flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-secondary-300/5 hover:bg-secondary-300/10 text-gray-700 hover:text-gray-900 transition-all font-medium text-sm sm:text-base border border-gray-200/50 hover:border-primary-300/50 shadow-sm active:scale-95 active:bg-secondary-300/20"
            title="View Research"
            style={{ touchAction: 'manipulation' }}
          >
            <BarChart className="w-5 h-5" />
            <span className="hidden sm:inline">Research</span>
          </button>
        )}
        <button 
          onClick={onPersonaSelect}
          className="shrink-0 p-2 sm:px-5 sm:py-3 flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 text-white hover:from-primary-500 hover:to-primary-600 transition-all font-medium text-sm sm:text-base shadow-sm hover:shadow-md active:scale-95 active:shadow-sm"
          title="Change Persona"
          style={{ touchAction: 'manipulation' }}
        >
          <Users className="w-5 h-5" />
          <span className="hidden sm:inline">Select Persona</span>
        </button>
      </div>
    </div>

    <PersonaProfile
      persona={persona}
      isOpen={showProfile}
      onClose={() => setShowProfile(false)}
      hideInput={false}
    />
    </>
  )
}

export default ChatHeader