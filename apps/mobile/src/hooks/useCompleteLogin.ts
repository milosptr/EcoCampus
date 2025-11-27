import { useCallback } from 'react'
import { trpc } from '../trpc'
import { useMainStore } from '../store/useMainStore'
import type { UserProfile } from '../store/useMainStore'

/**
 * Hook to complete the login flow after Supabase authentication
 * - Fetches/creates user profile from backend
 * - Stores user profile in local state
 * - Navigation happens automatically via the root layout guard
 *
 * @returns startLogin to call BEFORE Supabase auth, completeLogin to call AFTER
 */
export const useCompleteLogin = () => {
  const utils = trpc.useUtils()
  const setUserProfile = useMainStore((state) => state.setUserProfile)
  const setCompletingLogin = useMainStore((state) => state.setCompletingLogin)
  const setAuthenticated = useMainStore((state) => state.setAuthenticated)

  // Call this BEFORE initiating Supabase auth to prevent screen jumping
  const startLogin = useCallback(() => {
    setCompletingLogin(true)
  }, [setCompletingLogin])

  // Call this AFTER Supabase auth succeeds to fetch user profile
  const completeLogin = useCallback(async () => {
    try {
      // Fetch user from backend (creates user on first login)
      const user = await utils.user.me.fetch()

      // Store user profile - navigation happens automatically
      // via the root layout guard based on onboardingCompleted status
      setUserProfile(user as UserProfile)
    } finally {
      // Clear completing login flag regardless of success/failure
      setCompletingLogin(false)
    }
  }, [utils.user.me, setUserProfile, setCompletingLogin])

  const fakeCompleteLogin = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUserProfile({
      id: '1',
      authId: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      avatarUrl: null,
      onboardingCompleted: true,
    })
    setAuthenticated(true)
  }, [setUserProfile, setAuthenticated])

  return { startLogin, completeLogin, fakeCompleteLogin }
}
