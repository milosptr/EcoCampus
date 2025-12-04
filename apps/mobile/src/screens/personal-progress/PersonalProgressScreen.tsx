import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'
import { Card, CircularProgress, CircularProgressLabel } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import {
  usePersonalProgress,
  type RecentAction,
  type Achievement,
  type WeeklyChallenge,
} from '@/src/hooks/usePersonalProgress'

const screenWidth = Dimensions.get('window').width

export default function PersonalProgressScreen() {
  const { data, loading } = usePersonalProgress()

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your progress...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <MotiView
          from={{ translateY: -20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Your Progress</Text>
              <Text style={styles.subtitle}>Keep up the great work!</Text>
            </View>
          </View>
        </MotiView>

        {/* Hero Card - Level Progress */}
        <HeroCard user={data.user} />

        {/* Stats Row */}
        <StatsRow user={data.user} />

        {/* Monthly Chart */}
        <ChartSection monthlyData={data.monthlyData} />

        {/* Recent Actions */}
        <RecentActionsSection actions={data.recentActions} />

        {/* Weekly Challenge */}
        <ChallengeSection challenge={data.weeklyChallenge} />

        {/* Achievements */}
        <AchievementsSection achievements={data.achievements} />
      </ScrollView>
    </SafeAreaView>
  )
}

// Hero Card Component
function HeroCard({
  user,
}: {
  user: ReturnType<typeof usePersonalProgress>['data']['user']
}) {
  return (
    <MotiView
      from={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'timing', duration: 500, delay: 100 }}
    >
      <Card style={styles.heroCard}>
        <View style={styles.heroContent}>
          <CircularProgress
            progress={user.progressPercent}
            size={140}
            strokeWidth={12}
            progressColor={Colors.primary}
          >
            <CircularProgressLabel
              level={`LVL ${user.currentLevel.level}`}
              title={user.currentLevel.title}
            />
          </CircularProgress>

          <View style={styles.heroInfo}>
            <Text style={styles.heroPoints}>{user.totalPoints} pts</Text>
            {user.pointsToNextLevel > 0 && (
              <Text style={styles.heroNextLevel}>
                {user.pointsToNextLevel} pts to{' '}
                {user.currentLevel.title === 'Legend' ? 'max' : 'next level'}
              </Text>
            )}
          </View>
        </View>
      </Card>
    </MotiView>
  )
}

// Stats Row Component
function StatsRow({
  user,
}: {
  user: ReturnType<typeof usePersonalProgress>['data']['user']
}) {
  return (
    <MotiView
      from={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 200 }}
    >
      <View style={styles.statsRow}>
        <StatBox
          icon='feather'
          value={`${user.co2Saved.toFixed(2)}`}
          unit='kg'
          label='CO₂ Saved Today'
          iconColor={Colors.primary}
        />
        <StatBox
          icon='check-circle'
          value={`${user.actionsThisWeek}`}
          label='This Week'
          iconColor={Colors.success}
        />
        <StatBox
          icon='zap'
          value={`${user.streak}`}
          label='Day Streak'
          iconColor={Colors.tertiaryDark}
          highlight={user.streak >= 7}
        />
      </View>
    </MotiView>
  )
}

function StatBox({
  icon,
  value,
  unit,
  label,
  iconColor,
  highlight,
}: {
  icon: React.ComponentProps<typeof Feather>['name']
  value: string
  unit?: string
  label: string
  iconColor: string
  highlight?: boolean
}) {
  return (
    <View style={[styles.statBox, highlight && styles.statBoxHighlight]}>
      <View
        style={[
          styles.statIconContainer,
          { backgroundColor: iconColor + '15' },
        ]}
      >
        <Feather name={icon} size={16} color={iconColor} />
      </View>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        {unit && <Text style={styles.statUnit}>{unit}</Text>}
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

// Chart Section Component
function ChartSection({
  monthlyData,
}: {
  monthlyData: ReturnType<typeof usePersonalProgress>['data']['monthlyData']
}) {
  return (
    <MotiView
      from={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 300 }}
    >
      <Card style={styles.chartCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monthly Progress</Text>
          <Text style={styles.sectionSubtitle}>kg CO2 saved</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={{
              labels: monthlyData.labels,
              datasets: [{ data: monthlyData.values }],
            }}
            width={screenWidth * 1.4}
            height={180}
            yAxisSuffix='kg'
            fromZero
            chartConfig={{
              backgroundColor: Colors.white,
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              decimalPlaces: 1,
              color: () => Colors.primary,
              labelColor: () => Colors.textSecondary,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: Colors.primary,
              },
              propsForBackgroundLines: {
                stroke: Colors.border,
              },
              fillShadowGradientFrom: Colors.primary,
              fillShadowGradientTo: Colors.white,
              fillShadowGradientOpacity: 0.2,
            }}
            bezier
            style={styles.chart}
          />
        </ScrollView>
      </Card>
    </MotiView>
  )
}

// Recent Actions Section
function RecentActionsSection({ actions }: { actions: RecentAction[] }) {
  return (
    <MotiView
      from={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 400 }}
    >
      <Card style={styles.actionsCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Actions</Text>
          <Pressable style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
            <Feather name='chevron-right' size={14} color={Colors.primary} />
          </Pressable>
        </View>

        <View style={styles.actionsList}>
          {actions.slice(0, 4).map((action, index) => (
            <ActionItem key={action.id} action={action} index={index} />
          ))}
        </View>
      </Card>
    </MotiView>
  )
}

function ActionItem({
  action,
  index,
}: {
  action: RecentAction
  index: number
}) {
  const iconMap: Record<
    RecentAction['icon'],
    React.ComponentProps<typeof Feather>['name']
  > = {
    bike: 'navigation',
    zap: 'zap',
    'trash-2': 'trash-2',
    droplet: 'droplet',
    sun: 'sun',
    'shopping-bag': 'shopping-bag',
  }

  return (
    <MotiView
      from={{ translateX: -20, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 300, delay: 450 + index * 50 }}
    >
      <View style={styles.actionItem}>
        <View style={styles.actionIcon}>
          <Feather
            name={iconMap[action.icon]}
            size={16}
            color={Colors.primary}
          />
        </View>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>{action.title}</Text>
          <Text style={styles.actionTime}>{action.timestamp}</Text>
        </View>
        <View style={styles.actionPoints}>
          <Text style={styles.actionPointsText}>+{action.points}</Text>
          <Text style={styles.actionPointsLabel}>pts</Text>
        </View>
      </View>
    </MotiView>
  )
}

// Challenge Section
function ChallengeSection({ challenge }: { challenge: WeeklyChallenge }) {
  const progressPercent = (challenge.progress / challenge.target) * 100

  return (
    <MotiView
      from={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 500 }}
    >
      <Card style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <View style={styles.challengeIconContainer}>
            <Feather name='target' size={20} color={Colors.primary} />
          </View>
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeDescription}>
              {challenge.description}
            </Text>
          </View>
          <View style={styles.challengeReward}>
            <Text style={styles.rewardValue}>+{challenge.reward}</Text>
            <Text style={styles.rewardLabel}>pts</Text>
          </View>
        </View>

        <View style={styles.challengeProgress}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              {challenge.progress}/{challenge.target} completed
            </Text>
            <Text style={styles.daysRemaining}>
              {challenge.daysRemaining} days left
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <MotiView
              from={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'timing', duration: 800, delay: 600 }}
              style={styles.progressFill}
            />
          </View>
        </View>
      </Card>
    </MotiView>
  )
}

// Achievements Section
function AchievementsSection({
  achievements,
}: {
  achievements: Achievement[]
}) {
  return (
    <MotiView
      from={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 600 }}
    >
      <Card style={styles.achievementsCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Pressable style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
            <Feather name='chevron-right' size={14} color={Colors.primary} />
          </Pressable>
        </View>

        <View style={styles.achievementsGrid}>
          {achievements.slice(0, 6).map((achievement, index) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </View>
      </Card>
    </MotiView>
  )
}

function AchievementBadge({
  achievement,
  index,
}: {
  achievement: Achievement
  index: number
}) {
  return (
    <MotiView
      from={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'timing', duration: 300, delay: 650 + index * 50 }}
    >
      <View
        style={[
          styles.achievementBadge,
          !achievement.unlocked && styles.achievementLocked,
        ]}
      >
        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
        {!achievement.unlocked && (
          <View style={styles.lockOverlay}>
            <Feather name='lock' size={12} color={Colors.textMuted} />
          </View>
        )}
        <Text
          style={[
            styles.achievementTitle,
            !achievement.unlocked && styles.achievementTitleLocked,
          ]}
          numberOfLines={1}
        >
          {achievement.title}
        </Text>
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  // Hero Card
  heroCard: {
    padding: 24,
    backgroundColor: Colors.white,
  },
  heroContent: {
    alignItems: 'center',
    gap: 16,
  },
  heroInfo: {
    alignItems: 'center',
  },
  heroPoints: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  heroNextLevel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    alignItems: 'center',
    gap: 8,
  },
  statBoxHighlight: {
    borderColor: Colors.tertiaryMedium,
    backgroundColor: Colors.tertiaryLight,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  statUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  // Chart Section
  chartCard: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
    marginLeft: -20,
  },
  // Actions Section
  actionsCard: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.primary,
  },
  actionsList: {
    gap: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  actionTime: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionPoints: {
    alignItems: 'flex-end',
  },
  actionPointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  actionPointsLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  // Challenge Section
  challengeCard: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  challengeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  challengeDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  challengeReward: {
    alignItems: 'flex-end',
    backgroundColor: Colors.tertiaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rewardValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.tertiaryDark,
  },
  rewardLabel: {
    fontSize: 10,
    color: Colors.tertiaryDark,
  },
  challengeProgress: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
  },
  daysRemaining: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  // Achievements Section
  achievementsCard: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementBadge: {
    width: (screenWidth - 40 - 20 - 24) / 3,
    aspectRatio: 1,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  achievementLocked: {
    backgroundColor: Colors.backgroundMuted,
    borderColor: Colors.border,
  },
  lockOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  achievementTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: Colors.textMuted,
  },
})
