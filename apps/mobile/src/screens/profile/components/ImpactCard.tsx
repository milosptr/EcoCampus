import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'
import { TrendIndicator } from '@/src/components'
import type { ImpactStats } from '@/src/hooks/useProfile'

interface ImpactCardProps {
  stats: ImpactStats
  onViewProgress: () => void
}

export function ImpactCard({ stats, onViewProgress }: ImpactCardProps) {
  return (
    <MotiView
      from={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'timing', duration: 500, delay: 300 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Impact</Text>
          <Pressable
            onPress={onViewProgress}
            style={({ pressed }) => [
              styles.viewAllButton,
              pressed && styles.viewAllButtonPressed,
            ]}
          >
            <Text style={styles.viewAllText}>View Details</Text>
            <Feather name="chevron-right" size={16} color={Colors.primary} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* CO2 Saved Card */}
          <MotiView
            from={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 400 }}
          >
            <View style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.primaryLight }]}>
                <Feather name="wind" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.statValue}>
                {stats.co2Saved}
                <Text style={styles.statUnit}> {stats.co2Unit}</Text>
              </Text>
              <Text style={styles.statLabel}>CO₂ Saved</Text>
              <View style={styles.trendContainer}>
                <TrendIndicator
                  value={stats.co2Trend.isPositive ? stats.co2Trend.value : -stats.co2Trend.value}
                  size="small"
                  suffix=""
                />
                <Text style={styles.trendLabel}>{stats.co2Trend.label}</Text>
              </View>
            </View>
          </MotiView>

          {/* Rank Card */}
          <MotiView
            from={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 500 }}
          >
            <View style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.goldLight }]}>
                <Feather name="award" size={20} color={Colors.gold} />
              </View>
              <Text style={styles.statValue}>#{stats.leaderboardRank}</Text>
              <Text style={styles.statLabel}>Leaderboard</Text>
              <View style={styles.trendContainer}>
                <TrendIndicator
                  value={stats.rankTrend.isPositive ? stats.rankTrend.value : -stats.rankTrend.value}
                  size="small"
                  suffix=""
                />
                <Text style={styles.trendLabel}>{stats.rankTrend.label}</Text>
              </View>
            </View>
          </MotiView>

          {/* Actions Card */}
          <MotiView
            from={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 600 }}
          >
            <View style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.tertiaryLight }]}>
                <Feather name="check-circle" size={20} color={Colors.tertiary} />
              </View>
              <Text style={styles.statValue}>{stats.actionsLogged}</Text>
              <Text style={styles.statLabel}>Actions</Text>
              <View style={styles.trendContainer}>
                <TrendIndicator
                  value={stats.actionsTrend.isPositive ? stats.actionsTrend.value : -stats.actionsTrend.value}
                  size="small"
                  suffix=""
                />
                <Text style={styles.trendLabel}>{stats.actionsTrend.label}</Text>
              </View>
            </View>
          </MotiView>
        </ScrollView>

        {/* Weekly Goal Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View style={styles.progressLabelRow}>
              <Feather name="target" size={16} color={Colors.primary} />
              <Text style={styles.progressLabel}>Weekly Goal</Text>
            </View>
            <Text style={styles.progressPercentage}>{stats.progressValue}%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <MotiView
              from={{ width: '0%' }}
              animate={{ width: `${stats.progressValue}%` }}
              transition={{ type: 'timing', duration: 800, delay: 500 }}
              style={styles.progressBarFill}
            />
          </View>
        </View>
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllButtonPressed: {
    opacity: 0.7,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  scrollContent: {
    gap: 12,
    paddingRight: 16,
  },
  statCard: {
    width: 140,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  trendLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  progressSection: {
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    backgroundColor: Colors.backgroundMuted,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
})
