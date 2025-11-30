import { Checkbox as TamaguiCheckbox } from "tamagui";
import { Feather } from "@expo/vector-icons";

export function Checkbox(props: React.ComponentProps<typeof TamaguiCheckbox>) {
  return (
    <TamaguiCheckbox
      size="$1"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$background"
      {...props}
    >
      <TamaguiCheckbox.Indicator>
        <Feather name="check" size={14} />
      </TamaguiCheckbox.Indicator>
    </TamaguiCheckbox>
  );
}

export type CheckboxProps = React.ComponentProps<typeof Checkbox>;
