// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text as RNText,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { Text as TamText, YStack, TextProps } from 'tamagui'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'
import SafeAreaScreen from '@/src/components/SafeAreaScreen'
import { Card } from '@/src/components'
// Local sample actions (fallback/demo) — keep small and self-contained
import { trpc } from '@/src/trpc'
import { useMainStore } from '@/src/store/useMainStore'

// CO2 numeric estimates are provided on each action as `kgSaved`

type Action = {
  id?: string | number
  title: string
  kgSaved?: number
  emission?: string | number
}

export default function DashboardScreen() {
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([])
  const [showCongrats, setShowCongrats] = useState(false)
  const taskScaleAnimationsRef = useRef<Array<Animated.Value | number>>([])
  const congratsScaleRef = useRef<Animated.Value | number>(new Animated.Value(0))

  const userProfile = useMainStore((s: any) => s.userProfile)

  const isGuest =
    userProfile?.email === 'john.doe@example.com' && userProfile?.authId === '1'

  const {
    data: progressData,
    isLoading: _progressLoading,
    error: _progressError,
  } = trpc.progress.overview.useQuery(undefined, { enabled: !isGuest })

  const { data: _insightsData } = trpc.progress.insights.useQuery(undefined, {
    enabled: !isGuest,
  })

  const {
    data: _leaderboardData,
    isLoading: _lbLoading,
    error: _lbError,
  } = trpc.leaderboard.studentMonthly.useQuery(undefined, { enabled: !isGuest })

  const displayName =
    userProfile?.name && userProfile.name.trim().length > 0
      ? userProfile.name
      : 'Guest User'

  // Fallback sample data for guest/demo — small local list
  const sampleRecent: Action[] = [
    { id: 'a1', title: 'Bike to class', kgSaved: 0.5, emission: '0.5 kg CO₂' },
    { id: 'a2', title: 'Reusable cup', kgSaved: 0.11, emission: '0.11 kg CO₂' },
    { id: 'a3', title: 'Recycle plastics', kgSaved: 2.8, emission: '2.8 kg CO₂' },
  ]

  // If server returns an empty array for recentActions, fall back to sampleRecent
  const _recentActions =
    progressData?.recentActions && progressData.recentActions.length > 0
      ? (progressData.recentActions as Action[])
      : sampleRecent

  const level = Math.max(
    1,
    Math.floor((progressData?.totalPoints ?? 0) / 500) + 1
  )

  // Only display up to 3 tasks on the dashboard
  const displayActions: Action[] = _recentActions.slice(0, 3)

  useEffect(() => {
    setCompletedTasks(new Array(displayActions.length).fill(false))
    // Initialize animation values for each task
    taskScaleAnimationsRef.current.length = 0
    for (let i = 0; i < displayActions.length; i++) {
      taskScaleAnimationsRef.current.push(new Animated.Value(1))
    }
  }, [displayActions.length])

  const completedCount = completedTasks.filter(Boolean).length
  const isAllCompleted =
    completedCount === displayActions.length && displayActions.length > 0

  // Show congrats animation when all tasks are completed
  useEffect(() => {
    if (isAllCompleted) {
      setShowCongrats(true)
      Animated.timing(congratsScaleRef.current, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(congratsScaleRef.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowCongrats(false))
    }
  }, [isAllCompleted])
  const totalCo2 = completedTasks.reduce<number>((sum: number, completed: boolean, i: number) => {
    if (completed) {
      const action = displayActions[i]
      return sum + (action.kgSaved ?? 0)
    }
    return sum
  }, 0)
  const weeklyGoalPercentage =
    displayActions.length > 0
      ? Math.round((completedCount / displayActions.length) * 100)
      : 0

  return (
    <SafeAreaScreen>
      <View style={styles.headerContainer}>
        <YStack gap={4}>
          <TamText fontSize={20} fontWeight={500} color={Colors.primaryDark}>
            Good to see you,
          </TamText>
          <TamText fontSize={22} fontWeight={700} color={Colors.primary}>
            {displayName}
          </TamText>
        </YStack>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Your Impact card */}
        <Card style={[styles.cardSection, styles.impactCard]}>
          <TamText
            {...({
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
            } as TextProps)}
          >
            Your Impact
          </TamText>

          <View style={styles.levelWrapper}>
            <View style={styles.levelBadge}>
              <TamText fontSize={12} color={Colors.white}>
                LEVEL
              </TamText>
              <TamText
                {...({
                  fontSize: 34,
                  fontWeight: 800,
                  color: Colors.white,
                } as TextProps)}
              >
                {level}
              </TamText>
            </View>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <RNText style={styles.infoLabel}>CO₂ SAVED TODAY</RNText>
              <RNText style={styles.infoValue}>{totalCo2.toFixed(2)} kg</RNText>
            </View>

            <View style={styles.infoRow}>
              <RNText style={styles.infoLabel}>ACTIONS THIS WEEK</RNText>
              <RNText style={styles.infoValue}>{displayActions.length}</RNText>
            </View>

            <View style={styles.infoRow}>
              <RNText style={styles.infoLabel}>WEEKLY GOAL</RNText>
              <RNText style={styles.infoValue}>
                {weeklyGoalPercentage}% Complete
              </RNText>
            </View>
          </View>
        </Card>

        {/* Tasks card */}
        <View style={styles.tasksHeaderRow}>
          <View style={styles.accentBar} />
          <TamText
            {...({
              fontSize: 20,
              fontWeight: 700,
              marginLeft: 8,
            } as TextProps)}
          >
            tasks
          </TamText>
        </View>

        <Card style={styles.cardSection}>
          <RNText style={styles.subText}>
            {completedTasks.filter(Boolean).length} of {displayActions.length}{' '}
            tasks completed
          </RNText>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(displayActions.length > 0 ? completedTasks.filter(Boolean).length / displayActions.length : 0) * 100}%`,
                },
              ]}
            />
          </View>

          {displayActions.map((action, i) => {
            const isCompleted = completedTasks[i] || false
            return (
              <Animated.View
                key={action.id || i}
                style={[
                  {
                    transform: [
                      {
                        scale:
                          taskScaleAnimationsRef.current[i] ||
                          new Animated.Value(1),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.taskItem,
                    isCompleted
                      ? styles.taskItemCompleted
                      : styles.taskItemPending,
                  ]}
                  onPress={() => {
                    const newCompleted = [...completedTasks]
                    const willComplete = !newCompleted[i]
                    newCompleted[i] = willComplete
                    setCompletedTasks(newCompleted)

                    // Play celebration animation on completion
                    if (willComplete && taskScaleAnimationsRef.current[i]) {
                      Animated.sequence([
                        Animated.timing(taskScaleAnimationsRef.current[i], {
                          toValue: 1.05,
                          duration: 100,
                          useNativeDriver: false,
                        }),
                        Animated.spring(taskScaleAnimationsRef.current[i], {
                          toValue: 1,
                          friction: 5,
                          tension: 40,
                          useNativeDriver: false,
                        }),
                      ]).start()
                    }
                  }}
                >
                  <View style={styles.taskLeft}>
                    <View style={styles.taskNumber}>
                      <RNText style={styles.taskNumberText}>{i + 1}</RNText>
                    </View>
                    <View>
                      <RNText
                        style={[
                          styles.taskText,
                          isCompleted
                            ? styles.taskTextCompleted
                            : styles.taskTextPending,
                        ]}
                      >
                        {action.title}
                      </RNText>
                      {(() => {
                        const emissionText =
                          // server may return `emission` (string) or `kgSaved` (number)
                          action.emission
                            ? String(action.emission)
                            : action.kgSaved !== undefined
                            ? `${action.kgSaved} kg CO₂`
                            : undefined
                        return (
                          emissionText && (
                            <RNText style={styles.emissionText}>
                              {emissionText}
                            </RNText>
                          )
                        )
                      })()}
                    </View>
                  </View>
                  {isCompleted && (
                    <Feather name='check' size={18} color={Colors.white} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            )
          })}
        </Card>
      </ScrollView>

      {/* Congratulations Overlay */}
      {showCongrats && (
        <View style={styles.congratsOverlay}>
          <Animated.View
            style={[
              styles.congratsCard,
              { transform: [{ scale: congratsScaleRef.current }] },
            ]}
          >
            <Feather name='check-circle' size={60} color={Colors.primary} />
            <TamText
              style={{
                fontSize: 24,
                fontWeight: '700',
                marginTop: 16,
                textAlign: 'center',
              }}
            >
              Awesome! 🎉
            </TamText>
            <TamText
              style={{
                fontSize: 16,
                marginTop: 8,
                textAlign: 'center',
                color: Colors.textSecondary,
              }}
            >
              You completed all tasks!
            </TamText>
            <TamText
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginTop: 12,
                textAlign: 'center',
                color: Colors.primary,
              }}
            >
              {totalCo2.toFixed(2)} kg CO₂ saved
            </TamText>
            <TouchableOpacity
              style={styles.congratsDismissBtn}
              onPress={() => {
                setShowCongrats(false)
              }}
            >
              <RNText style={styles.congratsDismissBtnText}>Continue</RNText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </SafeAreaScreen>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F3F7EC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 24,
    backgroundColor: '#F3F7EC',
  },
  cardSection: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  topBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactCard: {
    borderRadius: 18,
    paddingVertical: 24,
    alignItems: 'center',
  },
  levelWrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },
  levelBadge: {
    width: 88,
    height: 88,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  infoList: {
    width: '100%',
    gap: 12,
  },
  infoRow: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  infoValue: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  tasksHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  accentBar: {
    width: 6,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  subText: {
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.tertiaryMedium,
    borderRadius: 6,
  },
  taskItem: {
    backgroundColor: Colors.secondary,
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskLeft: { flexDirection: 'row', alignItems: 'center' },
  taskNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  taskNumberText: { color: Colors.primary, fontWeight: '700' },
  taskText: { color: Colors.white, fontWeight: '600' },
  taskItemCompleted: {
    backgroundColor: Colors.secondary,
  },
  taskItemPending: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  taskTextCompleted: { color: Colors.white },
  taskTextPending: { color: Colors.primary },
  emissionText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  congratsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  congratsCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: '80%',
  },
  congratsDismissBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 24,
  },
  congratsDismissBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
})
