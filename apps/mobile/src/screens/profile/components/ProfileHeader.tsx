import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text, Avatar, Button } from "tamagui";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ProfileHeaderProps {
  onBack: () => void;
  onSettings: () => void;
  onEdit: () => void;
  onAvatarClick: () => void;
  userName: string;
  university: string;
  ecoLevel: number;
  avatarUrl?: string;
}

export function ProfileHeader({
  onBack,
  onSettings,
  onEdit,
  onAvatarClick,
  userName,
  university,
  ecoLevel,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <LinearGradient
      colors={['#9DBFA8', '#F6F9F2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingBottom: 24 }}
    >
      {/* Navigation Bar */}
      <XStack
        {...({
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: "$4",
          paddingVertical: "$4",
          paddingTop: "$10",
        } as any)}
      >
        <Button
          circular
          size="$4"
          onPress={onBack}
          {...({
            backgroundColor: "transparent",
            pressStyle: { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          } as any)}
        >
          <Feather name="chevron-left" size={20} color="#5F7E68" />
        </Button>

        <Text {...({ fontSize: "$7", fontWeight: "600", color: "#5F7E68" } as any)}>Profile</Text>

        <Button
          circular
          size="$4"
          onPress={onSettings}
          {...({
            backgroundColor: "transparent",
            pressStyle: { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          } as any)}
        >
          <Feather name="settings" size={20} color="#5F7E68" />
        </Button>
      </XStack>

      {/* Profile Card */}
      <YStack
        {...({
          marginHorizontal: "$4",
          marginTop: "$2",
          backgroundColor: "white",
          borderRadius: "$8",
          padding: "$6",
          shadowColor: "$shadowColor",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          position: "relative",
        } as any)}
      >
        <Button
          circular
          size="$3"
          onPress={onEdit}
          {...({
            position: "absolute",
            top: "$4",
            right: "$4",
            backgroundColor: "#F6F9F2",
            pressStyle: { opacity: 0.8 },
          } as any)}
        >
          <Feather name="edit" size={16} color="#5F7E68" />
        </Button>

        <YStack {...({ alignItems: "center" } as any)}>
          <TouchableOpacity onPress={onAvatarClick}>
            <Avatar circular size="$10" borderWidth={4} borderColor="#E8F89C">
              <Avatar.Image src={avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"} />
              <Avatar.Fallback backgroundColor="#9DBFA8">
                <Text color="#5F7E68">MK</Text>
              </Avatar.Fallback>
            </Avatar>
          </TouchableOpacity>

          <Text
            {...({
              fontSize: "$8",
              fontWeight: "700",
              color: "#5F7E68",
              marginTop: "$4",
            } as any)}
          >
            {userName}
          </Text>
          <Text
            {...({
              fontSize: "$4",
              color: "#5F7E68",
              opacity: 0.7,
              marginTop: "$1",
            } as any)}
          >
            {university}
          </Text>

          <XStack
            {...({
              marginTop: "$3",
              paddingHorizontal: "$4",
              paddingVertical: "$2",
              borderRadius: "$10",
              backgroundColor: "#E8F89C",
            } as any)}
          >
            <Text color="#5F7E68">🌿 Eco Level {ecoLevel}</Text>
          </XStack>
        </YStack>
      </YStack>
    </LinearGradient>
  );
}
