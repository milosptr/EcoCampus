import { View, StyleSheet, ViewStyle } from 'react-native'
import type { ReactNode } from 'react'
import { Colors } from '@/src/constants/Colors'

interface CardProps {
  children: ReactNode
  style?: ViewStyle | ViewStyle[]
  variant?: 'default' | 'selected' | 'info' | 'highlight'
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'selected' && styles.cardSelected,
        variant === 'info' && styles.cardInfo,
        variant === 'highlight' && styles.cardHighlight,
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardSelected: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  cardInfo: {
    borderWidth: 1,
    borderColor: Colors.infoLight,
    backgroundColor: Colors.infoLight,
  },
  cardHighlight: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
})
