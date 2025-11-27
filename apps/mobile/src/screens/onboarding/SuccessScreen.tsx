import { useState } from 'react'
import { MotiView } from 'moti'
import {
  View,
  Text,
  Pressable,
  Switch,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useOnboardingStore } from '@/src/store/useOnboardingStore'
import { useMainStore, type UserProfile } from '@/src/store/useMainStore'

import { SafeAreaScreen, Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import { trpc } from '@/src/trpc'

export default function SuccessScreen() {
  const store = useOnboardingStore()
  const setUserProfile = useMainStore((state) => state.setUserProfile)

  const [joinLeaderboard, setJoinLeaderboard] = useState(store.joinLeaderboard)
  const [dailyReminders, setDailyReminders] = useState(store.dailyReminders)
  const [weeklySummary, setWeeklySummary] = useState(store.weeklySummary)
  const [isSaving, setIsSaving] = useState(false)

  // Mutation to save onboarding profile to backend
  const saveProfileMutation = trpc.user.saveOnboardingProfile.useMutation()

  const saveOnboardingData = async (preferences: {
    joinLeaderboard: boolean
    dailyReminders: boolean
    weeklySummary: boolean
  }) => {
    try {
      setIsSaving(true)
      const updatedProfile = await saveProfileMutation.mutateAsync({
        fullName: store.fullName,
        age: store.age || undefined,
        gender: store.gender,
        dietaryPreference: store.dietaryPreference,
        university: store.university,
        distanceFromCampus: store.distanceFromCampus || undefined,
        transportMode: store.transportMode,
        housingType: store.housingType,
        weeklyCampusVisits: store.weeklyCampusVisits || undefined,
        joinLeaderboard: preferences.joinLeaderboard,
        dailyReminders: preferences.dailyReminders,
        weeklySummary: preferences.weeklySummary,
      })

      // Update user profile in store - this triggers navigation via the guard
      setUserProfile(updatedProfile as UserProfile)

      // Clear onboarding store after successful save
      store.reset()
    } catch (error) {
      console.error('Failed to save onboarding profile:', error)
      // Don't block the user - they can retry later
    } finally {
      setIsSaving(false)
    }
  }

  const handleStart = async () => {
    store.setPreferences({
      joinLeaderboard,
      dailyReminders,
      weeklySummary,
    })

    await saveOnboardingData({
      joinLeaderboard,
      dailyReminders,
      weeklySummary,
    })
  }

  const handleSkip = async () => {
    // Save with default preferences
    store.setPreferences({
      joinLeaderboard: true,
      dailyReminders: true,
      weeklySummary: true,
    })

    await saveOnboardingData({
      joinLeaderboard: true,
      dailyReminders: true,
      weeklySummary: true,
    })
  }

  return (
    <SafeAreaScreen style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>You&apos;re all set!</Text>
            <Text style={styles.subtitle}>
              Ready to start making a positive impact on the environment
            </Text>
          </View>
        </MotiView>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preference Toggles */}
        <View style={styles.preferencesContainer}>
          <MotiView
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 400 }}
          >
            <Card>
              <View style={styles.preferenceCard}>
                <View style={styles.preferenceTextContainer}>
                  <Text style={styles.preferenceTitle}>
                    Join University Leaderboard
                  </Text>
                  <Text style={styles.preferenceDescription}>
                    Compete with students at{' '}
                    {store.university || 'your university'}
                  </Text>
                </View>
                <Switch
                  value={joinLeaderboard}
                  onValueChange={setJoinLeaderboard}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              </View>
            </Card>
          </MotiView>

          <MotiView
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 500 }}
          >
            <Card>
              <View style={styles.preferenceCard}>
                <View style={styles.preferenceTextContainer}>
                  <Text style={styles.preferenceTitle}>Daily Reminders</Text>
                  <Text style={styles.preferenceDescription}>
                    Get notified to log your eco-friendly actions
                  </Text>
                </View>
                <Switch
                  value={dailyReminders}
                  onValueChange={setDailyReminders}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              </View>
            </Card>
          </MotiView>

          <MotiView
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 600 }}
          >
            <Card>
              <View style={styles.preferenceCard}>
                <View style={styles.preferenceTextContainer}>
                  <Text style={styles.preferenceTitle}>Weekly Summary</Text>
                  <Text style={styles.preferenceDescription}>
                    Review your weekly impact and progress
                  </Text>
                </View>
                <Switch
                  value={weeklySummary}
                  onValueChange={setWeeklySummary}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              </View>
            </Card>
          </MotiView>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <MotiView
          from={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 700 }}
        >
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed,
              isSaving && styles.buttonDisabled,
            ]}
            onPress={handleStart}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <>
                <Text style={styles.startButtonText}>Start Tracking</Text>
                <Feather name='arrow-right' size={20} color='#fff' />
              </>
            )}
          </Pressable>
        </MotiView>

        <MotiView
          from={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 800 }}
        >
          <Pressable
            style={({ pressed }) => [
              styles.skipButton,
              pressed && styles.skipButtonPressed,
            ]}
            onPress={handleSkip}
            disabled={isSaving}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </Pressable>
        </MotiView>
      </View>
    </SafeAreaScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    gap: 24,
  },
  header: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 180,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    paddingVertical: 20,
    paddingBottom: 32,
    backgroundColor: 'transparent',
    gap: 12,
  },
  title: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    backgroundColor: Colors.border,
    height: 4,
    width: 50,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: Colors.primary,
  },
  preferencesContainer: {
    gap: 14,
    marginTop: 8,
  },
  preferenceCard: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  preferenceDescription: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  skipButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    color: Colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  skipButtonPressed: {
    opacity: 0.6,
  },
})
