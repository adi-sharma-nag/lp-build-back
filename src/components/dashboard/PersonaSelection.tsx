import { Brain, Users, Sparkles } from 'lucide-react'

export interface Persona {
  id: string
  name: string
  role: string
  description: string
  tagline: string
  background: string
  interests: string[]
  personality: string
  image: string
  traits: {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  }
}

export const personas: Persona[] = [
  {
    id: 'digital-native',
    name: 'Avery',
    role: 'Digital Native Consumer',
    tagline: '"always online, always evolving 💫"',
    description: 'Your window into Gen-Z culture and digital communities',
    background: '23-year-old digital marketing professional and hybrid shopping expert. Active in multiple online communities and early adopter of emerging platforms.',
    personality: 'Energetic, trend-aware, and authentically connected to digital culture. Speaks in current internet language and understands meme evolution.',
    interests: ['Competitive Gaming', 'TikTok Trends', 'Indie Music', 'Streetwear'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
    traits: {
      openness: 0.8,
      conscientiousness: 0.6,
      extraversion: 0.9,
      agreeableness: 0.7,
      neuroticism: 0.4
    }
  }
]

interface PersonaSelectionProps {
  onSelect: (personaId: string) => void
}

function PersonaSelection({ onSelect }: PersonaSelectionProps) {
  return (
    <div className="h-[calc(100vh-64px)] max-w-4xl mx-auto px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-transparent" />

      <div className="grid gap-6 h-full overflow-y-auto py-6">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onSelect(persona.id)}
            className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 hover:border-indigo-500/30 transition-all duration-500 text-left hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden hover:scale-[1.02] h-fit max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-64 overflow-hidden">
              <img 
                src={persona.image} 
                alt={persona.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-2xl text-gray-900 flex items-center gap-3">
                    {persona.name}
                  </h3>
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white text-sm font-medium shadow-lg backdrop-blur-sm border border-white/20">
                    {persona.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">{persona.tagline}</p>
              </div>
            </div>
            
            <div className="p-8 relative space-y-6">
              <div className="mb-6">
                <p className="text-gray-600">{persona.description}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Interests
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {persona.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-white text-xs font-medium text-gray-600 hover:text-indigo-600 border border-gray-200/50 hover:border-indigo-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Key Traits
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(persona.traits).map(([trait, value]) => (
                      <div key={trait} className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-gray-50 to-white overflow-hidden backdrop-blur-sm border border-gray-200/50">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:animate-pulse shadow-lg"
                            style={{ width: `${value * 100}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 min-w-[24px] font-medium tabular-nums">
                          {Math.round(value * 100)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PersonaSelection