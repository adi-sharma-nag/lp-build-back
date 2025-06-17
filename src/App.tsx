import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Dashboard from './pages/Dashboard'
import AppHome from './pages/AppHome'
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
    navigate('/app')
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <Landing onStartQuiz={handleStartChat} />
          </Suspense>
        } />
        <Route path="/app" element={<AppHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
