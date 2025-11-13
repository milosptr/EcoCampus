import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text, Switch, Separator } from "tamagui";
import { TouchableOpacity } from "react-native";
import { Link } from 'expo-router'



interface SettingsListProps {
  settings: {
    dailyReminders: boolean;
    weeklyReports: boolean;
    leaderboardUpdates: boolean;
    dataSharing: boolean;
    analyticsTracking: boolean;
  };
  unitSystem: string;
  language: string;
  onToggle: (key: string, value: boolean) => void;
  onNavigate: (screen: string) => void;
}

export function SettingsList({ settings, unitSystem, language, onToggle, onNavigate }: SettingsListProps) {
  if (!settings) return null;
  return (
    <YStack {...({ marginHorizontal: "$4", marginTop: "$6", paddingBottom: "$6", gap: "$6" } as any)}>
      {/* Account Settings */}
      <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$4", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", paddingHorizontal: "$2", marginBottom: "$3" } as any)}>Account Settings</Text>

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
          icon="lock"
          label="Edit Email"
          onPress={() => onNavigate('edit-email')}
          showDivider={false}
        />
      </YStack>

      {/* Notifications */}
      <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$4", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", paddingHorizontal: "$2", marginBottom: "$3" } as any)}>Notifications</Text>

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
          onCheckedChange={(checked) => onToggle('leaderboardUpdates', checked)}
          showDivider={false}
        />
      </YStack>

      {/* Privacy & Permissions */}
      <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$4", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", paddingHorizontal: "$2", marginBottom: "$3" } as any)}>Privacy & Permissions</Text>

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
      </YStack>

      {/* App Preferences */}
      <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$4", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", paddingHorizontal: "$2", marginBottom: "$3" } as any)}>App Preferences</Text>

        <SettingsButton
          icon="globe"
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
      </YStack>

      {/* About & Support */}
      <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$4", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", paddingHorizontal: "$2", marginBottom: "$3" } as any)}>About & Support</Text>

        <SettingsButton
          icon="help-circle"
          label="FAQ"
          onPress={() => onNavigate('faq')}
        />
        <SettingsButton
          icon="help-circle"
          label="Contact Support"
          onPress={() => onNavigate('support')}
        />
        <SettingsButton
          icon="shield"
          label="Terms of Service"
          onPress={() => onNavigate('terms')}
        />
        <SettingsButton
          icon="shield"
          label="Privacy Policy"
          onPress={() => onNavigate('privacy')}
          showDivider={false}
        />
      </YStack>
    </YStack>
  );
}

function SettingsButton({
  icon,
  label,
  value,
  onPress,
  showDivider = true
}: {
  icon: string;
  label: string;
  value?: string;
  onPress: () => void;
  showDivider?: boolean;
}) {
  return (
    <YStack>
      <TouchableOpacity onPress={onPress}>
        <XStack
          {...({
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: "$2",
            paddingVertical: "$3"
          } as any)}
        >
          <XStack {...({ alignItems: "center", gap: "$3" } as any)}>
            <Feather name={icon as any} size={20} color="#5F7E68" />
            <Text {...({ fontSize: "$4", color: "#5F7E68" } as any)}>{label}</Text>
          </XStack>

          <XStack {...({ alignItems: "center", gap: "$2" } as any)}>
            {value && (
              <Text {...({ fontSize: "$2", color: "#5F7E68", opacity: 0.5 } as any)}>{value}</Text>
            )}
            <Feather name="chevron-right" size={20} color="#9DBFA8" />
          </XStack>
        </XStack>
      </TouchableOpacity>
      {showDivider && <Separator {...({ marginVertical: "$1" } as any)} />}
    </YStack>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
  showDivider = true
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  showDivider?: boolean;
}) {
  return (
    <YStack>
      <XStack {...({ alignItems: "center", justifyContent: "space-between", paddingHorizontal: "$2", paddingVertical: "$3" } as any)}>
        <Text {...({ fontSize: "$4", color: "#5F7E68" } as any)}>{label}</Text>
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          {...({ backgroundColor: checked ? "#5F7E68" : "$gray5" } as any)}
        />
      </XStack>
      {showDivider && <Separator {...({ marginVertical: "$1" } as any)} />}
    </YStack>
  );
}
