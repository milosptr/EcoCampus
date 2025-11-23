import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import * as AppleAuthentication from 'expo-apple-authentication'

import { SafeAreaScreen, Card } from '@/src/components'

export default function WelcomeScreen() {
  const router = useRouter()

  const handleAppleSignIn = async () => {
    // TODO: Implement Supabase Apple authentication
    // For now, just navigate to next screen
    router.push('/onboarding/profile')
  }

  const handleGoogleSignIn = async () => {
    // TODO: Implement Supabase Google authentication
    // For now, just navigate to next screen
    router.push('/onboarding/profile')
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
                style={[styles.featureIcon, { backgroundColor: '#4CAF50' }]}
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
            ]}
            onPress={handleGoogleSignIn}
          >
            <AntDesign name='google' size={18} color='#4285F4' />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our
            </Text>
          </View>
          <View style={styles.termsLinksContainer}>
            <Text style={styles.termsLink}>Terms of Service</Text>
            <Text style={styles.termsText}> and </Text>
            <Text style={styles.termsLink}>Privacy Policy</Text>
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
    color: '#1A1A1A',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  subtitle: {
    color: '#757575',
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
    color: '#1A1A1A',
    letterSpacing: -0.2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#9E9E9E',
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
    backgroundColor: '#fff',
    borderColor: '#DADCE0',
    borderWidth: 1.5,
  },
  googleButtonText: {
    color: '#3C4043',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  buttonPressed: {
    opacity: 0.9,
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
    color: '#9E9E9E',
    fontWeight: '500',
  },
  termsLink: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '700',
  },
})
