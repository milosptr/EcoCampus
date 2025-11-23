import { View, StyleSheet, ViewStyle } from 'react-native'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  style?: ViewStyle | ViewStyle[]
  variant?: 'default' | 'selected' | 'info'
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'selected' && styles.cardSelected,
        variant === 'info' && styles.cardInfo,
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardSelected: {
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  cardInfo: {
    borderWidth: 1,
    borderColor: '#E3F2FD',
    backgroundColor: '#E3F2FD',
  },
})
