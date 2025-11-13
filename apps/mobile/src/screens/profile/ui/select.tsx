import { Select as TamaguiSelect, Adapt, Sheet, YStack } from "tamagui";
import { Feather } from "@expo/vector-icons";

export const Select = TamaguiSelect;
export const SelectGroup = TamaguiSelect.Group;
export const SelectValue = TamaguiSelect.Value;

export function SelectTrigger({
  children,
  ...props
}: React.ComponentProps<typeof TamaguiSelect.Trigger>) {
  return (
    <TamaguiSelect.Trigger
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$background"
      height={36}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$3"
      {...(props as any)}
    >
      {children}
      <TamaguiSelect.Icon>
        <Feather name="chevron-down" size={16} />
      </TamaguiSelect.Icon>
    </TamaguiSelect.Trigger>
  );
}

export function SelectContent({
  children,
  ...props
}: React.ComponentProps<typeof TamaguiSelect.Content>) {
  return (
    <TamaguiSelect.Content {...({ zIndex: 200000 } as any)} {...(props as any)}>
      <TamaguiSelect.ScrollUpButton
        {...({
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          height: "$3",
        } as any)}
      >
        <YStack {...({ zIndex: 10 } as any)}>
          <Feather name="chevron-up" size={20} />
        </YStack>
      </TamaguiSelect.ScrollUpButton>

      <TamaguiSelect.Viewport {...({ minWidth: 200 } as any)}>
        {children}
      </TamaguiSelect.Viewport>

      <TamaguiSelect.ScrollDownButton
        {...({
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          height: "$3",
        } as any)}
      >
        <YStack {...({ zIndex: 10 } as any)}>
          <Feather name="chevron-down" size={20} />
        </YStack>
      </TamaguiSelect.ScrollDownButton>
    </TamaguiSelect.Content>
  );
}

export function SelectItem({
  children,
  ...props
}: React.ComponentProps<typeof TamaguiSelect.Item>) {
  return (
    <TamaguiSelect.Item {...props}>
      <TamaguiSelect.ItemText>{children}</TamaguiSelect.ItemText>
      <TamaguiSelect.ItemIndicator marginLeft="auto">
        <Feather name="check" size={16} />
      </TamaguiSelect.ItemIndicator>
    </TamaguiSelect.Item>
  );
}

export const SelectLabel = TamaguiSelect.Label;
// Tamagui Select may not have Separator, use a simple YStack instead
export const SelectSeparator = YStack;
