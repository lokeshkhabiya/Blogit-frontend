import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null, 
      login: (userData, token) => set({ isAuthenticated: true, user: userData, token: token}),
      logout: () => set({ isAuthenticated: false, user: null, token: null })
    }),
    {
      name: 'auth-storage',
    }
  )
)