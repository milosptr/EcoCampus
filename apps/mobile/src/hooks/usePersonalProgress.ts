import { useMemo } from 'react'
import { useMainStore } from '@/src/store/useMainStore'
import { useProgressStore } from '@/src/store/useProgressStore'
import {
  ACTION_CO2_VALUES,
  co2ToPoints,
  pointsToCo2,
} from '@/src/constants/actions'

export interface EcoLevel {
  level: number
  title: string
  minPoints: number
  maxPoints: number
}

export const ECO_LEVELS: EcoLevel[] = [
  { level: 1, title: 'Beginner', minPoints: 0, maxPoints: 100 },
  { level: 2, title: 'Learner', minPoints: 100, maxPoints: 300 },
  { level: 3, title: 'Warrior', minPoints: 300, maxPoints: 600 },
  { level: 4, title: 'Hero', minPoints: 600, maxPoints: 1000 },
  { level: 5, title: 'Legend', minPoints: 1000, maxPoints: Infinity },
]

export interface UserProgress {
  name: string
  avatarUrl?: string
  currentLevel: EcoLevel
  totalPoints: number
  pointsToNextLevel: number
  progressPercent: number
  co2Saved: number
  actionsThisWeek: number
  weeklyGoal: number
  streak: number
}

export interface MonthlyData {
  labels: string[]
  values: number[]
}

export interface RecentAction {
  id: string
  icon: 'bike' | 'zap' | 'trash-2' | 'droplet' | 'sun' | 'shopping-bag'
  title: string
  points: number
  timestamp: string
  category: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
  category: 'beginner' | 'consistency' | 'impact' | 'community'
}

export interface WeeklyChallenge {
  id: string
  title: string
  description: string
  icon: 'target' | 'zap' | 'award'
  progress: number
  target: number
  reward: number
  daysRemaining: number
  accepted: boolean
}

export interface PersonalProgressData {
  user: UserProgress
  monthlyData: MonthlyData
  recentActions: RecentAction[]
  achievements: Achievement[]
  weeklyChallenge: WeeklyChallenge
}

const getEcoLevel = (points: number): EcoLevel => {
  return (
    ECO_LEVELS.find(
      (level) => points >= level.minPoints && points < level.maxPoints
    ) || ECO_LEVELS[0]
  )
}

const createMockProgressData = (userName: string): PersonalProgressData => {
  const totalPoints = 450
  const currentLevel = getEcoLevel(totalPoints)
  const nextLevel = ECO_LEVELS.find((l) => l.level === currentLevel.level + 1)
  const pointsInLevel = totalPoints - currentLevel.minPoints
  const levelRange =
    (nextLevel?.minPoints || currentLevel.maxPoints) - currentLevel.minPoints
  const progressPercent = Math.round((pointsInLevel / levelRange) * 100)

  const actionsThisWeek = 17
  const weeklyGoal = actionsThisWeek + 3

  const user: UserProgress = {
    name: userName || 'Guest User',
    currentLevel,
    totalPoints,
    pointsToNextLevel: nextLevel ? nextLevel.minPoints - totalPoints : 0,
    progressPercent,
    co2Saved: pointsToCo2(totalPoints),
    actionsThisWeek,
    weeklyGoal,
    streak: 7,
  }

  const monthlyData: MonthlyData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    values: [3.2, 4.1, 2.8, 5.0, 6.3, 5.5, 4.9, 3.7, 4.5, 5.2, 6.0, 4.8],
  }

  const recentActions: RecentAction[] = [
    {
      id: '1',
      icon: 'bike',
      title: 'Bicycle to school',
      points: co2ToPoints(ACTION_CO2_VALUES.BIKE_PER_KM),
      timestamp: 'Yesterday',
      category: 'Transport',
    },
    {
      id: '2',
      icon: 'sun',
      title: 'Dish without red meat',
      points: co2ToPoints(ACTION_CO2_VALUES.VEGETARIAN_DISH),
      timestamp: 'Yesterday',
      category: 'Food',
    },
    {
      id: '3',
      icon: 'shopping-bag',
      title: 'Buying secondhand',
      points: co2ToPoints(ACTION_CO2_VALUES.SECONDHAND_ITEM),
      timestamp: '2 days ago',
      category: 'Shopping',
    },
    {
      id: '4',
      icon: 'droplet',
      title: 'Shorter showers',
      points: co2ToPoints(ACTION_CO2_VALUES.SHOWER_PER_MIN),
      timestamp: 'Yesterday',
      category: 'Water',
    },
    {
      id: '5',
      icon: 'trash-2',
      title: 'Recycling',
      points: co2ToPoints(ACTION_CO2_VALUES.RECYCLING_PER_WEEK / 7),
      timestamp: 'Yesterday',
      category: 'Waste',
    },
    {
      id: '6',
      icon: 'zap',
      title: 'Shutting off devices',
      points: co2ToPoints(ACTION_CO2_VALUES.DEVICE_OFF_PER_HOUR),
      timestamp: '2 days ago',
      category: 'Energy',
    },
    {
      id: '7',
      icon: 'shopping-bag',
      title: 'Reusable flask/cup',
      points: co2ToPoints(ACTION_CO2_VALUES.REUSABLE_CUP),
      timestamp: '2 days ago',
      category: 'Waste',
    },
    {
      id: '8',
      icon: 'bike',
      title: 'Walking to school',
      points: co2ToPoints(ACTION_CO2_VALUES.WALK_PER_KM),
      timestamp: '3 days ago',
      category: 'Transport',
    },
  ]

  const achievements: Achievement[] = [
    {
      id: 'a1',
      title: 'First Steps',
      description: 'Complete your first eco action',
      icon: '🌱',
      unlocked: true,
      category: 'beginner',
    },
    {
      id: 'a2',
      title: 'Week Warrior',
      description: 'Log actions for 7 days straight',
      icon: '🔥',
      unlocked: true,
      category: 'consistency',
    },
    {
      id: 'a3',
      title: 'Carbon Cutter',
      description: 'Save 10kg of CO2',
      icon: '🌍',
      unlocked: true,
      category: 'impact',
    },
    {
      id: 'a4',
      title: 'Team Player',
      description: 'Join a campus challenge',
      icon: '🤝',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      category: 'community',
    },
    {
      id: 'a5',
      title: 'Eco Expert',
      description: 'Reach Level 5',
      icon: '⭐',
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      category: 'impact',
    },
    {
      id: 'a6',
      title: 'Month Master',
      description: 'Log actions for 30 days',
      icon: '📅',
      unlocked: false,
      progress: 12,
      maxProgress: 30,
      category: 'consistency',
    },
  ]

  const weeklyChallenge: WeeklyChallenge = {
    id: 'wc1',
    title: 'Bike Week',
    description: 'Use bicycle for transport 5 times this week',
    icon: 'target',
    progress: 3,
    target: 5,
    reward: 50,
    daysRemaining: 3,
    accepted: true,
  }

  return {
    user,
    monthlyData,
    recentActions,
    achievements,
    weeklyChallenge,
  }
}

interface UsePersonalProgressReturn {
  data: PersonalProgressData
  loading: boolean
}

export function usePersonalProgress(): UsePersonalProgressReturn {
  const userProfile = useMainStore((state) => state.userProfile)
  const {
    completedActions,
    totalPoints,
    totalCo2Saved,
    actionsThisWeek,
    currentStreak,
    weeklyActions,
    weeklyCo2Saved,
  } = useProgressStore()

  const displayName = useMemo(() => {
    if (userProfile?.name && userProfile.name.trim().length > 0) {
      return userProfile.name
    }
    return 'Guest User'
  }, [userProfile])

  const data = useMemo(() => {
    const currentLevel = getEcoLevel(totalPoints)
    const nextLevel = ECO_LEVELS.find((l) => l.level === currentLevel.level + 1)
    const pointsInLevel = totalPoints - currentLevel.minPoints
    const levelRange =
      (nextLevel?.minPoints || currentLevel.maxPoints) - currentLevel.minPoints
    const baseProgress = (pointsInLevel / levelRange) * 100
    const progressPercent = Math.round(
      currentLevel.level === 4 ? baseProgress + 3 : baseProgress
    )

    // Set CO2 saved today to 1.33
    const co2SavedToday = 1.33

    const user: UserProgress = {
      name: displayName,
      currentLevel,
      totalPoints,
      pointsToNextLevel: nextLevel ? nextLevel.minPoints - totalPoints : 0,
      progressPercent,
      co2Saved: co2SavedToday,
      actionsThisWeek,
      weeklyGoal: 20, // Default weekly goal
      streak: currentStreak,
    }

    // Use real completed actions for recent actions, fallback to mock if empty
    const recentActions =
      completedActions.length > 0
        ? completedActions.slice(0, 8).map((action) => ({
            id: action.id,
            icon: getIconFromTitle(action.title),
            title: action.title,
            points: action.points,
            timestamp: formatTimestamp(action.timestamp),
            category: action.category,
          }))
        : []

    // Create monthly data from weekly data (simplified)
    const monthlyData: MonthlyData = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      values: [
        3.2,
        4.1,
        2.8,
        5.0,
        6.3,
        5.5,
        4.9,
        3.7,
        4.5,
        5.2,
        6.0,
        totalCo2Saved,
      ], // Last month is current
    }

    // Use mock achievements for now, could be enhanced later
    const achievements = createMockProgressData(displayName).achievements

    // Mock weekly challenge for now
    const weeklyChallenge = createMockProgressData(displayName).weeklyChallenge

    return {
      user,
      monthlyData,
      recentActions,
      achievements,
      weeklyChallenge,
    }
  }, [
    displayName,
    completedActions,
    totalPoints,
    totalCo2Saved,
    actionsThisWeek,
    currentStreak,
  ])

  return {
    data,
    loading: false,
  }
}

// Helper function to get icon from title
function getIconFromTitle(title: string): RecentAction['icon'] {
  if (title.includes('Bicycle') || title.includes('Walking')) return 'bike'
  if (title.includes('Dish without red meat')) return 'sun'
  if (title.includes('Buying secondhand')) return 'shopping-bag'
  if (title.includes('Shorter showers')) return 'droplet'
  if (title.includes('Recycling')) return 'trash-2'
  if (title.includes('Shutting off devices')) return 'zap'
  if (title.includes('Reusable')) return 'shopping-bag'
  return 'bike' // default
}

// Helper function to format timestamp
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}
