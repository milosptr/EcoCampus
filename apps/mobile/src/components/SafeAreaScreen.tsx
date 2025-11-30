import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { useSafeAreaInsets, Edge } from 'react-native-safe-area-context'

/**
 * SafeAreaScreen Component
 *
 * Alternative to the default SafeAreaView from react-native-safe-area-context
 * which has a flickering issue on first render on iOS/Android.
 *
 * This component uses the useSafeAreaInsets() hook to apply padding manually,
 * avoiding the flicker/jump that occurs with SafeAreaView.
 *
 * Automatically adds:
 * - 16px horizontal padding when left/right edges are enabled
 * - 24px extra bottom padding for scrollable content (in addition to safe area insets)
 *
 * GitHub issues:
 * - https://github.com/th3rdwave/react-native-safe-area-context/issues/219
 * - https://github.com/th3rdwave/react-native-safe-area-context/issues/226
 *
 * @param children - Child components to render
 * @param style - Additional styles to apply to the container
 * @param edges - Array of edges to apply safe area insets to (default: ['top', 'bottom', 'left', 'right'])
 * @param scrollable - Whether to use ScrollView instead of View (default: false)
 * @param contentContainerStyle - Style for ScrollView content container (only used if scrollable=true)
 */

interface SafeAreaScreenProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  edges?: readonly Edge[]
  scrollable?: boolean
  contentContainerStyle?: StyleProp<ViewStyle>
}

const HORIZONTAL_SPACING = 16
const BOTTOM_CONTENT_SPACING = 24

export default function SafeAreaScreen({
  children,
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  scrollable = false,
  contentContainerStyle,
}: SafeAreaScreenProps) {
  const insets = useSafeAreaInsets()

  const paddingStyle = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom')
      ? insets.bottom + (scrollable ? BOTTOM_CONTENT_SPACING : 0)
      : 0,
    paddingLeft: edges.includes('left') ? insets.left + HORIZONTAL_SPACING : 0,
    paddingRight: edges.includes('right')
      ? insets.right + HORIZONTAL_SPACING
      : 0,
  }

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[paddingStyle, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    )
  }

  return <View style={[styles.container, paddingStyle, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
