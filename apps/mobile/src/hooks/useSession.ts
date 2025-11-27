import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useMainStore } from '../store/useMainStore'
import type { UserProfile } from '../store/useMainStore'
import { trpc } from '../trpc'

/**
 * Hook to manage Supabase session state and user profile
 * - Gets initial session on mount
 * - Fetches user profile if session exists (to determine onboarding status)
 * - Listens for auth state changes
 * - Updates store when session/profile changes
 *
 * @returns true while initializing, false once session state is determined
 */
export const useSession = () => {
  const [isInitializing, setIsInitializing] = useState(true)
  const setSession = useMainStore((state) => state.setSession)
  const setUserProfile = useMainStore((state) => state.setUserProfile)
  const setLoading = useMainStore((state) => state.setLoading)
  const utils = trpc.useUtils()

  useEffect(() => {
    let mounted = true

    const initSession = async () => {
      setLoading(true)

      try {
        // Get initial session from Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!mounted) return

        setSession(session)

        // If we have a session, fetch user profile to get onboarding status
        if (session) {
          try {
            const user = await utils.user.me.fetch()
            if (mounted) {
              setUserProfile(user as UserProfile)
            }
          } catch (error) {
            console.error('Error fetching user profile:', error)
            // Still allow app to continue - user will be created on next login
          }
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        if (mounted) {
          setIsInitializing(false)
          setLoading(false)
        }
      }
    }

    void initSession()

    // Listen for auth state changes (login, logout, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        // Clear user profile on logout
        if (!session) {
          setUserProfile(null)
        }
      }
    )

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [setSession, setUserProfile, setLoading, utils.user.me])

  return isInitializing
}
