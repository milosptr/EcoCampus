import { create } from 'zustand'

interface MainState {
  isAuthenticated: boolean
  setAuthenticated: (isAuthenticated: boolean) => void
  logout: () => void
}

export const useMainStore = create<MainState>((set) => ({
  isAuthenticated: false,

  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  logout: () => set({ isAuthenticated: false }),
}))
