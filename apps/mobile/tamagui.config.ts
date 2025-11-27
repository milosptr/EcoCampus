import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'
import { Colors } from './src/constants/Colors'

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
      background: Colors.background,
      backgroundPress: Colors.background,
      color: Colors.text,
      colorPress: Colors.text,
      primary: Colors.primary,
      secondary: Colors.secondary,
      tertiary: Colors.tertiary,
      quaternary: Colors.quaternary,
      error: Colors.error,
      warning: Colors.warning,
      success: Colors.success,
      info: Colors.info,
      border: Colors.border,
      // Tab-specific colors
      tabIconDefault: Colors.textMuted,
      tabIconSelected: Colors.primary,
    },
    dark: {
      ...defaultConfig.themes.dark,
      background: Colors.backgroundDark,
      backgroundPress: Colors.backgroundDark,
      color: Colors.white,
      colorPress: Colors.white,
      primary: Colors.secondary,
      secondary: Colors.secondary,
      tertiary: Colors.tertiary,
      quaternary: Colors.quaternary,
      error: Colors.error,
      warning: Colors.warning,
      success: Colors.success,
      info: Colors.info,
      // Tab-specific colors
      tabIconDefault: Colors.textMuted,
      tabIconSelected: Colors.secondary,
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
