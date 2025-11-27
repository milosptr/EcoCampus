import { YStack, XStack, Text } from "tamagui";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface UnitsPageProps {
  currentUnit: string;
  onSelect: (unit: string) => void;
}

export function UnitsPage({ currentUnit, onSelect }: UnitsPageProps) {
  return (
    <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$6", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
      <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$4" } as any)}>Select Unit System</Text>

      <RadioGroup value={currentUnit} onValueChange={onSelect}>
        <XStack {...({ alignItems: "center", gap: "$3", padding: "$4", borderRadius: "$6", hoverStyle: { backgroundColor: "#F6F9F2" } } as any)}>
          <RadioGroupItem value="Metric (km)" id="metric" {...({ borderColor: "#5F7E68" } as any)} />
          <Label htmlFor="metric" {...({ flex: 1, color: "#5F7E68" } as any)}>
            <YStack>
              <Text {...({ color: "#5F7E68" } as any)}>Metric (Kilometers)</Text>
              <Text {...({ fontSize: "$2", color: "#5F7E68", opacity: 0.6 } as any)}>Distance in km</Text>
            </YStack>
          </Label>
        </XStack>

        <XStack {...({ alignItems: "center", gap: "$3", padding: "$4", borderRadius: "$6", hoverStyle: { backgroundColor: "#F6F9F2" } } as any)}>
          <RadioGroupItem value="Imperial (mi)" id="imperial" {...({ borderColor: "#5F7E68" } as any)} />
          <Label htmlFor="imperial" {...({ flex: 1, color: "#5F7E68" } as any)}>
            <YStack>
              <Text {...({ color: "#5F7E68" } as any)}>Imperial (Miles)</Text>
              <Text {...({ fontSize: "$2", color: "#5F7E68", opacity: 0.6 } as any)}>Distance in miles</Text>
            </YStack>
          </Label>
        </XStack>
      </RadioGroup>
    </YStack>
  );
}
