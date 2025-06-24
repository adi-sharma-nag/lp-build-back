import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  authHeader: string
  setCredentials: (username: string, password: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authHeader: '',
      setCredentials: (username, password) =>
        set({ authHeader: 'Basic ' + btoa(`${username}:${password}`) })
    }),
    {
      name: 'auth-store'
    }
  )
)
