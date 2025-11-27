import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiProvider } from 'tamagui'

import { useColorScheme } from '@/src/hooks/useColorScheme'
import { useSession } from '@/src/hooks/useSession'
import { useMainStore } from '@/src/store/useMainStore'
import { TRPCProvider } from '@/src/trpc'
import tamaguiConfig from '../tamagui.config'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Start with auth flow for unauthenticated users
  initialRouteName: '(auth)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') as string,
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <TRPCProvider>
      <RootLayoutNav />
    </TRPCProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const isAuthenticated = useMainStore((state) => state.isAuthenticated)
  const userProfile = useMainStore((state) => state.userProfile)
  const isCompletingLogin = useMainStore((state) => state.isCompletingLogin)
  const isInitializing = useSession()

  // Keep showing nothing while session is being determined
  // This keeps the splash screen visible
  if (isInitializing) {
    return null
  }

  // 3-state routing based on auth + onboarding status
  // Stay on auth screen while completing login (fetching user profile)
  const showAuth = !isAuthenticated || isCompletingLogin
  const showOnboarding =
    isAuthenticated && !isCompletingLogin && !userProfile?.onboardingCompleted
  const showTabs =
    isAuthenticated &&
    !isCompletingLogin &&
    (userProfile?.onboardingCompleted ?? false)

  return (
    <SafeAreaProvider>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={colorScheme ?? 'light'}
      >
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Protected guard={showAuth}>
              <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={showOnboarding}>
              <Stack.Screen name='onboarding' options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={showTabs}>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
