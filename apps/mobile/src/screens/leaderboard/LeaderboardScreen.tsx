import { useState } from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { SafeAreaScreen } from '@/src/components'
import { Colors } from '@/src/constants/Colors'
import { useLeaderboard } from '@/src/hooks/useLeaderboard'
import { TopPerformersCard } from './components/TopPerformersCard'
import { YourRankCard } from './components/YourRankCard'
import { RankingsCard } from './components/RankingsCard'
import { UniversityRankingsCard } from './components/UniversityRankingsCard'

type TabType = 'students' | 'universities'

export default function LeaderboardScreen() {
  const { data, loading, displayName } = useLeaderboard()
  const [activeTab, setActiveTab] = useState<TabType>('students')

  if (loading) {
    return (
      <SafeAreaScreen style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading leaderboard...</Text>
        </View>
      </SafeAreaScreen>
    )
  }

  return (
    <SafeAreaScreen style={styles.container}>
      {/* Header */}
      <MotiView
        from={{ translateY: -20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Leaderboard</Text>
            <View style={styles.periodBadge}>
              <Text style={styles.periodText}>{data.periodLabel}</Text>
            </View>
          </View>
          <View style={styles.headerIconWrapper}>
            <Feather name="calendar" size={20} color={Colors.primary} />
          </View>
        </View>
      </MotiView>

      {/* Tab Switcher */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 100 }}
        style={styles.tabContainer}
      >
        <View style={styles.tabWrapper}>
          <TabButton
            label="Students"
            isActive={activeTab === 'students'}
            onPress={() => setActiveTab('students')}
          />
          <TabButton
            label="Universities"
            isActive={activeTab === 'universities'}
            onPress={() => setActiveTab('universities')}
          />
          {/* Animated indicator */}
          <MotiView
            animate={{
              translateX: activeTab === 'students' ? 0 : '100%',
            }}
            transition={{ type: 'timing', duration: 200 }}
            style={styles.tabIndicator}
          />
        </View>
      </MotiView>

      {/* Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'students' ? (
          <>
            <TopPerformersCard topPerformers={data.topPerformers} />
            <YourRankCard yourRank={data.yourRank} displayName={displayName} />
            <RankingsCard
              rankings={data.rankings}
              currentUserRank={data.yourRank.rank}
            />
          </>
        ) : (
          <UniversityRankingsCard rankings={data.universityRankings} />
        )}
      </ScrollView>
    </SafeAreaScreen>
  )
}

interface TabButtonProps {
  label: string
  isActive: boolean
  onPress: () => void
}

function TabButton({ label, isActive, onPress }: TabButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.tabButtonPressed,
      ]}
    >
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {label}
      </Text>
    </Pressable>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  periodBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  periodText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  headerIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 4,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  tabButtonPressed: {
    opacity: 0.7,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: '50%',
    height: '100%',
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    marginRight: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 120,
    gap: 16,
  },
})
