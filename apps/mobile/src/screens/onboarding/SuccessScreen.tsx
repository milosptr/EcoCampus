import { useState } from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import {
  View,
  Text,
  Pressable,
  Switch,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useOnboardingStore } from '@/src/store/useOnboardingStore'

import { SafeAreaScreen, Card } from '@/src/components'

export default function SuccessScreen() {
  const router = useRouter()
  const store = useOnboardingStore()

  const [joinLeaderboard, setJoinLeaderboard] = useState(store.joinLeaderboard)
  const [dailyReminders, setDailyReminders] = useState(store.dailyReminders)
  const [weeklySummary, setWeeklySummary] = useState(store.weeklySummary)

  const handleStart = () => {
    store.setPreferences({
      joinLeaderboard,
      dailyReminders,
      weeklySummary,
    })
    // Navigate to main app
    router.replace('/(tabs)')
  }

  const handleSkip = () => {
    // Save with default preferences
    store.setPreferences({
      joinLeaderboard: true,
      dailyReminders: true,
      weeklySummary: true,
    })
    router.replace('/(tabs)')
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
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor='#fff'
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
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor='#fff'
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
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor='#fff'
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
            ]}
            onPress={handleStart}
          >
            <Text style={styles.startButtonText}>Start Tracking</Text>
            <Feather name='arrow-right' size={20} color='#fff' />
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
    backgroundColor: '#FAFAFA',
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
    color: '#1A1A1A',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#757575',
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
    backgroundColor: '#E0E0E0',
    height: 4,
    width: 50,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: '#4CAF50',
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
    color: '#1A1A1A',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  preferenceDescription: {
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#45A049',
  },
  startButtonText: {
    color: '#fff',
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
    color: '#9E9E9E',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  skipButtonPressed: {
    opacity: 0.6,
  },
})
