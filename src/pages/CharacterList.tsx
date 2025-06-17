import { useNavigate } from 'react-router-dom'
import { Plus, Settings } from 'lucide-react'
import { useCharacterStore } from '../stores/characterStore'

export default function CharacterList() {
  const navigate = useNavigate()
  const { characters } = useCharacterStore()

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <header className="border-b border-[#2A2A2A] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Characters</h1>
          <button
            onClick={() => navigate('/new')}
            className="px-4 py-2 bg-[#6C5CE7] rounded-lg hover:bg-[#5849e4] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Character
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map(character => (
            <div
              key={character.id}
              className="bg-[#2A2A2A] rounded-lg overflow-hidden border border-[#3A3A3A] hover:border-[#6C5CE7] transition-colors group"
            >
              <div className="aspect-square relative">
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/chat/${character.id}`)}
                      className="px-4 py-2 bg-[#6C5CE7] rounded-lg hover:bg-[#5849e4] transition-colors"
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${character.id}`)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{character.name}</h3>
                <p className="text-sm text-gray-400">{character.shortBio}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}