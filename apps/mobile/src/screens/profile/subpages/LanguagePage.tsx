import { YStack, XStack, Text } from "tamagui";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface LanguagePageProps {
  currentLanguage: string;
  onSelect: (language: string) => void;
}

export function LanguagePage({ currentLanguage, onSelect }: LanguagePageProps) {
  return (
    <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$6", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
      <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$4" } as any)}>Select Language</Text>

      <RadioGroup value={currentLanguage} onValueChange={onSelect}>
        <XStack {...({ alignItems: "center", gap: "$3", padding: "$4", borderRadius: "$6", hoverStyle: { backgroundColor: "#F6F9F2" } } as any)}>
          <RadioGroupItem value="English" id="english" {...({ borderColor: "#5F7E68" } as any)} />
          <Label htmlFor="english" {...({ flex: 1, color: "#5F7E68" } as any)}>
            English
          </Label>
        </XStack>

        <XStack {...({ alignItems: "center", gap: "$3", padding: "$4", borderRadius: "$6", opacity: 0.5 } as any)}>
          <RadioGroupItem value="German" id="german" {...({ borderColor: "#5F7E68" } as any)} disabled />
          <Label htmlFor="german" {...({ flex: 1, color: "#5F7E68" } as any)}>
            German (Coming Soon)
          </Label>
        </XStack>
      </RadioGroup>
    </YStack>
  );
}
