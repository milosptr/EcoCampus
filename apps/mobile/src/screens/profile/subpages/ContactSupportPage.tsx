import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text } from "tamagui";
import { Button } from "../ui/button";
import { Linking } from "react-native";

export function ContactSupportPage() {
  const contacts = [
    {
      icon: "mail" as const,
      label: "Email",
      value: "support@ecocampus.app",
      action: "mailto:support@ecocampus.app"
    },
    {
      icon: "phone" as const,
      label: "Phone",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: "instagram" as const,
      label: "Instagram",
      value: "@ecocampusapp",
      action: "https://instagram.com/ecocampusapp"
    }
  ];

  return (
    <YStack {...({ gap: "$4" } as any)}>
      <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$6", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <Text {...({ fontSize: "$6", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>Get in Touch</Text>
        <Text {...({ color: "#5F7E68", opacity: 0.7 } as any)}>
          We're here to help! Reach out to us through any of these channels:
        </Text>
      </YStack>

      {contacts.map((contact, index) => (
        <YStack key={index} {...({ backgroundColor: "white", borderRadius: "$8", padding: "$6", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
          <XStack {...({ alignItems: "center", gap: "$3", marginBottom: "$3" } as any)}>
            <YStack {...({ padding: "$3", borderRadius: "$6", backgroundColor: "#F6F9F2" } as any)}>
              <Feather name={contact.icon} size={20} color="#5F7E68" />
            </YStack>
            <YStack>
              <Text {...({ fontSize: "$2", color: "#5F7E68", opacity: 0.7 } as any)}>{contact.label}</Text>
              <Text {...({ color: "#5F7E68" } as any)}>{contact.value}</Text>
            </YStack>
          </XStack>
          <Button
            onPress={() => Linking.openURL(contact.action)}
            variant="outline"
            {...({
              width: "100%",
              borderRadius: "$6",
              borderColor: "#9DBFA8",
              color: "#5F7E68"
            } as any)}
          >
            Contact via {contact.label}
          </Button>
        </YStack>
      ))}
    </YStack>
  );
}
