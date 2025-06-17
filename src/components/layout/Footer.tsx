import { Home, MessageSquare, Brain } from 'lucide-react'

interface FooterProps {
  onStartQuiz: () => void
}

function Footer({ onStartQuiz }: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-gray-200 flex-shrink-0 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-row justify-between items-center">
          {/* Navigation Links */}
          <nav className="flex items-center gap-4">
            <a 
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <button
              onClick={onStartQuiz}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={onStartQuiz}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Brain className="w-4 h-4" />
              <span>Quiz</span>
            </button>
          </nav>

          {/* Logo & Copyright */}
          <div className="flex items-center gap-3 text-sm">
            <a
              href="https://www.nagarro.com/en/services/digital-insights"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Powered by Nagarro
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">© 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer