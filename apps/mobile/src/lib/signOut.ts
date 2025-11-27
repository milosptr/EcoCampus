import { supabase } from './supabase'

/**
 * Complete sign out - clears Supabase session
 *
 * Note: expo-auth-session (Google) and expo-apple-authentication
 * don't maintain persistent sessions, so only Supabase needs to be signed out
 */
export const signOut = async () => {
  await supabase.auth.signOut()
}
