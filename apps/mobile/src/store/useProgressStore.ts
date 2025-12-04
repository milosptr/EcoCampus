import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface CompletedAction {
  id: string
  title: string
  points: number
  co2Saved: number
  timestamp: string
  category: string
}

interface ProgressState {
  // Completed actions
  completedActions: CompletedAction[]

  // Cumulative stats
  totalPoints: number
  totalCo2Saved: number
  actionsThisWeek: number
  currentStreak: number

  // Weekly data
  weeklyActions: number[]
  weeklyCo2Saved: number[]

  // Actions
  addCompletedAction: (
    action: Omit<CompletedAction, 'id' | 'timestamp'>
  ) => void
  removeCompletedAction: (title: string) => void
  resetWeeklyData: () => void
  updateStreak: (streak: number) => void
  reset: () => void
}

const initialState = {
  completedActions: [],
  totalPoints: 450,
  totalCo2Saved: 0,
  actionsThisWeek: 17,
  currentStreak: 7,
  weeklyActions: [0, 0, 0, 0, 0, 0, 0], // 7 days
  weeklyCo2Saved: [0, 0, 0, 0, 0, 0, 0],
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addCompletedAction: (actionData) => {
        const action: CompletedAction = {
          ...actionData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        }

        set((state) => ({
          completedActions: [action, ...state.completedActions],
          totalPoints: state.totalPoints + action.points,
          totalCo2Saved: state.totalCo2Saved + action.co2Saved,
          actionsThisWeek: state.actionsThisWeek + 1,
        }))

        // Update weekly data
        const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
        set((state) => {
          const newWeeklyActions = [...state.weeklyActions]
          const newWeeklyCo2Saved = [...state.weeklyCo2Saved]
          newWeeklyActions[today] += 1
          newWeeklyCo2Saved[today] += action.co2Saved
          return {
            weeklyActions: newWeeklyActions,
            weeklyCo2Saved: newWeeklyCo2Saved,
          }
        })
      },

      removeCompletedAction: (title) => {
        const state = get()
        const actionToRemove = state.completedActions.find(
          (a) => a.title === title
        )
        if (!actionToRemove) return

        set((state) => ({
          completedActions: state.completedActions.filter(
            (a) => a.id !== actionToRemove.id
          ),
          totalPoints: state.totalPoints - actionToRemove.points,
          totalCo2Saved: state.totalCo2Saved - actionToRemove.co2Saved,
          actionsThisWeek: state.actionsThisWeek - 1,
        }))

        // Update weekly data
        const today = new Date().getDay()
        set((state) => {
          const newWeeklyActions = [...state.weeklyActions]
          const newWeeklyCo2Saved = [...state.weeklyCo2Saved]
          newWeeklyActions[today] = Math.max(0, newWeeklyActions[today] - 1)
          newWeeklyCo2Saved[today] = Math.max(
            0,
            newWeeklyCo2Saved[today] - actionToRemove.co2Saved
          )
          return {
            weeklyActions: newWeeklyActions,
            weeklyCo2Saved: newWeeklyCo2Saved,
          }
        })
      },

      resetWeeklyData: () => {
        set({
          actionsThisWeek: 0,
          weeklyActions: [0, 0, 0, 0, 0, 0, 0],
          weeklyCo2Saved: [0, 0, 0, 0, 0, 0, 0],
        })
      },

      updateStreak: (streak) => {
        set({ currentStreak: streak })
      },

      reset: () => set(initialState),
    }),
    {
      name: 'progress-storage-v5',
      storage: createJSONStorage(() => AsyncStorage),
      // Persist all data
    }
  )
)
