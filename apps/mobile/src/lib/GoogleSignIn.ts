import { useEffect, useCallback, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { supabase } from './supabase'

// Required for web browser auth session to complete properly
WebBrowser.maybeCompleteAuthSession()

const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? ''
const GOOGLE_IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || GOOGLE_WEB_CLIENT_ID
const GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || GOOGLE_WEB_CLIENT_ID

/**
 * Hook for Google OAuth authentication via expo-auth-session
 * Works with Expo Go (web-based OAuth flow)
 *
 * Note: For Expo Go, the web client ID is used as fallback for iOS/Android
 * since the OAuth flow is web-based anyway.
 *
 * @param onStart - Callback to call BEFORE Supabase auth (to set loading state)
 * @param onSuccess - Callback when authentication succeeds
 * @param onError - Callback when authentication fails
 * @returns Object with promptAsync function and loading state
 */
export const useGoogleAuth = (
  onStart: () => void,
  onSuccess: () => Promise<void>,
  onError: (error: Error) => void
) => {
  const [isLoading, setIsLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  })

  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === 'success') {
        setIsLoading(true)
        try {
          const { id_token } = response.params

          if (!id_token) {
            throw new Error('No ID token received from Google')
          }

          // Signal login started BEFORE Supabase auth to prevent screen jumping
          onStart()

          // Exchange token with Supabase
          const { error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: id_token,
          })

          if (error) throw error

          await onSuccess()
        } catch (error) {
          onError(
            error instanceof Error ? error : new Error('Google sign in failed')
          )
        } finally {
          setIsLoading(false)
        }
      } else if (response?.type === 'error') {
        onError(new Error(response.error?.message || 'Google sign in failed'))
      }
      // 'cancel' and 'dismiss' types are handled silently (user cancelled)
    }

    if (response) {
      handleResponse()
    }
  }, [response, onStart, onSuccess, onError])

  const signIn = useCallback(async () => {
    if (!request) {
      onError(new Error('Google auth request not ready'))
      return
    }
    await promptAsync()
  }, [request, promptAsync, onError])

  return {
    signIn,
    isLoading,
    isReady: !!request,
  }
}
