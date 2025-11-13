// 📄 apps/mobile/src/screens/profile/SettingsScreen.tsx
import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text, Button, ScrollView } from "tamagui";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SettingsList } from "./components/SettingsList";

export default function SettingsScreen() {
  const router = useRouter();

  // 🧠 Lokaler State – ersetzt Props, da Screen direkt aufgerufen wird
  const [settings, setSettings] = useState({
    dailyReminders: true,
    weeklyReports: false,
    leaderboardUpdates: true,
    dataSharing: false,
    analyticsTracking: true,
  });

  const [unitSystem, setUnitSystem] = useState("Metric (km)");
  const [language, setLanguage] = useState("English");

  // 🔁 Logik: Toggle-Schalter
  const handleToggle = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  // 🔁 Navigation zu Unterseiten (FAQ, Language usw.)
  const handleNavigate = (screen: string) => {
    console.log("Navigate to:", screen);
    // später mit router.push(`/(tabs)/profile/${screen}`)
  };

  const handleSignOut = () => {
    console.log("Signed out");
    router.back(); // zurück zur Profilseite
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    router.back();
  };

  const handleBack = () => router.back();

  return (
    <YStack {...({ flex: 1, backgroundColor: "#F6F9F2" } as any)}>
      {/* Header */}
      <YStack
        {...({
          backgroundColor: "white",
          shadowColor: "$shadowColor",
          shadowOpacity: 0.05,
          shadowRadius: 10,
        } as any)}
      >
        <XStack
          {...({
            alignItems: "center",
            paddingHorizontal: "$4",
            paddingVertical: "$4",
            paddingTop: "$10",
          } as any)}
        >
          <Button
            circular
            size="$4"
            onPress={handleBack}
            {...({
              backgroundColor: "transparent",
              pressStyle: { opacity: 0.8 },
            } as any)}
          >
            <Feather name="chevron-left" size={20} color="#5F7E68" />
          </Button>

          {/* 🧩 Das ist der Titel */}
          <Text
            {...({
              flex: 1,
              textAlign: "center",
              fontSize: "$7",
              fontWeight: "600",
              color: "#5F7E68",
            } as any)}
          >
            Settings
          </Text>

          {/* Spacer für zentrierten Titel */}
          <YStack {...({ width: 40 } as any)} />
        </XStack>
      </YStack>

      {/* Scrollbarer Bereich */}
      <ScrollView>
        {/* Hauptinhalt – Liste */}
        <SettingsList
          settings={settings}
          unitSystem={unitSystem}
          language={language}
          onToggle={handleToggle}
          onNavigate={handleNavigate}
        />

        {/* Footer-Aktionen */}
        <YStack
          {...({
            marginHorizontal: "$4",
            marginBottom: "$8",
            gap: "$3",
          } as any)}
        >
          <Button
            onPress={handleSignOut}
            {...({
              borderRadius: "$6",
              height: 48,
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#EA715B",
              pressStyle: { opacity: 0.8 },
            } as any)}
          >
            <Text
              {...({
                color: "#EA715B",
                fontSize: "$4",
                fontWeight: "600",
              } as any)}
            >
              Sign Out
            </Text>
          </Button>

          <TouchableOpacity onPress={handleDeleteAccount}>
            <YStack
              {...({
                width: "100%",
                alignItems: "center",
                paddingVertical: "$2",
              } as any)}
            >
              <Text
                {...({
                  fontSize: "$2",
                  color: "#EA715B",
                } as any)}
              >
                Delete Account
              </Text>
            </YStack>
          </TouchableOpacity>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
