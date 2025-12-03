import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { MotiView } from 'moti'
import { Colors } from '@/src/constants/Colors'

interface TrendIndicatorProps {
  value: number
  suffix?: string
  size?: 'small' | 'medium' | 'large'
  showIcon?: boolean
  animated?: boolean
}

export function TrendIndicator({
  value,
  suffix = '%',
  size = 'medium',
  showIcon = true,
  animated = true,
}: TrendIndicatorProps) {
  const isPositive = value > 0
  const isNeutral = value === 0
  const color = isNeutral
    ? Colors.trendNeutral
    : isPositive
      ? Colors.trendUp
      : Colors.trendDown

  const iconName = isNeutral ? 'minus' : isPositive ? 'arrow-up' : 'arrow-down'
  const displayValue = isNeutral ? '0' : Math.abs(value).toString()

  const sizeStyles = {
    small: { fontSize: 11, iconSize: 10 },
    medium: { fontSize: 13, iconSize: 12 },
    large: { fontSize: 15, iconSize: 14 },
  }

  const { fontSize, iconSize } = sizeStyles[size]

  const content = (
    <View style={styles.container}>
      {showIcon && (
        <Feather name={iconName} size={iconSize} color={color} />
      )}
      <Text style={[styles.text, { color, fontSize }]}>
        {isPositive && '+'}
        {displayValue}
        {suffix}
      </Text>
    </View>
  )

  if (animated) {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 300 }}
      >
        {content}
      </MotiView>
    )
  }

  return content
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  text: {
    fontWeight: '600',
  },
})
