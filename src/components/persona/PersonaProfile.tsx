import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, Heart, MessageSquare, Sparkles, Target } from 'lucide-react'
import type { Persona } from '../../lib/personas/types'

interface PersonaProfileProps {
  persona: Persona
  isOpen: boolean
  onClose: () => void
  hideInput?: boolean
}

export default function PersonaProfile({ persona, isOpen, onClose, hideInput = false }: PersonaProfileProps) {
  if (!persona) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="relative w-full max-w-[640px] max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative h-32 sm:h-40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm hover:scale-105 z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Avatar */}
            <div className="relative -mt-16 sm:-mt-20 px-6 sm:px-8">
              <img
                src={persona.avatar}
                alt={persona.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-xl object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 pt-4 space-y-6 overflow-y-auto max-h-[calc(85vh-12rem)]">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{persona.name}</h2>
                <p className="text-gray-500">{persona.role}</p>
              </div>

              <p className="text-gray-600">{persona.description}</p>

              <div className="grid gap-6">
                {/* Traits Section */}
                <Section
                  icon={<Brain className="w-5 h-5 text-indigo-600" />}
                  title="Key Traits"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(persona.traits || {}).map(([trait, value], index) => (
                      <div key={trait} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{trait}</span>
                          <span className="text-gray-500 tabular-nums">
                            {Math.round(value * 100)}%
                          </span>
                        </div>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden shadow-sm">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                            style={{ width: `${value * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Values Section */}
                <Section
                  icon={<Heart className="w-5 h-5 text-indigo-600" />}
                  title="Values & Interests"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {(persona.values || []).map((value) => (
                      <span
                        key={value}
                        className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm hover:bg-indigo-100 transition-colors"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </Section>

                {/* Communication Style */}
                <Section
                  icon={<MessageSquare className="w-5 h-5 text-indigo-600" />}
                  title="Communication Style"
                >
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      {persona.voice?.style || 'Natural'} communication style
                    </p>
                    {persona.voice?.examples?.length > 0 && (
                      <div className="mt-2 p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-xl text-sm text-gray-600 italic border border-indigo-100/20">
                        "{persona.voice.examples[0]}"
                      </div>
                    )}
                  </div>
                </Section>

                {/* Knowledge Areas */}
                <Section
                  icon={<Sparkles className="w-5 h-5 text-indigo-600" />}
                  title="Knowledge Areas"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {(persona.knowledgeBase || []).map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm hover:bg-purple-100 transition-colors"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </Section>

                {/* Background */}
                <Section
                  icon={<Target className="w-5 h-5 text-indigo-600" />}
                  title="Background"
                >
                  <p className="text-gray-600">{persona.background}</p>
                </Section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Section({ 
  icon, 
  title, 
  children 
}: { 
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  )
}