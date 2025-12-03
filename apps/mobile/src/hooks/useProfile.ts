import { useState, useCallback } from 'react'
import { useMainStore } from '@/src/store/useMainStore'
import { pointsToCo2 } from '@/src/constants/actions'

export interface EcoLevelInfo {
  level: number
  title: string
  color: string
}

export const ECO_LEVEL_CONFIG: Record<number, EcoLevelInfo> = {
  1: { level: 1, title: 'Beginner', color: '#9E9E9E' },
  2: { level: 2, title: 'Learner', color: '#64B5F6' },
  3: { level: 3, title: 'Warrior', color: '#81C784' },
  4: { level: 4, title: 'Hero', color: '#FFD54F' },
  5: { level: 5, title: 'Legend', color: '#FFD700' },
}

export interface ProfileData {
  userName: string
  university: string
  ecoLevel: number
  ecoLevelInfo: EcoLevelInfo
  avatarUrl: string
  fullName: string
  age: string
  gender: string
  distance: string
  transport: string
}

export interface StatTrend {
  value: number
  label: string
  isPositive: boolean
}

export interface ImpactStats {
  co2Saved: number
  co2Unit: string
  co2Trend: StatTrend
  actionsLogged: number
  actionsTrend: StatTrend
  leaderboardRank: number
  rankTrend: StatTrend
  progressValue: number
}

interface UseProfileReturn {
  userData: ProfileData
  impactStats: ImpactStats
  loading: boolean
  updateProfileField: (field: keyof ProfileData, value: string) => void
  updateAvatar: (imageUrl: string) => void
}

const createMockProfileData = (userName: string): ProfileData => {
  const ecoLevel = 3
  return {
    userName: userName || 'EcoCampus User',
    university: 'TU Munich',
    ecoLevel,
    ecoLevelInfo: ECO_LEVEL_CONFIG[ecoLevel],
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    fullName: userName || 'EcoCampus User',
    age: '22',
    gender: 'Female',
    distance: '5 km',
    transport: 'Bike',
  }
}

const createMockImpactStats = (): ImpactStats => {
  const totalPoints = 4200 // Total points earned
  const weeklyPoints = 1200 // Points earned this week

  return {
    co2Saved: pointsToCo2(totalPoints),
    co2Unit: 'kg',
    co2Trend: { value: pointsToCo2(weeklyPoints), label: 'this week', isPositive: true },
    actionsLogged: 156,
    actionsTrend: { value: 8, label: 'this week', isPositive: true },
    leaderboardRank: 5,
    rankTrend: { value: 2, label: 'positions up', isPositive: true },
    progressValue: 75,
  }
}

export function useProfile(): UseProfileReturn {
  const userProfile = useMainStore((state) => state.userProfile)

  const [userData, setUserData] = useState<ProfileData>(() =>
    createMockProfileData(userProfile?.name ?? '')
  )

  const [impactStats] = useState<ImpactStats>(createMockImpactStats)

  const updateProfileField = useCallback(
    (field: keyof ProfileData, value: string) => {
      setUserData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const updateAvatar = useCallback((imageUrl: string) => {
    setUserData((prev) => ({ ...prev, avatarUrl: imageUrl }))
  }, [])

  return {
    userData,
    impactStats,
    loading: false,
    updateProfileField,
    updateAvatar,
  }
}
