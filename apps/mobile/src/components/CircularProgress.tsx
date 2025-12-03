import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import Svg, { Circle } from 'react-native-svg'
import { Colors } from '@/src/constants/Colors'

interface CircularProgressProps {
  progress: number // 0 to 100
  size?: number
  strokeWidth?: number
  progressColor?: string
  trackColor?: string
  children?: React.ReactNode
  animated?: boolean
}

export function CircularProgress({
  progress,
  size = 120,
  strokeWidth = 10,
  progressColor = Colors.primary,
  trackColor = Colors.border,
  children,
  animated = true,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const clampedProgress = Math.min(100, Math.max(0, progress))
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference

  const content = (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress arc */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {children && <View style={styles.content}>{children}</View>}
    </View>
  )

  if (animated) {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        {content}
      </MotiView>
    )
  }

  return content
}

interface CircularProgressLabelProps {
  level: string
  title: string
  levelColor?: string
}

export function CircularProgressLabel({
  level,
  title,
  levelColor = Colors.primary,
}: CircularProgressLabelProps) {
  return (
    <View style={styles.labelContainer}>
      <Text style={[styles.levelText, { color: levelColor }]}>{level}</Text>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  content: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    alignItems: 'center',
    gap: 2,
  },
  levelText: {
    fontSize: 24,
    fontWeight: '700',
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
})
