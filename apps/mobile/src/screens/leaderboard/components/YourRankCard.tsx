import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import type { YourRank } from '@/src/hooks/useLeaderboard'

interface YourRankCardProps {
  yourRank: YourRank
  displayName: string
}

export function YourRankCard({ yourRank, displayName }: YourRankCardProps) {
  // Calculate progress to next rank (mock: assuming 500 points between ranks)
  const progressPercent = Math.min(
    100,
    ((500 - yourRank.pointsToNextRank) / 500) * 100
  )

  return (
    <MotiView
      from={{ translateX: -30, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 300 }}
    >
      <Card variant="highlight" style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Rank</Text>
          {yourRank.streak > 0 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakText}>{yourRank.streak} day streak</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Large Rank Badge */}
          <View style={styles.rankBadge}>
            <Text style={styles.rankHash}>#</Text>
            <MotiView
              from={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            >
              <Text style={styles.rankNumber}>{yourRank.rank}</Text>
            </MotiView>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.university}>{yourRank.university}</Text>
            <View style={styles.pointsRow}>
              <Feather name="star" size={14} color={Colors.tertiary} />
              <Text style={styles.points}>{yourRank.points.toLocaleString()} pts</Text>
            </View>
          </View>

          {/* Eco Level */}
          <View style={styles.ecoLevelContainer}>
            <View style={styles.ecoLevelPill}>
              <Feather name="award" size={12} color={Colors.primary} />
              <Text style={styles.ecoLevelText}>{yourRank.ecoLevel}</Text>
            </View>
          </View>
        </View>

        {/* Progress to next rank */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress to #{yourRank.rank - 1}</Text>
            <Text style={styles.progressPoints}>
              {yourRank.pointsToNextRank} pts to go
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <MotiView
              from={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'timing', duration: 800, delay: 500 }}
              style={styles.progressFill}
            />
          </View>
        </View>
      </Card>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.tertiaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakIcon: {
    fontSize: 12,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.tertiaryDark,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  rankBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  rankHash: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: -2,
  },
  rankNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  university: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  points: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  ecoLevelContainer: {
    alignItems: 'flex-end',
  },
  ecoLevelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ecoLevelText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
  progressSection: {
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  progressPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
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
})
