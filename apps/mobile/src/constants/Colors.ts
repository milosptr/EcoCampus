// Design tokens - Single source of truth for all colors
// Import this in tamagui.config.ts and throughout the app

export const Colors = {
  // ═══════════════════════════════════════════════════════════
  // BRAND COLORS (Design System)
  // ═══════════════════════════════════════════════════════════
  primary: '#568366', // Main brand color (green)
  primaryLight: '#E8F5E9', // Primary light variant
  primaryDark: '#45A049', // Primary dark variant

  secondary: '#93C3A6', // Secondary brand color (light green)
  secondaryLight: '#D4EDE1', // Secondary light variant
  secondaryDark: '#7AB594', // Secondary dark variant

  tertiary: '#DCF790', // Tertiary brand color (yellow-green)
  tertiaryLight: '#FFF9C4', // Tertiary light variant
  tertiaryMedium: '#FFD54F', // Tertiary medium variant
  tertiaryDark: '#F57F17', // Tertiary dark variant

  quaternary: '#8E44AD', // Quaternary brand color (purple)
  quaternaryLight: '#F3E5F5', // Quaternary light variant
  quaternaryDark: '#6A1B9A', // Quaternary dark variant

  // ═══════════════════════════════════════════════════════════
  // NEUTRAL COLORS
  // ═══════════════════════════════════════════════════════════
  // Base
  white: '#FFFFFF',
  black: '#111111',

  // Backgrounds
  background: '#F3F7EC', // Main app background (light green-tinted)
  backgroundDark: '#1C240F', // Dark mode background
  backgroundCard: '#FFFFFF', // Card background
  backgroundMuted: '#F5F5F5', // Muted/disabled background

  // Text
  text: '#1A1A1A', // Primary text
  textSecondary: '#757575', // Secondary text
  textMuted: '#9E9E9E', // Muted/disabled text
  textLight: '#BDBDBD', // Very light text

  // Borders
  border: '#E0E0E0', // Standard border
  borderLight: '#F0F0F0', // Light border

  // States
  success: '#4CAF50', // Success state (green)
  successLight: '#E8F5E9', // Success background
  successDark: '#2E7D32', // Success border/text

  // Aliases for semantic usage
  buttonPrimary: '#93C3A6', // Same as secondary - for primary buttons
  buttonPrimaryBorder: '#7AB594', // Darker shade of secondary for borders

  error: '#FC6E53', // Error state
  warning: '#FED056', // Warning state
  info: '#2196F3', // Info state
  infoLight: '#E3F2FD', // Info background
  infoDark: '#1565C0', // Info border/text

  // ═══════════════════════════════════════════════════════════
  // COMPONENT-SPECIFIC (if needed, prefer brand/neutral above)
  // ═══════════════════════════════════════════════════════════
  disabled: '#BDBDBD',

  // Third-party brand colors
  googleBlue: '#4285F4',
  googleBorder: '#DADCE0',
  googleText: '#3C4043',
} as const
