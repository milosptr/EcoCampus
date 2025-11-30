import { MotiView } from 'moti'
import { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import LogoImage from '@/assets/images/icon.png'

import { SafeAreaScreen, Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import { useCompleteLogin } from '@/src/hooks/useCompleteLogin'
import { supabase } from '@/src/lib/supabase'
import { BackgroundPattern } from '@/src/shapes/BackgroundPattern'
import { useMainStore } from '@/src/store/useMainStore'

const featureHighlights = [
  {
    icon: 'activity' as const,
    color: Colors.quaternary,
    title: 'Track Your Impact',
    description: 'Log eco-friendly actions daily',
  },
  {
    icon: 'users' as const,
    color: Colors.tertiaryMedium,
    title: 'Compete & Connect',
    description: 'Join your university leaderboard',
  },
  {
    icon: 'trending-down' as const,
    color: Colors.primary,
    title: 'Reduce CO₂ Emissions',
    description: 'Monitor your environmental footprint',
  },
]

export default function WelcomeScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const setCompletingLogin = useMainStore((state) => state.setCompletingLogin)
  const { startLogin, completeLogin, fakeCompleteLogin } = useCompleteLogin()

  const isLoading = isSubmitting

  const handleEmailPasswordSubmit = async () => {
    if (isSubmitting) return

    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !password.trim()) {
      setFormError('Enter both email and password to continue.')
      return
    }

    setIsSubmitting(true)
    setFormError(null)
    startLogin()

    let completedLogin = false

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (signInError) {
        if (signInError.message === 'Invalid login credentials') {
          const { data: signUpData, error: signUpError } =
            await supabase.auth.signUp({
              email: normalizedEmail,
              password,
            })

          if (signUpError) {
            if (signUpError.message === 'User already registered') {
              setFormError('Incorrect password. Please try again.')
              return
            }

            throw signUpError
          }

          if (!signUpData.session) {
            Alert.alert(
              'Check Your Email',
              'Please confirm your email address to continue.'
            )
            return
          }
        } else {
          throw signInError
        }
      }

      await completeLogin()
      completedLogin = true
    } catch (error) {
      console.error('Email authentication error:', error)
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to sign in with email and password.'
      setFormError(message)
      Alert.alert(
        'Sign In Failed',
        'Unable to authenticate with email and password. Please try again.'
      )
    } finally {
      if (!completedLogin) {
        setCompletingLogin(false)
      }
      setIsSubmitting(false)
    }
  }

  const openTerms = async () => {
    await WebBrowser.openBrowserAsync('https://ecocampus.com/terms')
  }

  const openPrivacy = async () => {
    await WebBrowser.openBrowserAsync('https://ecocampus.com/privacy')
  }

  const handleSkip = async () => {
    await fakeCompleteLogin()
  }

  return (
    <SafeAreaScreen style={styles.container} edges={['left', 'right']}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <BackgroundPattern
          width='100%'
          height='100%'
          color={Colors.primary}
          preserveAspectRatio='xMidYMid slice'
        />
      </View>

      {/* Animated Logo */}
      <MotiView
        from={{ translateY: -20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoImageContainer}>
            <Image
              source={LogoImage}
              style={{ width: '100%', height: '100%', borderRadius: 12 }}
            />
          </View>
          <Text style={styles.title}>EcoCampus</Text>
          <Text style={styles.subtitle}>
            Track your impact. Build better habits.{'\n'}Make a difference,
            together.
          </Text>
        </View>
      </MotiView>

      {/* Feature Highlights */}
      <View style={styles.featuresContainer}>
        <MotiView
          from={{ translateX: -40, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 350 }}
        >
          <Card style={styles.featuresCard}>
            {featureHighlights.map((feature, index) => (
              <View key={feature.title}>
                <View style={styles.featureRow}>
                  <View
                    style={[
                      styles.featureIcon,
                      { backgroundColor: feature.color },
                    ]}
                  >
                    <Feather name={feature.icon} size={18} color='white' />
                  </View>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
                {index < featureHighlights.length - 1 && (
                  <View style={styles.featureDivider} />
                )}
              </View>
            ))}
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
          {isLoading ? (
            <ActivityIndicator size='large' color={Colors.primary} />
          ) : (
            <>
              <View style={styles.formField}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder='you@email.com'
                  placeholderTextColor={Colors.textMuted}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  textContentType='emailAddress'
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType='next'
                  editable={!isLoading}
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Create a password'
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry
                  autoCapitalize='none'
                  autoCorrect={false}
                  textContentType='password'
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType='done'
                  editable={!isLoading}
                  onSubmitEditing={handleEmailPasswordSubmit}
                />
              </View>

              {formError ? (
                <Text style={styles.errorText}>{formError}</Text>
              ) : null}

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleEmailPasswordSubmit}
                disabled={isLoading}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </Pressable>
              <Pressable onPress={handleSkip}>
                <Text
                  style={[
                    styles.secondaryActionText,
                    { textAlign: 'center', color: Colors.quaternary },
                  ]}
                >
                  Continue as Guest
                </Text>
              </Pressable>

              <View style={styles.termsWrapper}>
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
            </>
          )}
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
    backgroundColor: Colors.background,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    zIndex: 0,
  },
  logoImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
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
    marginBottom: 28,
  },
  featuresCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  featureDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 4,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 20,
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
  formField: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.1,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    color: Colors.text,
    fontSize: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 13,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: Colors.buttonPrimary,
    borderColor: Colors.buttonPrimaryBorder,
    borderWidth: 1.5,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  termsWrapper: {
    gap: 4,
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
