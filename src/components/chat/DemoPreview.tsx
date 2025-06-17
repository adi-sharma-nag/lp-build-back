import { useState } from 'react'
import Message from './Message'
import { Send, Gamepad } from 'lucide-react'

interface DemoPreviewProps {
  onStartQuiz: () => void
}

function DemoPreview({ onStartQuiz }: DemoPreviewProps) {
  const [inputValue, setInputValue] = useState('')

  return (
    <section id="demo" className="w-full relative overflow-hidden bg-gradient-to-br from-white via-primary-100/5 to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gray-50/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 to-transparent" />
      <div className="px-6 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent py-2">
                Experience Immersive Empathy Building
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Chat with representations of real emerging market segments to build your audience insights.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
              <div className="p-4 border-b border-gray-100/50 flex items-center gap-3 bg-gradient-to-r from-white/90 to-white/80">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
                    alt="Avery"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                    <Gamepad className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Digital Native Consumer</h3>
                  <p className="text-sm text-gray-500">High-Value Market Segment</p>
                </div>
                <div className="ml-auto px-3 py-1 rounded-full bg-primary-50 text-primary-400 text-sm font-medium">
                  Data Driven Model
                </div>
              </div>
              
              <div className="h-[400px] p-4 space-y-4 overflow-y-auto scrollbar-hidden">
                <Message
                  sender="persona"
                  content="Hey! been grinding valorant all week, totally get the competitive scene rn. the meta's wild after the last patch. what's your take on the current state of FPS?"
                />
                <Message
                  sender="user"
                  content="What makes competitive gaming so appealing to your generation?"
                />
                <Message
                  sender="persona"
                  content="fr fr, it's not just about the game itself. it's like, we grew up with esports being actual careers, you feel me? plus the whole community vibe - twitch chat, discord servers, sharing clips... it's where we connect and build our own culture. the grind hits different when you're doing it with your people 💯"
                />
              </div>
              
              <div className="p-4 border-t border-[#2A2A2A]">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value)
                      onStartQuiz()
                    }}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 border border-gray-200 hover:border-primary-300/50 transition-all"
                  />
                  <button 
                    onClick={onStartQuiz}
                    className="p-3 bg-gradient-to-r from-primary-300 to-primary-400 rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg hover:shadow-xl hover:shadow-primary-300/20"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoPreview