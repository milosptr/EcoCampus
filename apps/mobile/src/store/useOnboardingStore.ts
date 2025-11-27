import { create } from 'zustand'

export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
export type DietaryPreference =
  | 'omnivore'
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
export type TransportMode = 'walk' | 'bike' | 'bus' | 'car' | 'carpool'
export type HousingType = 'dorm' | 'apartment' | 'house' | 'shared-housing'

interface OnboardingState {
  // Screen 2: Personal Profile
  fullName: string
  age: string
  gender: Gender | null
  dietaryPreference: DietaryPreference | null

  // Screen 3: University
  university: string

  // Screen 4: Commute & Living
  distanceFromCampus: number
  transportMode: TransportMode | null
  weeklyCampusVisits: number
  housingType: HousingType | null

  // Screen 5: Preferences
  joinLeaderboard: boolean
  dailyReminders: boolean
  weeklySummary: boolean

  // Actions
  setPersonalProfile: (data: {
    fullName: string
    age: string
    gender: Gender | null
    dietaryPreference: DietaryPreference | null
  }) => void
  setUniversity: (university: string) => void
  setCommuteMetrics: (data: {
    distanceFromCampus: number
    transportMode: TransportMode | null
    weeklyCampusVisits: number
    housingType: HousingType | null
  }) => void
  setPreferences: (data: {
    joinLeaderboard: boolean
    dailyReminders: boolean
    weeklySummary: boolean
  }) => void
  reset: () => void
}

const initialState = {
  fullName: '',
  age: '',
  gender: null,
  dietaryPreference: null,
  university: '',
  distanceFromCampus: 5,
  transportMode: null,
  weeklyCampusVisits: 5,
  housingType: null,
  joinLeaderboard: true,
  dailyReminders: true,
  weeklySummary: true,
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setPersonalProfile: (data) =>
    set({
      fullName: data.fullName,
      age: data.age,
      gender: data.gender,
      dietaryPreference: data.dietaryPreference,
    }),

  setUniversity: (university) => set({ university }),

  setCommuteMetrics: (data) =>
    set({
      distanceFromCampus: data.distanceFromCampus,
      transportMode: data.transportMode,
      weeklyCampusVisits: data.weeklyCampusVisits,
      housingType: data.housingType,
    }),

  setPreferences: (data) =>
    set({
      joinLeaderboard: data.joinLeaderboard,
      dailyReminders: data.dailyReminders,
      weeklySummary: data.weeklySummary,
    }),

  reset: () => set(initialState),
}))
