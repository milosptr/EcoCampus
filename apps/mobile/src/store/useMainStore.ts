import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Session } from '@supabase/supabase-js'

/**
 * User profile from the backend database
 */
export interface UserProfile {
  id: string
  authId: string
  email: string
  name: string | null
  avatarUrl: string | null
  onboardingCompleted: boolean
}

interface MainState {
  // Authentication state
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
  isCompletingLogin: boolean

  // User data from backend
  userProfile: UserProfile | null

  // Actions
  setSession: (session: Session | null) => void
  setUserProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  setAuthenticated: (authenticated: boolean) => void
  setCompletingLogin: (completing: boolean) => void
  reset: () => void
}

const initialState = {
  session: null,
  isAuthenticated: false,
  isLoading: true,
  isCompletingLogin: false,
  userProfile: null,
}

export const useMainStore = create<MainState>()(
  persist(
    (set) => ({
      ...initialState,

      setSession: (session) =>
        set({
          session,
          isAuthenticated: !!session,
        }),

      setUserProfile: (userProfile) => set({ userProfile }),

      setLoading: (isLoading) => set({ isLoading }),

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      setCompletingLogin: (isCompletingLogin) => set({ isCompletingLogin }),

      reset: () => set(initialState),
    }),
    {
      name: 'main-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist essential state (not session - that's handled by Supabase)
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userProfile: state.userProfile,
      }),
    }
  )
)
