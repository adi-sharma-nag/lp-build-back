import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Persona } from '../lib/personas/types'
import { personas } from '../lib/personas'

interface PersonaStore {
  personas: Persona[]
  selectedPersonaId: string | null
  addPersona: (persona: Persona) => void
  updatePersona: (id: string, updates: Partial<Persona>) => void
  deletePersona: (id: string) => void
  selectPersona: (id: string) => void
}

const migrate = (state: any) => {
  // Always use the latest personas from the source
  return {
    ...state,
    personas,
    selectedPersonaId: state.selectedPersonaId || personas[0]?.id
  }
}

export const usePersonaStore = create<PersonaStore>()(
  persist(
    (set) => ({
      personas,
      selectedPersonaId: personas[0]?.id || null,
      addPersona: (persona) => 
        set((state) => ({
          personas: [...state.personas, persona],
        })),
      updatePersona: (id, updates) => 
        set((state) => ({
          personas: state.personas.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deletePersona: (id) => 
        set((state) => ({
          personas: state.personas.filter((p) => p.id !== id),
          selectedPersonaId: state.selectedPersonaId === id ? null : state.selectedPersonaId,
        })),
      selectPersona: (id) => {
        const persona = personas.find(p => p.id === id)
        if (!persona) return
        set({ selectedPersonaId: id })
      },
    }),
    {
      name: 'persona-store',
      version: 1,
      migrate,
    }
  )
)