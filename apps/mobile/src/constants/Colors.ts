const palette = {
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

export default {
  light: {
    ...palette,
    text: palette.black,
    background: palette.background,
    tint: palette.primary,
    tabIconDefault: palette.primaryDisabled,
    tabIconSelected: palette.primary,
  },
  dark: {
    ...palette,
    text: palette.white,
    background: palette.backgroundDark,
    tint: palette.secondary,
    tabIconDefault: palette.primaryDisabled,
    tabIconSelected: palette.secondary,
  },
}
