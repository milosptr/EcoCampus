import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import type { RankingEntry } from '@/src/hooks/useLeaderboard'
import { RankingRow } from './RankingRow'

interface RankingsCardProps {
  rankings: RankingEntry[]
  currentUserRank: number
  showTopThree?: boolean
}

export function RankingsCard({
  rankings,
  currentUserRank,
  showTopThree = false,
}: RankingsCardProps) {
  // Filter to show rankings 4+ unless showTopThree is true
  const displayRankings = showTopThree ? rankings : rankings.filter((r) => r.rank > 3)

  return (
    <MotiView
      from={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'timing', duration: 500, delay: 400 }}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {showTopThree ? 'All Rankings' : 'Rankings'}
          </Text>
          <Text style={styles.count}>
            {displayRankings.length} students
          </Text>
        </View>

        <View style={styles.rankingsList}>
          {displayRankings.map((entry, index) => (
            <RankingRow
              key={entry.rank}
              rank={entry.rank}
              name={entry.name}
              university={entry.university}
              points={entry.points}
              positionChange={entry.positionChange}
              isCurrentUser={entry.rank === currentUserRank}
              delay={450 + index * 50}
            />
          ))}
        </View>

        {displayRankings.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No rankings available</Text>
          </View>
        )}
      </Card>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: Colors.white,
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
  count: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  rankingsList: {
    gap: 4,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
})
