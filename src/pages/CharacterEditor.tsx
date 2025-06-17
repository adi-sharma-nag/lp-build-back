import { useNavigate } from 'react-router-dom'
import CharacterCardEditor from '../components/character/CharacterCardEditor'
import { useCharacterCard } from '../hooks/useCharacterCard'
import type { CharacterCardFormData } from '../types/character'

export default function CharacterEditor() {
  const navigate = useNavigate()
  const { saveCard } = useCharacterCard()

  const handleSave = async (data: CharacterCardFormData) => {
    const card = await saveCard(data)
    navigate(`/chat/${card.id}`)
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <header className="border-b border-[#2A2A2A] p-4">
        <h1 className="text-2xl font-bold">Create New Character</h1>
      </header>

      <CharacterCardEditor onSave={handleSave} />
    </div>
  )
}