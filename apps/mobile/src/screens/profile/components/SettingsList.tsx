import { View, Text, Pressable, Switch, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'

type FeatherIconName = React.ComponentProps<typeof Feather>['name']

export interface SettingsListProps {
  settings: {
    dailyReminders: boolean
    weeklyReports: boolean
    leaderboardUpdates: boolean
    dataSharing: boolean
    analyticsTracking: boolean
  }
  unitSystem: string
  language: string
  onToggle: (key: string, value: boolean) => void
  onNavigate: (screen: string) => void
}

export function SettingsList({
  settings,
  unitSystem,
  language,
  onToggle,
  onNavigate,
}: SettingsListProps) {
  if (!settings) return null

  return (
    <View style={styles.container}>
      {/* Account Settings */}
      <MotiView
        from={{ translateX: -30, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 200 }}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <SettingsButton
            icon="lock"
            label="Change Password"
            onPress={() => onNavigate('change-password')}
          />
          <SettingsButton
            icon="globe"
            label="Manage Login Methods"
            onPress={() => onNavigate('login-methods')}
          />
          <SettingsButton
            icon="mail"
            label="Edit Email"
            onPress={() => onNavigate('edit-email')}
            showDivider={false}
          />
        </Card>
      </MotiView>

      {/* Notifications */}
      <MotiView
        from={{ translateX: -30, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 300 }}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <ToggleRow
            label="Daily Reminders"
            checked={settings.dailyReminders}
            onCheckedChange={(checked) => onToggle('dailyReminders', checked)}
          />
          <ToggleRow
            label="Weekly Reports"
            checked={settings.weeklyReports}
            onCheckedChange={(checked) => onToggle('weeklyReports', checked)}
          />
          <ToggleRow
            label="Leaderboard Updates"
            checked={settings.leaderboardUpdates}
            onCheckedChange={(checked) =>
              onToggle('leaderboardUpdates', checked)
            }
            showDivider={false}
          />
        </Card>
      </MotiView>

      {/* Privacy & Permissions */}
      <MotiView
        from={{ translateX: -30, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 400 }}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Permissions</Text>
          <ToggleRow
            label="Data Sharing with University"
            checked={settings.dataSharing}
            onCheckedChange={(checked) => onToggle('dataSharing', checked)}
          />
          <ToggleRow
            label="Analytics Tracking"
            checked={settings.analyticsTracking}
            onCheckedChange={(checked) => onToggle('analyticsTracking', checked)}
            showDivider={false}
          />
        </Card>
      </MotiView>

      {/* App Preferences */}
      <MotiView
        from={{ translateX: -30, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 500 }}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <SettingsButton
            icon="sliders"
            label="Units"
            value={unitSystem}
            onPress={() => onNavigate('units')}
          />
          <SettingsButton
            icon="globe"
            label="Language"
            value={language}
            onPress={() => onNavigate('language')}
            showDivider={false}
          />
        </Card>
      </MotiView>

      {/* About & Support */}
      <MotiView
        from={{ translateX: -30, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 600 }}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About & Support</Text>
          <SettingsButton
            icon="help-circle"
            label="FAQ"
            onPress={() => onNavigate('faq')}
          />
          <SettingsButton
            icon="message-circle"
            label="Contact Support"
            onPress={() => onNavigate('support')}
          />
          <SettingsButton
            icon="file-text"
            label="Terms of Service"
            onPress={() => onNavigate('terms')}
          />
          <SettingsButton
            icon="shield"
            label="Privacy Policy"
            onPress={() => onNavigate('privacy')}
            showDivider={false}
          />
        </Card>
      </MotiView>
    </View>
  )
}

function SettingsButton({
  icon,
  label,
  value,
  onPress,
  showDivider = true,
}: {
  icon: FeatherIconName
  label: string
  value?: string
  onPress: () => void
  showDivider?: boolean
}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      >
        <View style={styles.rowLeft}>
          <Feather name={icon} size={20} color={Colors.primary} />
          <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <View style={styles.rowRight}>
          {value && <Text style={styles.rowValue}>{value}</Text>}
          <Feather name="chevron-right" size={20} color={Colors.secondary} />
        </View>
      </Pressable>
      {showDivider && <View style={styles.divider} />}
    </View>
  )
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
  showDivider = true,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  showDivider?: boolean
}) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Switch
          value={checked}
          onValueChange={onCheckedChange}
          trackColor={{
            false: Colors.border,
            true: Colors.primary,
          }}
          thumbColor={Colors.white}
        />
      </View>
      {showDivider && <View style={styles.divider} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingBottom: 24,
    gap: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    fontSize: 15,
    color: Colors.primary,
  },
  rowValue: {
    fontSize: 13,
    color: Colors.primary,
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
})
