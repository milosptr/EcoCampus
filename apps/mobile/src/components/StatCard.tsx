import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'
import { TrendIndicator } from './TrendIndicator'

type FeatherIconName = React.ComponentProps<typeof Feather>['name']

interface StatCardProps {
  icon: FeatherIconName
  label: string
  value: string | number
  unit?: string
  trend?: number
  trendSuffix?: string
  iconColor?: string
  delay?: number
}

export function StatCard({
  icon,
  label,
  value,
  unit,
  trend,
  trendSuffix = '%',
  iconColor = Colors.primary,
  delay = 0,
}: StatCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
          <Feather name={icon} size={16} color={iconColor} />
        </View>
        {trend !== undefined && (
          <TrendIndicator value={trend} suffix={trendSuffix} size="small" />
        )}
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>

      <Text style={styles.label}>{label}</Text>
    </MotiView>
  )
}

interface StatCardRowProps {
  stats: Array<{
    icon: FeatherIconName
    label: string
    value: string | number
    unit?: string
    trend?: number
    trendSuffix?: string
    iconColor?: string
  }>
  baseDelay?: number
}

export function StatCardRow({ stats, baseDelay = 200 }: StatCardRowProps) {
  return (
    <View style={styles.row}>
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          {...stat}
          delay={baseDelay + index * 100}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  unit: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
})
