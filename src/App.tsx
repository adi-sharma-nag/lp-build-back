import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Dashboard from './pages/Dashboard'
import AppHome from './pages/AppHome'
import Security from './pages/Security'
import ChatHistory from './pages/ChatHistory'
import Login from './pages/Login'
const Landing = lazy(() => import('./pages/Landing'))
import { Toaster } from 'react-hot-toast'

// Loading fallback
const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-white">
    <div className="space-y-4 text-center">
      <div className="flex items-center gap-2 justify-center">
        <div className="w-3 h-3 rounded-full bg-primary-300 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-primary-300 animate-bounce [animation-delay:0.2s]" />
        <div className="w-3 h-3 rounded-full bg-primary-300 animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  </div>
)

function App() {
  const navigate = useNavigate()

  const handleStartChat = () => {
    navigate('/login')
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <Landing onStartQuiz={handleStartChat} />
          </Suspense>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/security" element={<Security />} />
        <Route path="/history" element={<ChatHistory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
