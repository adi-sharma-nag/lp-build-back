import { useState, useCallback } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'

interface HeaderProps {
  onStartQuiz: () => void
}

function Header({ onStartQuiz }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleStartQuiz = useCallback(() => {
    setIsMenuOpen(false)
    onStartQuiz()
  }, [onStartQuiz])

  return (
    <header className="w-full transition-all duration-300">
      <nav className="px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a 
            href="https://www.nagarro.com/en/services/digital-insights"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <svg 
              className="w-48 h-12" 
              viewBox="100 280 850 250"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path className="fill-secondary-300" d="M427.2,417.2V351h16.4v10.8c2.5-3.9,6.2-7.1,10.4-9c5-2.4,10.5-3.5,16.1-3.5c13.5,0,21.6,4.7,24.4,14.1c1.1,3.5,1.6,8.3,1.6,14.5v39.2h-16.6V382c0-5.3-0.6-9.1-1.9-11.2c-2-4-6.5-6-13.3-6c-4,0-8,1-11.7,2.8c-3.5,1.5-6.5,4-8.6,7.2v42.4H427.2z"/>
              <path className="fill-secondary-300" d="M569.3,419.3c-8.3,0-13.3-2.8-15.2-8.5c-5.1,6.1-13.1,9.2-24.1,9.2c-8.4,0-15-1.9-19.6-5.7c-4.5-3.6-7.1-9.1-6.9-14.9c0-9.7,5-16,14.9-18.9c6.3-1.8,14.2-2.7,23.6-2.7c3.3,0,6.5,0.3,9.7,0.8v-2.1c0.1-2.8-0.9-5.6-2.7-7.7c-2.4-2.5-6.9-3.7-13.6-3.7c-10.5,0-19.1,2.6-25.9,7.9h-0.5V358c8.1-5.2,18.1-7.9,30-7.9c9.6,0,16.8,1.8,21.6,5.5c2.6,2,4.6,4.6,5.8,7.7c1.2,3.1,1.8,7.2,1.8,12.5c0,1.6,0,4.5-0.1,8.6c0,4.1-0.1,7-0.1,8.7c0,4.9,0.2,7.8,0.7,8.8c0.7,1.9,2.5,2.8,5.3,2.8c1.8,0,3.6-0.2,5.3-0.8v13.6C577,418.7,573.6,419.3,569.3,419.3z M551.8,390.8c-3.2-0.5-6.4-0.7-9.6-0.7c-4.7-0.1-9.3,0.3-13.8,1.3c-5.2,1.2-7.9,3.7-7.9,7.7c0,5.3,4.3,8,13,8c8.2,0,14.3-2.4,18.4-7.3C551.8,398.1,551.8,395.1,551.8,390.8z"/>
              <path className="fill-secondary-300" d="M589.7,422.6h0.5c7.7,5.7,17.6,8.5,29.6,8.5c9.3,0,16-2.1,19.9-6.3c2.7-2.8,4-7.4,4-13.9v-4.9c-1.9,3.1-5.1,5.7-9.7,7.9c-5,2.2-10.3,3.3-15.8,3.2c-10.6,0-19.2-2.7-26-8.1c-6.8-5.4-10.2-13.3-10.2-23.7c-0.1-5.6,1-11.2,3.4-16.3c2-4.4,5.1-8.2,9.1-11.1c3.6-2.6,7.7-4.6,11.9-5.9c4.2-1.3,8.5-1.9,12.9-1.9c5.3-0.1,10.5,0.9,15.5,2.8c4.6,1.9,7.7,4.2,9.2,7.1v-8h16v58.1c0,9.4-1.7,16.7-5.2,21.9c-6.2,9.1-17.9,13.7-34.9,13.7c-6,0.1-12-0.6-17.8-2c-5.3-1.3-9.4-3-12.3-4.9L589.7,422.6z M643.2,374.6c-1.7-3.3-4.6-6-8.1-7.5c-4-1.8-8.4-2.7-12.9-2.7c-5.9-0.2-11.6,1.6-16.4,5.1c-4.5,3.4-6.8,8.5-6.8,15.3c0,5.9,2.2,10.3,6.7,13.3c4.8,3.1,10.5,4.7,16.2,4.6c4.4,0,8.8-0.9,12.8-2.7c3.5-1.4,6.4-3.9,8.4-7.2L643.2,374.6z"/>
              <path className="fill-secondary-300" d="M733.2,419.3c-8.3,0-13.3-2.8-15.2-8.5C713,416.9,705,420,694,420c-8.4,0-15-1.9-19.6-5.7c-4.5-3.6-7.1-9.1-6.9-14.9c0-9.7,5-16,14.9-18.9c6.3-1.8,14.2-2.7,23.6-2.7c3.3,0,6.5,0.3,9.7,0.8v-2.1c0.1-2.8-0.8-5.6-2.7-7.7c-2.4-2.5-6.9-3.7-13.6-3.7c-10.5,0-19.1,2.6-25.8,7.9H673v-15c8.1-5.2,18.1-7.9,30-7.9c9.6,0,16.8,1.8,21.6,5.5c2.6,2,4.6,4.6,5.8,7.7c1.2,3.1,1.8,7.2,1.8,12.5c0,1.6,0,4.5-0.1,8.6s-0.1,7-0.1,8.7c0,4.9,0.2,7.8,0.7,8.8c0.7,1.9,2.5,2.8,5.3,2.8c1.8,0,3.6-0.2,5.3-0.8v13.6C740.9,418.7,737.5,419.3,733.2,419.3z M715.7,390.8c-3.2-0.5-6.4-0.7-9.6-0.7c-4.7-0.1-9.3,0.3-13.8,1.3c-5.2,1.2-7.9,3.7-7.9,7.7c0,5.3,4.3,8,13,8c8.2,0,14.3-2.4,18.4-7.3C715.7,398.1,715.7,395.1,715.7,390.8z"/>
              <path className="fill-secondary-300" d="M750.7,418.2V352h16.4v11.2c1.2-3.3,3.8-6.3,7.6-8.9c4.1-2.8,9-4.2,14-4c3.9,0,6.9,0.6,9.1,1.9v16.6h-0.5c-3.2-1.4-6.6-2.1-10.1-2c-4.4-0.1-8.7,0.7-12.7,2.6c-3.1,1.4-5.6,4-6.9,7.1v41.7L750.7,418.2z"/>
              <path className="fill-secondary-300" d="M805.5,418.2V352h16.4v11.2c1.3-3.3,3.8-6.3,7.6-8.9c4.1-2.8,9-4.2,14-4c3.9,0,6.9,0.6,9.1,1.9v16.6H852c-3.2-1.4-6.6-2.1-10.1-2c-4.4-0.1-8.7,0.7-12.7,2.6c-3.1,1.4-5.6,4-6.9,7.1v41.7L805.5,418.2z"/>
              <path className="fill-secondary-300" d="M920.1,410.1c-7.2,6.6-16.5,9.9-28,9.9c-11.5,0-20.8-3.2-27.9-9.7c-7.1-6.5-10.6-14.9-10.6-25.2c0-10.3,3.6-18.7,10.9-25.1c7.2-6.5,16.6-9.8,28-9.8c11.8,0,21.1,3.2,28,9.6s10.4,14.8,10.3,25.3C930.9,395.2,927.3,403.5,920.1,410.1z M908.2,370.5c-4-3.8-9.1-5.7-15.8-5.7s-11.8,1.9-16,5.7c-4.1,3.7-6.4,9-6.2,14.5c-0.2,5.6,2.1,10.9,6.3,14.6c4.2,3.7,9.4,5.5,15.8,5.5c6.6,0,11.7-1.9,15.8-5.7c4-3.7,6.2-9,6-14.4C914.3,379.6,912.2,374.3,908.2,370.5L908.2,370.5z"/>
              <path className="fill-primary-300" d="M285.5,488.7c-26.7,0-60.7-17.3-90.3-46.4c-1.3,3.7-2.9,7.3-4.6,10.8c-10.2,20.8-24.9,32.2-41.3,32.2s-31.3-11.2-41.7-31.5c-9.5-18.5-14.7-43.4-14.7-70c0-43.3,14.3-79.9,37.4-95.4c16-10.8,36.1-12.1,58.2-3.9c18.7,6.9,38.9,20.8,58.7,40.4c1.8-4.7,3.9-9.3,6.4-13.7c10.4-18.4,24.9-28.5,40.8-28.5c31.7,0,55.6,43.5,55.6,101.2c0,25-4.6,48-13.2,66.5c-3.8,8.4-8.9,16-15.1,22.7c-5.5,6-12.4,10.5-20.1,13.2C296.3,488,291,488.8,285.5,488.7z M199.4,429c37.2,39,77.2,52.6,98.3,45.6c10.8-3.6,20.7-14,27.9-29.4c7.9-16.8,12-38,12-61.2c0-24.6-4.7-47.4-13.3-64.2c-8.1-15.9-18.7-24.6-29.9-24.6c-16.1,0-30.1,16.1-37.6,39.9c30,33,49.7,73.5,48,99.4c-0.6,9.3-4,16.7-9.8,21.4l-0.5,0.4c-6.4,4.3-13.9,4.5-21.2,0.6c-19.1-10.2-34.6-47.3-34.6-82.7c0-12,1.4-24,4.2-35.7c-40.6-42.2-79.9-57-105.8-39.6c-19.4,13.1-31.9,46.5-31.9,85.2c0,50,19.3,89.1,44,89.1c15.4,0,28.7-16,36.3-40.7c-19.9-22.1-34.8-46.8-42.2-69.7c-7.3-22.4-6.4-40.5,2.2-49.6c5.6-5.9,13.9-7.3,22.7-3.8c18.2,7.3,36.6,34.9,36.6,73.4C205,398.3,203.2,413.9,199.4,429z M253.3,349.7c-1.4,8-2.1,16.2-2.1,24.4c0,33.5,14.8,64.7,28,71.8c4,2.1,6.5,1.3,8.2,0.2c3-2.5,4.6-6.7,5-12.5C293.9,412.6,277.7,378.7,253.3,349.7L253.3,349.7z M159.1,319.7c-1.7-0.1-3.4,0.6-4.5,1.9c-4,4.1-6.2,16.4,0.6,37.2c6.2,19.1,18.2,39.8,34.2,58.9c2.2-11.5,3.3-23.3,3.2-35c0-36.7-17.7-57.4-28.8-61.9C162.3,320.1,160.7,319.8,159.1,319.7L159.1,319.7z"/>
            </svg>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <button
              onClick={onStartQuiz}
              className="group px-4 py-2 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary-300/10 hover:shadow-xl hover:shadow-primary-300/20"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg"
            >
              <div className="px-6 py-4 space-y-4">
                <a
                  href="#features"
                  className="block text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <button
                  onClick={handleStartQuiz}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-300/10 hover:shadow-xl hover:shadow-primary-300/20 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  )
}

export default Header