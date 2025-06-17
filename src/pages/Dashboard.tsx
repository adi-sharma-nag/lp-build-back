import { useState } from 'react'
import ChatInterface from '../components/dashboard/ChatInterface'
import { usePersonaStore } from '../stores/personaStore'

function Dashboard() {
  const { selectedPersonaId } = usePersonaStore()
  const [activeView, setActiveView] = useState<'chat' | 'research'>('chat')

  return (
    <div className="h-screen bg-white">
      {activeView === 'chat' ? (
        <ChatInterface />
      ) : (
        < ChatInterface />
      )}
    </div>
  )
}

export default Dashboard