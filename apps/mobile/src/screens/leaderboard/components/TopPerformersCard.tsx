import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import type { TopPerformer } from '@/src/hooks/useLeaderboard'

interface TopPerformersCardProps {
  topPerformers: TopPerformer[]
}

export function TopPerformersCard({ topPerformers }: TopPerformersCardProps) {
  // Reorder for podium: 2nd, 1st, 3rd
  const podiumOrder = [
    topPerformers.find((p) => p.rank === 2),
    topPerformers.find((p) => p.rank === 1),
    topPerformers.find((p) => p.rank === 3),
  ].filter(Boolean) as TopPerformer[]

  return (
    <MotiView
      from={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'timing', duration: 500, delay: 200 }}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>Top Performers</Text>

        <View style={styles.podiumContainer}>
          {podiumOrder.map((performer, index) => (
            <PodiumItem
              key={performer.rank}
              performer={performer}
              position={index === 0 ? 2 : index === 1 ? 1 : 3}
              delay={300 + index * 100}
            />
          ))}
        </View>
      </Card>
    </MotiView>
  )
}

interface PodiumItemProps {
  performer: TopPerformer
  position: 1 | 2 | 3
  delay: number
}

function PodiumItem({ performer, position, delay }: PodiumItemProps) {
  const isFirst = position === 1
  const avatarSize = isFirst ? 72 : position === 2 ? 56 : 52
  const podiumHeight = isFirst ? 80 : position === 2 ? 60 : 50

  const ringColor =
    position === 1 ? Colors.gold : position === 2 ? Colors.silver : Colors.bronze
  const bgColor =
    position === 1
      ? Colors.goldLight
      : position === 2
        ? Colors.silverLight
        : Colors.bronzeLight

  return (
    <MotiView
      from={{ translateY: 30, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay }}
      style={[styles.podiumItem, isFirst && styles.podiumItemFirst]}
    >
      {/* Crown for 1st place */}
      {isFirst && (
        <View style={styles.crownContainer}>
          <Text style={styles.crown}>👑</Text>
        </View>
      )}

      {/* Avatar */}
      <View
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            borderColor: ringColor,
            backgroundColor: bgColor,
          },
        ]}
      >
        <Text
          style={[
            styles.initials,
            { fontSize: isFirst ? 24 : 18, color: ringColor },
          ]}
        >
          {performer.initials}
        </Text>
      </View>

      {/* Name */}
      <Text style={styles.name} numberOfLines={1}>
        {performer.name.split(' ')[0]}
      </Text>

      {/* CO2 Saved */}
      <View style={styles.co2Container}>
        <Feather name="feather" size={12} color={Colors.primary} />
        <Text style={styles.co2Text}>{performer.co2Saved}kg</Text>
      </View>

      {/* Podium base */}
      <View
        style={[
          styles.podiumBase,
          {
            height: podiumHeight,
            backgroundColor:
              position === 1
                ? Colors.gold
                : position === 2
                  ? Colors.silver
                  : Colors.bronze,
          },
        ]}
      >
        <Text style={styles.rankNumber}>{position}</Text>
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 20,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 12,
    paddingTop: 20,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumItemFirst: {
    marginTop: -20,
  },
  crownContainer: {
    marginBottom: 4,
  },
  crown: {
    fontSize: 24,
  },
  avatar: {
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  initials: {
    fontWeight: '700',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    maxWidth: 80,
    textAlign: 'center',
  },
  co2Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  co2Text: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.primary,
  },
  podiumBase: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginTop: 8,
  },
})
