import { RadioGroup as TamaguiRadioGroup, YStack } from "tamagui";
import { Feather } from "@expo/vector-icons";

export function RadioGroup(props: React.ComponentProps<typeof TamaguiRadioGroup>) {
  return (
    <TamaguiRadioGroup
      gap="$3"
      {...props}
    />
  );
}

export function RadioGroupItem(props: React.ComponentProps<typeof TamaguiRadioGroup.Item>) {
  return (
    <TamaguiRadioGroup.Item
      size="$1"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$background"
      {...props}
    >
      <TamaguiRadioGroup.Indicator>
        <Feather name="circle" size={8} />
      </TamaguiRadioGroup.Indicator>
    </TamaguiRadioGroup.Item>
  );
}

export type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;
