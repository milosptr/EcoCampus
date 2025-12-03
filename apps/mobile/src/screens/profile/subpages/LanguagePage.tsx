import { YStack, XStack, Text } from "tamagui";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface LanguagePageProps {
  currentLanguage: string;
  onSelect?: (language: string) => void;
}

export function LanguagePage({ currentLanguage, onSelect }: LanguagePageProps) {
  const handleSafeSelect = (value: string) => {
    try {
      if (onSelect) {
        onSelect(value);
      }
    } catch (e) {
      console.warn("Error in onSelect (LanguagePage):", e);
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
        Select Language
      </Text>

      <RadioGroup
        value={currentLanguage}
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
            value="English"
            id="english"
            {...({ borderColor: "#5F7E68" } as any)}
          />
          <Label
            htmlFor="english"
            {...({
              flex: 1,
              color: "#5F7E68",
              fontSize: "$4",
            } as any)}
          >
            English
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
        More languages will be added in future updates.
      </Text>
    </YStack>
  );
}
