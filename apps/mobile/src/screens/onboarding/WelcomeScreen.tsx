import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as WebBrowser from 'expo-web-browser'

import { SafeAreaScreen, Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'

export default function WelcomeScreen() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true)
      const _credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      // TODO: Implement Supabase Apple authentication with _credential
      router.push('/onboarding/profile')
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'code' in e) {
        const error = e as { code: string }
        if (error.code === 'ERR_REQUEST_CANCELED') {
          // User canceled the sign-in flow
          return
        }
      }
      // Handle other errors
      console.error('Apple authentication error:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      // TODO: Implement Supabase Google authentication
      router.push('/onboarding/profile')
    } catch (e: unknown) {
      console.error('Google authentication error:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const openTerms = async () => {
    await WebBrowser.openBrowserAsync('https://ecocampus.com/terms')
  }

  const openPrivacy = async () => {
    await WebBrowser.openBrowserAsync('https://ecocampus.com/privacy')
  }

  return (
    <SafeAreaScreen style={styles.container} edges={['left', 'right']}>
      {/* Animated Logo */}
      <MotiView
        from={{ translateY: -20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🌱</Text>
          <Text style={styles.title}>EcoCampus</Text>
          <Text style={styles.subtitle}>
            Track your impact. Build better habits.{'\n'}Make a difference,
            together.
          </Text>
        </View>
      </MotiView>

      {/* Feature Cards */}
      <View style={styles.featuresContainer}>
        <MotiView
          from={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 300 }}
        >
          <Card>
            <View style={styles.featureCard}>
              <View
                style={[styles.featureIcon, { backgroundColor: '#8E44AD' }]}
              >
                <Feather name='activity' size={22} color='white' />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Track Your Impact</Text>
                <Text style={styles.featureDescription}>
                  Log eco-friendly actions daily
                </Text>
              </View>
            </View>
          </Card>
        </MotiView>

        <MotiView
          from={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 450 }}
        >
          <Card>
            <View style={styles.featureCard}>
              <View
                style={[styles.featureIcon, { backgroundColor: '#FFD54F' }]}
              >
                <Feather name='users' size={22} color='#111' />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Compete & Connect</Text>
                <Text style={styles.featureDescription}>
                  Join your university leaderboard
                </Text>
              </View>
            </View>
          </Card>
        </MotiView>

        <MotiView
          from={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
        >
          <Card>
            <View style={styles.featureCard}>
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: Colors.primary },
                ]}
              >
                <Feather name='trending-down' size={22} color='white' />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Reduce CO₂ Emissions</Text>
                <Text style={styles.featureDescription}>
                  Monitor your environmental footprint
                </Text>
              </View>
            </View>
          </Card>
        </MotiView>
      </View>

      {/* Auth Buttons */}
      <MotiView
        from={{ translateY: 50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 750 }}
        style={{ width: '100%' }}
      >
        <View style={styles.buttonsContainer}>
          {/* Apple Sign In Button */}
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={12}
            style={styles.appleButton}
            onPress={handleAppleSignIn}
          />

          {/* Google Sign In Button */}
          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.buttonPressed,
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            <AntDesign name='google' size={18} color={Colors.googleBlue} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our
            </Text>
          </View>
          <View style={styles.termsLinksContainer}>
            <Pressable onPress={openTerms}>
              <Text style={styles.termsLink}>Terms of Service</Text>
            </Pressable>
            <Text style={styles.termsText}> and </Text>
            <Pressable onPress={openPrivacy}>
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Pressable>
          </View>
        </View>
      </MotiView>
    </SafeAreaScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    color: Colors.text,
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    padding: 18,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.text,
    letterSpacing: -0.2,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  buttonsContainer: {
    width: '100%',
    gap: 14,
  },
  appleButton: {
    width: '100%',
    height: 52,
  },
  googleButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.googleBorder,
    borderWidth: 1.5,
  },
  googleButtonText: {
    color: Colors.googleText,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  termsLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  termsText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  termsLink: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
})
