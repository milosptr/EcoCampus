import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  ScrollView,
  Text as RNText,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Card, CircularProgress, CircularProgressLabel } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import { useMainStore } from '@/src/store/useMainStore'
import { usePersonalProgress } from '@/src/hooks/usePersonalProgress'
import { ACTION_CO2_VALUES } from '@/src/constants/actions'

type Action = {
  id?: string | number
  title: string
  kgSaved?: number
  emission?: string | number
}

const getKgSavedFromTitle = (title: string): number => {
  if (title.includes('Bicycle')) return ACTION_CO2_VALUES.BIKE_PER_KM
  if (title.includes('Walking')) return ACTION_CO2_VALUES.WALK_PER_KM
  if (title.includes('Dish without red meat'))
    return ACTION_CO2_VALUES.VEGETARIAN_DISH
  if (title.includes('Buying secondhand'))
    return ACTION_CO2_VALUES.SECONDHAND_ITEM
  if (title.includes('Shorter showers')) return ACTION_CO2_VALUES.SHOWER_PER_MIN
  if (title.includes('Recycling'))
    return ACTION_CO2_VALUES.RECYCLING_PER_WEEK / 7
  if (title.includes('Shutting off devices'))
    return ACTION_CO2_VALUES.DEVICE_OFF_PER_HOUR
  if (title.includes('Reusable flask')) return ACTION_CO2_VALUES.REUSABLE_CUP
  return 0
}

export default function DashboardScreen() {
  const userProfile = useMainStore((s) => s.userProfile)

  const { data: personalData, loading: _loading } = usePersonalProgress()

  // Always use the hook data - it has proper CO2 values
  const displayActions = personalData?.recentActions?.slice(0, 3) || []

  // Ensure displayActions always have kgSaved values
  const actionsWithKgSaved = displayActions.map((action) => ({
    ...action,
    kgSaved: getKgSavedFromTitle(action.title),
  }))

  const [completed, setCompleted] = useState<boolean[]>(
    new Array(displayActions.length).fill(false)
  )
  const [showCongrats, setShowCongrats] = useState(false)
  const congratsScaleRef = useRef(new Animated.Value(0))
  const scaleRefs = useRef<Animated.Value[]>([])

  useEffect(() => {
    setCompleted(new Array(displayActions.length).fill(false))
    scaleRefs.current.length = 0
    for (let i = 0; i < displayActions.length; i++)
      scaleRefs.current.push(new Animated.Value(1))
  }, [displayActions.length])

  const completedCount = completed.filter(Boolean).length

  // Calculate CO₂ saved from completed tasks
  const co2SavedFromTasks = completed.reduce((sum, isCompleted, i) => {
    if (isCompleted && actionsWithKgSaved[i]) {
      return sum + actionsWithKgSaved[i].kgSaved
    }
    return sum
  }, 0)

  // Filter actions from today
  const todaysActions =
    personalData?.recentActions?.filter(
      (action) =>
        !action.timestamp.includes('Yesterday') &&
        !action.timestamp.includes('days ago')
    ) || []

  // Calculate CO₂ saved today from logged actions
  const co2SavedToday =
    todaysActions.reduce(
      (sum, action) => sum + getKgSavedFromTitle(action.title),
      0
    ) + co2SavedFromTasks

  const totalPoints = 450
  const level = 3
  const baselineCo2 = personalData?.user?.co2Saved ?? 0
  const totalCo2Saved = baselineCo2 + co2SavedFromTasks
  const baselineActionsThisWeek = personalData?.user?.actionsThisWeek ?? 23
  const totalActionsThisWeek = baselineActionsThisWeek + completedCount

  const isAllCompleted =
    completedCount === displayActions.length && displayActions.length > 0

  // Debug logging
  useEffect(() => {
    console.log('Dashboard Stats:', {
      completedCount,
      displayActionsLength: displayActions.length,
      actionsWithKgSaved: actionsWithKgSaved.map((a) => ({
        title: a.title,
        kgSaved: a.kgSaved,
      })),
      completed,
      co2SavedFromTasks,
      todaysActions: todaysActions.map((a) => ({
        title: a.title,
        kgSaved: getKgSavedFromTitle(a.title),
      })),
      co2SavedToday,
      baselineCo2,
      totalCo2Saved,
      totalActionsThisWeek,
      isAllCompleted,
    })
  }, [completed, displayActions.length])

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ translateY: -10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 400 }}
        >
          <View style={styles.headerRow}>
            <View>
              <RNText style={styles.greeting}>Good to see you,</RNText>
              <RNText style={styles.heading}>
                {userProfile?.name ?? 'Guest User'}
              </RNText>
            </View>
          </View>
        </MotiView>

        <MotiView
          from={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 80 }}
        >
          <Card style={styles.heroCard}>
            <View style={styles.heroContent}>
              <CircularProgress
                progress={0.5}
                size={120}
                strokeWidth={12}
                progressColor={Colors.primary}
              >
                <CircularProgressLabel level={`LVL ${level}`} title='warrior' />
              </CircularProgress>
              <View style={styles.heroInfo}>
                <RNText style={styles.heroPoints}>{totalPoints} pts</RNText>
                <RNText style={styles.heroSub}>
                  Keep completing actions to level up
                </RNText>
              </View>
            </View>
          </Card>
        </MotiView>

        <MotiView
          from={{ translateY: 10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 350, delay: 140 }}
        >
          <Card style={styles.statsRow}>
            <View style={styles.statBox}>
              <Feather name='cloud' size={18} color={Colors.primary} />
              <RNText style={styles.statValue}>
                {co2SavedToday.toFixed(2)} kg
              </RNText>
              <RNText style={styles.statLabel}>CO₂ Saved Today</RNText>
            </View>
            <View style={styles.statBox}>
              <Feather name='layers' size={18} color={Colors.primary} />
              <RNText style={styles.statValue}>{totalActionsThisWeek}</RNText>
              <RNText style={styles.statLabel}>Actions This Week</RNText>
            </View>
            <View style={styles.statBox}>
              <Feather name='target' size={18} color={Colors.primary} />
              <RNText style={styles.statValue}>
                {Math.round(
                  (completedCount / Math.max(1, displayActions.length)) * 100
                )}
                %
              </RNText>
              <RNText style={styles.statLabel}>Weekly Goal</RNText>
            </View>
          </Card>
        </MotiView>

        <MotiView
          from={{ translateY: 10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 350, delay: 200 }}
        >
          <Card style={styles.tasksCard}>
            <View style={styles.tasksHeader}>
              <View style={styles.accentBar} />
              <RNText style={styles.tasksTitle}>Tasks</RNText>
            </View>

            <RNText style={styles.subText}>
              {completedCount} of {displayActions.length} tasks completed
            </RNText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(displayActions.length > 0 ? completedCount / displayActions.length : 0) * 100}%`,
                  },
                ]}
              />
            </View>

            {displayActions.map((action, i) => {
              const isCompleted = completed[i] || false
              return (
                <Animated.View
                  key={action.id ?? i}
                  style={{
                    transform: [
                      { scale: scaleRefs.current[i] ?? new Animated.Value(1) },
                    ],
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.taskItem,
                      isCompleted
                        ? styles.taskItemCompleted
                        : styles.taskItemPending,
                    ]}
                    onPress={() => {
                      const copy = [...completed]
                      const will = !copy[i]
                      copy[i] = will
                      setCompleted(copy)
                      if (will) {
                        const ref = (scaleRefs.current[i] ??
                          new Animated.Value(1)) as Animated.Value
                        Animated.sequence([
                          Animated.timing(ref, {
                            toValue: 1.05,
                            duration: 100,
                            useNativeDriver: false,
                          }),
                          Animated.spring(ref, {
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
                        {actionsWithKgSaved[i].kgSaved !== undefined && (
                          <RNText style={styles.emissionText}>
                            {actionsWithKgSaved[i].kgSaved} kg CO₂
                          </RNText>
                        )}
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
        </MotiView>
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
            <RNText style={styles.congratsTitle}>Awesome! 🎉</RNText>
            <RNText style={styles.congratsMessage}>
              You completed all tasks!
            </RNText>
            <RNText style={styles.congratsCo2}>
              {co2SavedFromTasks.toFixed(2)} kg CO₂ saved
            </RNText>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  greeting: { color: Colors.textSecondary, fontSize: 14 },
  heading: { fontSize: 22, fontWeight: '700', color: Colors.text },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: { padding: 20, backgroundColor: Colors.white },
  heroContent: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  heroInfo: { marginLeft: 6 },
  heroPoints: { fontSize: 20, fontWeight: '700', color: Colors.text },
  heroSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 6 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginTop: 6,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 6 },
  statValue: { fontSize: 16, fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: 12, color: Colors.textSecondary },
  tasksCard: { padding: 16, backgroundColor: Colors.white },
  tasksHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  tasksTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
    color: Colors.text,
  },
  accentBar: {
    width: 6,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  subText: { color: Colors.textSecondary, marginBottom: 10 },
  progressBar: {
    height: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.tertiaryMedium,
    borderRadius: 6,
  },
  taskItem: {
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskItemCompleted: { backgroundColor: Colors.secondary },
  taskItemPending: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
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
  taskText: { fontWeight: '600' },
  taskTextCompleted: { color: Colors.white },
  taskTextPending: { color: Colors.primary },
  emissionText: { color: Colors.textSecondary, fontSize: 12, marginTop: 4 },
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
  congratsTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
    color: Colors.text,
  },
  congratsMessage: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    color: Colors.textSecondary,
  },
  congratsCo2: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
    color: Colors.primary,
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
