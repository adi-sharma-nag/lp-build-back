import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CharacterCard } from '../types/character'

interface CharacterStore {
  characters: CharacterCard[]
  addCharacter: (character: CharacterCard) => void
  updateCharacter: (id: string, updates: Partial<CharacterCard>) => void
  deleteCharacter: (id: string) => void
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      characters: [],
      addCharacter: (character) =>
        set((state) => ({
          characters: [...state.characters, character],
        })),
      updateCharacter: (id, updates) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === id ? { ...char, ...updates } : char
          ),
        })),
      deleteCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((char) => char.id !== id),
        })),
    }),
    {
      name: 'character-store',
    }
  )
)