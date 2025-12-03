import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'

interface RankingRowProps {
  rank: number
  name: string
  university: string
  points: number
  positionChange?: number
  isCurrentUser?: boolean
  delay?: number
}

export function RankingRow({
  rank,
  name,
  university,
  points,
  positionChange = 0,
  isCurrentUser = false,
  delay = 0,
}: RankingRowProps) {
  const getPositionChangeDisplay = () => {
    if (positionChange === 0) {
      return { icon: 'minus' as const, color: Colors.trendNeutral, text: '' }
    }
    if (positionChange > 0) {
      return {
        icon: 'arrow-up' as const,
        color: Colors.trendUp,
        text: `+${positionChange}`,
      }
    }
    return {
      icon: 'arrow-down' as const,
      color: Colors.trendDown,
      text: `${positionChange}`,
    }
  }

  const change = getPositionChangeDisplay()

  return (
    <MotiView
      from={{ translateX: -20, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 300, delay }}
    >
      <View style={[styles.row, isCurrentUser && styles.rowHighlighted]}>
        {/* Rank Circle */}
        <View
          style={[styles.rankCircle, isCurrentUser && styles.rankCircleHighlighted]}
        >
          <Text
            style={[styles.rankText, isCurrentUser && styles.rankTextHighlighted]}
          >
            {rank}
          </Text>
        </View>

        {/* Position Change Indicator */}
        <View style={styles.changeIndicator}>
          <Feather name={change.icon} size={12} color={change.color} />
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text
            style={[styles.name, isCurrentUser && styles.nameHighlighted]}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text style={styles.university} numberOfLines={1}>
            {university}
          </Text>
        </View>

        {/* Points */}
        <View style={styles.pointsContainer}>
          <Text style={[styles.points, isCurrentUser && styles.pointsHighlighted]}>
            {points.toLocaleString()}
          </Text>
          <Text style={styles.pointsLabel}>pts</Text>
        </View>
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  rowHighlighted: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    marginHorizontal: -8,
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundMuted,
  },
  rankCircleHighlighted: {
    backgroundColor: Colors.primary,
  },
  rankText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  rankTextHighlighted: {
    color: Colors.white,
  },
  changeIndicator: {
    width: 24,
    alignItems: 'center',
    marginLeft: 4,
  },
  userInfo: {
    flex: 1,
    marginLeft: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  nameHighlighted: {
    fontWeight: '600',
    color: Colors.primary,
  },
  university: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  pointsHighlighted: {
    color: Colors.primary,
  },
  pointsLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
})
