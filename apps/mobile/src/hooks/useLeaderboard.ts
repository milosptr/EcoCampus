import { useMemo } from 'react'
import { useMainStore } from '@/src/store/useMainStore'
import { pointsToCo2 } from '@/src/constants/actions'

export interface TopPerformer {
  rank: number
  name: string
  initials: string
  university: string
  points: number
  co2Saved: number
}

export interface RankingEntry {
  rank: number
  name: string
  university: string
  points: number
  positionChange: number // positive = moved up, negative = moved down, 0 = no change
}

export interface YourRank {
  rank: number
  name: string
  university: string
  points: number
  ecoLevel: string
  pointsToNextRank: number
  streak: number
}

export interface UniversityRanking {
  rank: number
  name: string
  totalPoints: number
  studentCount: number
  avgCo2Saved: number
}

export interface LeaderboardData {
  periodLabel: string
  topPerformers: TopPerformer[]
  yourRank: YourRank
  rankings: RankingEntry[]
  universityRankings: UniversityRanking[]
}

interface UseLeaderboardReturn {
  data: LeaderboardData
  loading: boolean
  isGuest: boolean
  displayName: string
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

const createMockLeaderboardData = (userName: string): LeaderboardData => {
  const rankings: RankingEntry[] = [
    {
      rank: 1,
      name: 'Emma Schmidt',
      university: 'Unicorn University',
      points: 2847,
      positionChange: 0,
    },
    {
      rank: 2,
      name: 'Liam Fischer',
      university: 'Uni Würzburg',
      points: 2634,
      positionChange: 1,
    },
    {
      rank: 3,
      name: 'Sophie Weber',
      university: 'Reykjavik University',
      points: 2521,
      positionChange: -1,
    },
    {
      rank: 4,
      name: 'Noah Müller',
      university: 'Unicorn University',
      points: 2398,
      positionChange: 2,
    },
    {
      rank: 5,
      name: userName || 'You',
      university: 'Uni Würzburg',
      points: 2156,
      positionChange: 0,
    },
    {
      rank: 6,
      name: 'Mia Hoffmann',
      university: 'Reykjavik University',
      points: 2043,
      positionChange: -2,
    },
    {
      rank: 7,
      name: 'Lucas Bauer',
      university: 'Uni Würzburg',
      points: 1987,
      positionChange: 1,
    },
    {
      rank: 8,
      name: 'Hannah Koch',
      university: 'Unicorn University',
      points: 1876,
      positionChange: 0,
    },
    {
      rank: 9,
      name: 'Felix Richter',
      university: 'Reykjavik University',
      points: 1754,
      positionChange: -1,
    },
    {
      rank: 10,
      name: 'Lea Schneider',
      university: 'Uni Würzburg',
      points: 1698,
      positionChange: 3,
    },
  ]

  const topPerformers: TopPerformer[] = rankings.slice(0, 3).map((entry) => ({
    rank: entry.rank,
    name: entry.name,
    university: entry.university,
    points: entry.points,
    initials: getInitials(entry.name),
    co2Saved: pointsToCo2(entry.points),
  }))

  const yourRank: YourRank = {
    rank: 5,
    name: userName || 'You',
    university: 'Uni Würzburg',
    points: 2156,
    ecoLevel: 'Eco Warrior',
    pointsToNextRank: 242, // Points needed to reach rank 4
    streak: 7,
  }

  const universityRankings: UniversityRanking[] = [
    {
      rank: 1,
      name: 'Unicorn University',
      totalPoints: 42850,
      studentCount: 218,
      avgCo2Saved: pointsToCo2(42850 / 218),
    },
    {
      rank: 2,
      name: 'Uni Würzburg',
      totalPoints: 38120,
      studentCount: 195,
      avgCo2Saved: pointsToCo2(38120 / 195),
    },
    {
      rank: 3,
      name: 'Reykjavik University',
      totalPoints: 31940,
      studentCount: 164,
      avgCo2Saved: pointsToCo2(31940 / 164),
    },
  ]

  return {
    periodLabel: 'December 2024',
    topPerformers,
    yourRank,
    rankings,
    universityRankings,
  }
}

export function useLeaderboard(): UseLeaderboardReturn {
  const userProfile = useMainStore((state) => state.userProfile)

  const isGuest = useMemo(() => {
    return (
      userProfile?.email === 'john.doe@example.com' &&
      userProfile?.authId === '1'
    )
  }, [userProfile])

  const displayName = useMemo(() => {
    if (userProfile?.name && userProfile.name.trim().length > 0) {
      return userProfile.name
    }
    return 'Guest User'
  }, [userProfile])

  const data = useMemo(() => {
    return createMockLeaderboardData(displayName)
  }, [displayName])

  return {
    data,
    loading: false,
    isGuest,
    displayName,
  }
}
