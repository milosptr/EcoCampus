import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'

// Custom color palette from Colors.ts
const customColors = {
  background: '#F3F7EC',
  backgroundDark: '#1C240F',
  primary: '#568366',
  primaryDisabled: '#baccbf',
  secondary: '#93C3A6',
  tertiary: '#DCF790',
  error: '#FC6E53',
  warning: '#FED056',
  white: '#FFFFFF',
  black: '#111111',
}

export const tamaguiConfig = createTamagui({
  ...defaultConfig,

  // Native-only optimizations
  settings: {
    ...defaultConfig.settings,
    disableSSR: true, // No web/SSR for native-only apps
    fastSchemeChange: true, // Enables iOS DynamicColorIOS for faster dark/light mode switching
  },

  // Define custom themes (mobile-optimized, no hover/focus states)
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      background: customColors.background,
      backgroundPress: customColors.background,
      color: customColors.black,
      colorPress: customColors.black,
      primary: customColors.primary,
      secondary: customColors.secondary,
      tertiary: customColors.tertiary,
      error: customColors.error,
      warning: customColors.warning,
      // Tab-specific colors
      tabIconDefault: customColors.primaryDisabled,
      tabIconSelected: customColors.primary,
    },
    dark: {
      ...defaultConfig.themes.dark,
      background: customColors.backgroundDark,
      backgroundPress: customColors.backgroundDark,
      color: customColors.white,
      colorPress: customColors.white,
      primary: customColors.secondary,
      secondary: customColors.secondary,
      tertiary: customColors.tertiary,
      error: customColors.error,
      warning: customColors.warning,
      // Tab-specific colors
      tabIconDefault: customColors.primaryDisabled,
      tabIconSelected: customColors.secondary,
    },
  },

  media: {
    ...defaultConfig.media,
  },
})

type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
