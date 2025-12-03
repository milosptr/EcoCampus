import { useState, useCallback } from 'react'

export interface SettingsState {
  dailyReminders: boolean
  weeklyReports: boolean
  leaderboardUpdates: boolean
  dataSharing: boolean
  analyticsTracking: boolean
}

interface UseSettingsReturn {
  settings: SettingsState
  unitSystem: string
  language: string
  toggleSetting: (key: keyof SettingsState) => void
  setUnitSystem: (unit: string) => void
  setLanguage: (lang: string) => void
}

const DEFAULT_SETTINGS: SettingsState = {
  dailyReminders: true,
  weeklyReports: false,
  leaderboardUpdates: true,
  dataSharing: false,
  analyticsTracking: true,
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS)
  const [unitSystem, setUnitSystemState] = useState('Metric (km)')
  const [language, setLanguageState] = useState('English')

  const toggleSetting = useCallback((key: keyof SettingsState) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const setUnitSystem = useCallback((unit: string) => {
    setUnitSystemState(unit)
  }, [])

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang)
  }, [])

  return {
    settings,
    unitSystem,
    language,
    toggleSetting,
    setUnitSystem,
    setLanguage,
  }
}
