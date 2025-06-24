import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const setCredentials = useAuthStore(state => state.setCredentials)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCredentials(username, password)
    navigate('/app')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded">
        <h1 className="text-xl font-semibold">Login</h1>
        <input
          className="border p-2 rounded w-64"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded w-64"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 rounded"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
