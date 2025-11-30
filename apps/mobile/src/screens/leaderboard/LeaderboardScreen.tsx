import { ScrollView, StyleSheet, View } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'
import { SafeAreaScreen, Card } from '@/src/components'
import { trpc } from '@/src/trpc'

export default function LeaderboardScreen() {
  const { data, isLoading, error } = trpc.leaderboard.studentMonthly.useQuery()

  return (
    <SafeAreaScreen>
      <View style={styles.headerContainer}>
        <YStack {...({ gap: 4 } as any)}>
          <Text
            {...({
              fontSize: 20,
              fontWeight: '600',
              color: Colors.white,
            } as any)}
          >
            Leaderboard
          </Text>
          <Text
            {...({
              fontSize: 14,
              color: 'rgba(255,255,255,0.85)',
            } as any)}
          >
            {data?.periodLabel ?? 'This Month'}
          </Text>
        </YStack>
        <View style={styles.headerIconWrapper}>
          <Feather name='calendar' size={20} color={Colors.primary} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && (
          <Text
            {...({
              alignSelf: 'center',
              marginTop: 24,
              color: Colors.textSecondary,
            } as any)}
          >
            Loading leaderboard...
          </Text>
        )}

        {error && !isLoading && (
          <Text
            {...({
              alignSelf: 'center',
              marginTop: 24,
              color: Colors.error,
            } as any)}
          >
            Could not load leaderboard. Please try again.
          </Text>
        )}

        {data && !isLoading && !error && (
          <YStack {...({ gap: 24 } as any)}>
            {/* Top Performers */}
            <Card style={styles.cardSection}>
              <Text
                {...({
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.primary,
                  marginBottom: 16,
                } as any)}
              >
                Top Performers
              </Text>

              <XStack
                {...({
                  justifyContent: 'space-between',
                  marginBottom: 12,
                } as any)}
              >
                {data.topPerformers.map((entry) => (
                  <YStack
                    key={entry.rank}
                    {...({
                      alignItems: 'center',
                      gap: 8,
                    } as any)}
                  >
                    <View
                      style={[
                        styles.topBadge,
                        entry.rank === 1 && styles.topBadgeFirst,
                        entry.rank === 2 && styles.topBadgeSecond,
                        entry.rank === 3 && styles.topBadgeThird,
                      ]}
                    >
                      <Text
                        {...({
                          fontSize: 16,
                          fontWeight: '600',
                          color: entry.rank === 2 ? Colors.text : Colors.white,
                        } as any)}
                      >
                        {entry.initials}
                      </Text>
                    </View>
                    <Text
                      {...({
                        fontSize: 12,
                        color: Colors.textSecondary,
                      } as any)}
                    >
                      {entry.rank === 1 && '1st'}
                      {entry.rank === 2 && '2nd'}
                      {entry.rank === 3 && '3rd'}
                    </Text>
                  </YStack>
                ))}
              </XStack>

              {data.rankings.slice(0, 3).map((entry) => (
                <View key={entry.rank} style={styles.listRow}>
                  <Text
                    {...({ fontSize: 14, color: Colors.textSecondary } as any)}
                  >
                    {entry.rank}
                  </Text>
                  <YStack {...({ flex: 1, marginLeft: 12 } as any)}>
                    <Text
                      {...({
                        fontSize: 15,
                        fontWeight: '500',
                        color: Colors.primary,
                      } as any)}
                    >
                      {entry.name}
                    </Text>
                    <Text
                      {...({
                        fontSize: 12,
                        color: Colors.textSecondary,
                      } as any)}
                    >
                      {entry.university}
                    </Text>
                  </YStack>
                  <Text
                    {...({
                      fontSize: 15,
                      fontWeight: '500',
                      color: Colors.primary,
                    } as any)}
                  >
                    {entry.points} pts
                  </Text>
                </View>
              ))}
            </Card>

            {/* Your Rank */}
            <Card style={styles.cardSection}>
              <Text
                {...({
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.primary,
                  marginBottom: 16,
                } as any)}
              >
                Your Rank
              </Text>

              <XStack {...({ alignItems: 'center', gap: 16 } as any)}>
                <View style={styles.yourRankBadge}>
                  <Text
                    {...({
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.primary,
                    } as any)}
                  >
                    {data.yourRank.rank}
                  </Text>
                </View>

                <YStack {...({ flex: 1 } as any)}>
                  <Text
                    {...({
                      fontSize: 16,
                      fontWeight: '600',
                      color: Colors.primary,
                    } as any)}
                  >
                    {data.yourRank.name}
                  </Text>
                  <Text
                    {...({ fontSize: 12, color: Colors.textSecondary } as any)}
                  >
                    {data.yourRank.university}
                  </Text>
                </YStack>

                <YStack {...({ alignItems: 'flex-end', gap: 8 } as any)}>
                  <Text
                    {...({
                      fontSize: 16,
                      fontWeight: '600',
                      color: Colors.primary,
                    } as any)}
                  >
                    {data.yourRank.points} pts
                  </Text>
                  <View style={styles.ecoLevelPill}>
                    <Text
                      {...({
                        fontSize: 11,
                        fontWeight: '500',
                        color: Colors.primary,
                      } as any)}
                    >
                      {data.yourRank.ecoLevel}
                    </Text>
                  </View>
                </YStack>
              </XStack>
            </Card>

            {/* All Rankings */}
            <Card style={styles.cardSection}>
              <Text
                {...({
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.primary,
                  marginBottom: 16,
                } as any)}
              >
                All Rankings
              </Text>

              <YStack {...({ gap: 8 } as any)}>
                {data.rankings.map((entry) => (
                  <View
                    key={entry.rank}
                    style={[
                      styles.listRow,
                      entry.rank === data.yourRank.rank &&
                        styles.listRowHighlighted,
                    ]}
                  >
                    <View style={styles.rankCircle}>
                      <Text
                        {...({
                          fontSize: 13,
                          fontWeight: '500',
                          color: Colors.textSecondary,
                        } as any)}
                      >
                        {entry.rank}
                      </Text>
                    </View>
                    <YStack {...({ flex: 1, marginLeft: 12 } as any)}>
                      <Text
                        {...({
                          fontSize: 15,
                          fontWeight: '500',
                          color: Colors.primary,
                        } as any)}
                      >
                        {entry.name}
                      </Text>
                      <Text
                        {...({
                          fontSize: 12,
                          color: Colors.textSecondary,
                        } as any)}
                      >
                        {entry.university}
                      </Text>
                    </YStack>
                    <Text
                      {...({
                        fontSize: 15,
                        fontWeight: '500',
                        color: Colors.primary,
                      } as any)}
                    >
                      {entry.points} pts
                    </Text>
                  </View>
                ))}
              </YStack>
            </Card>
          </YStack>
        )}
      </ScrollView>
    </SafeAreaScreen>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 24,
  },
  cardSection: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  topBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryLight,
  },
  topBadgeFirst: {
    backgroundColor: Colors.tertiary,
  },
  topBadgeSecond: {
    backgroundColor: '#E0E2E6',
  },
  topBadgeThird: {
    backgroundColor: Colors.tertiaryMedium,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listRowHighlighted: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.primaryLight,
  },
  yourRankBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  ecoLevelPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: Colors.tertiaryLight,
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundMuted,
  },
})
