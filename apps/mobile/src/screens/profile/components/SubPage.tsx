import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text, Button } from "tamagui";

interface SubPageProps {
  title: string;
  onBack: () => void;
  children?: React.ReactNode;
}

export function SubPage({ title, onBack, children }: SubPageProps) {
  return (
    <YStack {...({ flex: 1, backgroundColor: "#F6F9F2" } as any)}>
      {/* Header */}
      <YStack {...({ backgroundColor: "white", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <XStack {...({ alignItems: "center", paddingHorizontal: "$4", paddingVertical: "$4", paddingTop: "$10" } as any)}>
          <Button
            circular
            size="$4"
            onPress={onBack}
            {...({
              backgroundColor: "transparent",
              pressStyle: { opacity: 0.8 }
            } as any)}
          >
            <Feather name="chevron-left" size={20} color="#5F7E68" />
          </Button>

          <Text {...({ flex: 1, textAlign: "center", fontSize: "$7", fontWeight: "600", color: "#5F7E68" } as any)}>{title}</Text>

          <YStack {...({ width: 40 } as any)} /> {/* Spacer for centering */}
        </XStack>
      </YStack>

      {/* Content */}
      <YStack {...({ padding: "$4" } as any)}>
        {children || (
          <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$8", alignItems: "center", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
            <Text {...({ fontSize: "$4", color: "#5F7E68", opacity: 0.7 } as any)}>
              This section is under development
            </Text>
          </YStack>
        )}
      </YStack>
    </YStack>
  );
}
