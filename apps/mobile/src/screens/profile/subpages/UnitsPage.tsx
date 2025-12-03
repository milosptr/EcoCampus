import { YStack, XStack, Text } from "tamagui";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface UnitsPageProps {
  currentUnit: string;
  onSelect?: (unit: string) => void;
}

export function UnitsPage({ currentUnit, onSelect }: UnitsPageProps) {
  const handleSafeSelect = (value: string) => {
    try {
      if (onSelect) {
        onSelect(value);
      }
    } catch (e) {
      console.warn("Error in onSelect (UnitsPage):", e);
    }
  };

  return (
    <YStack
      {...({
        backgroundColor: "white",
        borderRadius: "$8",
        padding: "$6",
        shadowColor: "$shadowColor",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        gap: "$4",
      } as any)}
    >
      <Text
        {...({
          fontSize: "$5",
          fontWeight: "600",
          color: "#5F7E68",
        } as any)}
      >
        Select Unit System
      </Text>

      <RadioGroup
        value={currentUnit}
        onValueChange={handleSafeSelect}
        {...({} as any)}
      >
        <XStack
          {...({
            alignItems: "center",
            gap: "$3",
            padding: "$4",
            borderRadius: "$6",
          } as any)}
        >
          <RadioGroupItem
            value="Metric (km)"
            id="metric"
            {...({ borderColor: "#5F7E68" } as any)}
          />

          <Label
            htmlFor="metric"
            {...({
              flex: 1,
              color: "#5F7E68",
            } as any)}
          >
            <YStack {...({} as any)}>
              <Text
                {...({
                  color: "#5F7E68",
                  fontSize: "$4",
                } as any)}
              >
                Metric (Kilometers)
              </Text>
              <Text
                {...({
                  fontSize: "$2",
                  color: "#5F7E68",
                  opacity: 0.6,
                } as any)}
              >
                Distance in km
              </Text>
            </YStack>
          </Label>
        </XStack>
      </RadioGroup>

      <Text
        {...({
          fontSize: "$3",
          color: "#5F7E68",
          opacity: 0.6,
        } as any)}
      >
        Imperial units will be added in a future update.
      </Text>
    </YStack>
  );
}
