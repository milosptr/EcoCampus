import { View, Text, Pressable, Switch, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'

type FeatherIconName = React.ComponentProps<typeof Feather>['name']

interface SettingsRowProps {
  icon?: FeatherIconName
  label: string
  value?: string
  onPress?: () => void
  toggle?: {
    checked: boolean
    onChange: (checked: boolean) => void
  }
  showDivider?: boolean
}

export function SettingsRow({
  icon,
  label,
  value,
  onPress,
  toggle,
  showDivider = false,
}: SettingsRowProps) {
  const isToggle = toggle !== undefined
  const isPressable = onPress !== undefined && !isToggle

  const content = (
    <View style={[styles.row, showDivider && styles.rowWithDivider]}>
      <View style={styles.leftContent}>
        {icon && (
          <View style={styles.iconContainer}>
            <Feather name={icon} size={18} color={Colors.primary} />
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.rightContent}>
        {isToggle ? (
          <Switch
            value={toggle.checked}
            onValueChange={toggle.onChange}
            trackColor={{
              false: Colors.border,
              true: Colors.primary,
            }}
            thumbColor={Colors.white}
          />
        ) : (
          <>
            {value && <Text style={styles.value}>{value}</Text>}
            <Feather name="chevron-right" size={18} color={Colors.textMuted} />
          </>
        )}
      </View>
    </View>
  )

  if (isPressable) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    )
  }

  return content
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  rowWithDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  value: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  pressed: {
    opacity: 0.7,
  },
})
