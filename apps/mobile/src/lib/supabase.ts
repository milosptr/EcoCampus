import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { createClient } from '@supabase/supabase-js'

// Validate required environment variables at startup (fail fast with clear errors)
if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  throw new Error(
    'Missing required environment variable: EXPO_PUBLIC_SUPABASE_URL\n' +
      'Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_URL is set.\n' +
      'See SUPABASE_SETUP.md for instructions.'
  )
}

if (!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing required environment variable: EXPO_PUBLIC_SUPABASE_ANON_KEY\n' +
      'Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_ANON_KEY is set.\n' +
      'See SUPABASE_SETUP.md for instructions.'
  )
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

/**
 * Supabase client initialized with anon key for client-side operations.
 * Session is persisted using AsyncStorage for automatic token refresh.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

/**
 * Create session from deep link URL
 * Used for handling OAuth callbacks and email verification links
 */
export const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)

  const { access_token, refresh_token } = params

  if (!access_token) return

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })

  if (error) throw error

  return data.session
}
