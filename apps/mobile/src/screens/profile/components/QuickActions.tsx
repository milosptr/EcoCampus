import { View, Text, Pressable, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'

interface QuickAction {
  id: string
  label: string
  icon: keyof typeof Feather.glyphMap
  onPress: () => void
  isPrimary?: boolean
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <MotiView
      from={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 500 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          {actions.map((action, index) => (
            <MotiView
              key={action.id}
              from={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'timing', duration: 300, delay: 600 + index * 100 }}
              style={styles.actionWrapper}
            >
              <Pressable
                onPress={action.onPress}
                style={({ pressed }) => [
                  styles.actionButton,
                  action.isPrimary && styles.actionButtonPrimary,
                  pressed && styles.actionButtonPressed,
                ]}
              >
                <View
                  style={[
                    styles.actionIconContainer,
                    action.isPrimary && styles.actionIconContainerPrimary,
                  ]}
                >
                  <Feather
                    name={action.icon}
                    size={20}
                    color={action.isPrimary ? Colors.white : Colors.primary}
                  />
                </View>
                <Text
                  style={[styles.actionLabel, action.isPrimary && styles.actionLabelPrimary]}
                >
                  {action.label}
                </Text>
              </Pressable>
            </MotiView>
          ))}
        </View>
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionWrapper: {
    flex: 1,
  },
  actionButton: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  actionButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionIconContainerPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  actionLabelPrimary: {
    color: Colors.white,
  },
})
