import React from 'react'
import { Menu, X, Settings, History, Users, ArrowLeft, UserCircle, ChevronLeft, ChevronRight, Sparkles, Home, BarChart } from 'lucide-react'
import { useState } from 'react'

const SIDEBAR_WIDTH = 280
const COLLAPSED_WIDTH = 80
const HEADER_HEIGHT = '64px'

interface DashboardLayoutProps {
  children: React.ReactNode
  showBackButton?: boolean
  onBack?: () => void
  activeTab: 'personas' | 'history' | 'chat'
  onTabChange: (tab: 'personas' | 'history' | 'chat') => void
}

function DashboardLayout({ 
  children, 
  showBackButton, 
  onBack,
  activeTab,
  onTabChange
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [contextPanelOpen, setContextPanelOpen] = useState(false)
  const [showFlow, setShowFlow] = useState(false)

  const getTabClasses = (tab: 'personas' | 'history' | 'chat') => {
    return `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      activeTab === tab
        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-medium shadow-sm'
        : 'hover:bg-gray-50 text-gray-500 hover:text-gray-900'
    }`
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ width: sidebarCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
      >
        <div className="h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg relative">
          <div className="h-[64px] px-4 border-b border-gray-200 flex items-center justify-between bg-white/80 backdrop-blur-sm">
              <span className={`text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'
              }`}>
                Living Personas
              </span>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
          </div>

          <nav className="p-4 space-y-2">
            <button
              onClick={() => onTabChange('home')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <Home className="w-5 h-5" />
              <span className={`transition-all duration-300 ${
                sidebarCollapsed ? 'hidden' : 'block'
              }`}>
                Home
              </span>
            </button>
            <button
              onClick={() => onTabChange('personas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <Users className="w-5 h-5" />
              <span className={`transition-all duration-300 ${
                sidebarCollapsed ? 'hidden' : 'block'
              }`}>
                Select Personas
              </span>
            </button>
            <button
              onClick={() => onTabChange('history')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <History className="w-5 h-5" />
              <span className={`transition-all duration-300 ${
                sidebarCollapsed ? 'hidden' : 'block'
              }`}>
                History
              </span>
            </button>
            <button
              onClick={() => onTabChange('research')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <BarChart className="w-5 h-5" />
              <span className={`transition-all duration-300 ${
                sidebarCollapsed ? 'hidden' : 'block'
              }`}>
                Research
              </span>
            </button>
          </nav>
          {/* Collapse Button */}
          <div className="absolute -right-3 top-24">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all duration-300 border-2 border-white"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button 
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <UserCircle className="w-5 h-5" />
              <span className={`transition-all duration-300 ${
                sidebarCollapsed ? 'hidden' : 'block'
              }`}>
                Profile
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-[64px] border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center px-4 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            {!showBackButton && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {activeTab === 'personas' ? 'Select Your Demographic Rep' : 'Chat History'}
            </h1>
          </div>

          <div className="flex-1" />
          
          <div className="flex items-center">
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-medium hover:from-indigo-100 hover:to-purple-100 transition-colors flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Upgrade</span>
            </button>
            <button 
              onClick={() => setShowFlow(!showFlow)}
              className={`p-2 rounded-xl transition-all duration-200 shadow-sm ${
                showFlow
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title="Flow Editor"
            >
              <Settings className={`w-5 h-5 transition-transform duration-200 ${
                showFlow ? 'rotate-180' : ''
              }`} />
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className={`flex-1 transition-all duration-300 ${
            showFlow ? 'mr-[600px]' : ''
          }`}>
            {children}
          </main>

          {/* Flow Editor Panel */}
          <div className={`fixed right-0 top-16 bottom-0 w-80 border-l border-gray-200 bg-white transform transition-transform duration-300 ease-in-out ${
            showFlow ? 'translate-x-0 !w-[600px]' : 'translate-x-full'
          }`}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0">
              <span className="font-medium text-gray-900">Agent Flow Editor</span>
              <button 
                onClick={() => setShowFlow(false)}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[calc(100%-65px)]">
              {showFlow && (
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900">Flow Editor</h2>
                  <p className="text-gray-500">Flow editor functionality coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout