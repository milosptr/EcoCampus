import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import type { UniversityRanking } from '@/src/hooks/useLeaderboard'

interface UniversityRankingsCardProps {
  rankings: UniversityRanking[]
}

export function UniversityRankingsCard({ rankings }: UniversityRankingsCardProps) {
  return (
    <MotiView
      from={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'timing', duration: 500, delay: 200 }}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>University Rankings</Text>
          <Text style={styles.count}>{rankings.length} universities</Text>
        </View>

        <View style={styles.rankingsList}>
          {rankings.map((uni, index) => (
            <UniversityRow
              key={uni.rank}
              ranking={uni}
              delay={300 + index * 50}
            />
          ))}
        </View>
      </Card>
    </MotiView>
  )
}

interface UniversityRowProps {
  ranking: UniversityRanking
  delay: number
}

function UniversityRow({ ranking, delay }: UniversityRowProps) {
  const isTop3 = ranking.rank <= 3
  const medalColor =
    ranking.rank === 1
      ? Colors.gold
      : ranking.rank === 2
        ? Colors.silver
        : ranking.rank === 3
          ? Colors.bronze
          : Colors.textSecondary

  return (
    <MotiView
      from={{ translateX: -20, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 300, delay }}
    >
      <View style={styles.row}>
        {/* Rank */}
        <View
          style={[
            styles.rankCircle,
            isTop3 && { backgroundColor: medalColor + '20', borderColor: medalColor },
          ]}
        >
          {isTop3 ? (
            <Feather name="award" size={16} color={medalColor} />
          ) : (
            <Text style={styles.rankText}>{ranking.rank}</Text>
          )}
        </View>

        {/* University Info */}
        <View style={styles.uniInfo}>
          <Text style={styles.uniName} numberOfLines={1}>
            {ranking.name}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Feather name="users" size={10} color={Colors.textSecondary} />
              <Text style={styles.statText}>{ranking.studentCount} students</Text>
            </View>
            <View style={styles.stat}>
              <Feather name="feather" size={10} color={Colors.primary} />
              <Text style={styles.statText}>{ranking.avgCo2Saved}kg avg</Text>
            </View>
          </View>
        </View>

        {/* Total Points */}
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>{(ranking.totalPoints / 1000).toFixed(1)}k</Text>
          <Text style={styles.pointsLabel}>pts</Text>
        </View>
      </View>
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
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  rankCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundMuted,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  uniInfo: {
    flex: 1,
    marginLeft: 12,
  },
  uniName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  pointsLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
})
