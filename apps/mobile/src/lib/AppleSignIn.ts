import * as AppleAuthentication from 'expo-apple-authentication'

/**
 * Sign in with Apple and get the identity token
 * @throws Error if sign-in fails or no identity token is returned
 * @returns The Apple identity token to exchange with Supabase
 */
const signInGetIdToken = async (): Promise<string> => {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  })

  if (!credential.identityToken) {
    throw new Error('No identityToken from Apple Sign In')
  }

  return credential.identityToken
}

/**
 * Check if Apple Sign In is available on this device
 * @returns true if Apple Sign In is available
 */
const isAvailable = async (): Promise<boolean> => {
  return AppleAuthentication.isAvailableAsync()
}

export const AppleSignIn = {
  signInGetIdToken,
  isAvailable,
}
