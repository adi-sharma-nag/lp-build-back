import { personas } from '../../lib/personas'
import type { Persona } from '../../lib/personas/types'

interface PersonaSelectorProps {
  selectedId?: string
  onSelect: (persona: Persona) => void
}

export default function PersonaSelector({ selectedId, onSelect }: PersonaSelectorProps) {
  return (
    <div className="space-y-3 p-6">
      {personas.map((persona) => (
        <button
          key={persona.id}
          onClick={() => onSelect(persona)}
          className={`w-full flex items-start gap-4 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] relative ${
            selectedId === persona.id
              ? 'bg-gradient-to-br from-primary-50 via-primary-100/50 to-transparent border-primary-300 shadow-lg shadow-primary-300/10 hover:shadow-xl hover:shadow-primary-300/20'
              : 'hover:bg-gray-50/80 border-gray-200 hover:border-primary-300/30'
          } border text-left relative group`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-primary-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          <div className="relative">
          <img
            src={persona.avatar}
            alt={persona.name}
            className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform"
          />
          </div>
          <div className="relative flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{persona.name}</h3>
              <span className="px-3 py-1 rounded-full bg-white text-primary-400 text-xs font-medium shadow-sm">
                {persona.role}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{persona.description}</p>
          </div>
        </button>
      ))}
      
      {/* Coming Soon Card */}
      <div className="w-full flex items-start gap-4 p-6 rounded-xl border border-dashed border-gray-200 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-primary-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
        <div className="relative">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-white shadow-lg flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
        </div>
        <div className="relative flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800">Your Audience Coming Soon</h3>
            <span className="px-3 py-1 rounded-full bg-gray-100/80 text-gray-500 text-xs font-medium shadow-sm">
              Coming Soon
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Contact us about building your high-value market personas today.
          </p>
        </div>
      </div>
    </div>
  )
}