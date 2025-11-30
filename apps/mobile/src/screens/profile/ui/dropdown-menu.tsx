import { Popover } from "tamagui";
import { YStack, XStack, Text } from "tamagui";
import { Feather } from "@expo/vector-icons";

export const DropdownMenu = Popover;
export const DropdownMenuTrigger = Popover.Trigger;
export const DropdownMenuPortal = Popover.Sheet;
export const DropdownMenuGroup = YStack;
export const DropdownMenuSub = Popover;
export const DropdownMenuRadioGroup = YStack;

export function DropdownMenuContent({ children, ...props }: React.ComponentProps<typeof Popover.Content>) {
  return (
    <Popover.Content
      padding="$2"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$3"
      backgroundColor="$background"
      elevate
      animation="quick"
      enterStyle={{ opacity: 0, scale: 0.95 }}
      exitStyle={{ opacity: 0, scale: 0.95 }}
      {...(props as any)}
    >
      {children}
    </Popover.Content>
  );
}

export function DropdownMenuItem(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      paddingHorizontal="$2"
      paddingVertical="$1.5"
      borderRadius="$2"
      cursor="pointer"
      hoverStyle={{
        backgroundColor: "$backgroundHover",
      }}
      pressStyle={{
        backgroundColor: "$backgroundPress",
      }}
    />
  );
}

export function DropdownMenuCheckboxItem({
  checked,
  children,
  ...props
}: React.ComponentProps<typeof XStack> & { checked?: boolean }) {
  return (
    <XStack
      {...(props as any)}
      paddingHorizontal="$2"
      paddingVertical="$1.5"
      borderRadius="$2"
      cursor="pointer"
      gap="$2"
      hoverStyle={{
        backgroundColor: "$backgroundHover",
      }}
    >
      {checked && <Feather name="check" size={16} />}
      {children}
    </XStack>
  );
}

export function DropdownMenuRadioItem(props: React.ComponentProps<typeof XStack>) {
  return <DropdownMenuItem {...props} />;
}

export function DropdownMenuLabel(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...({
        paddingHorizontal: "$2",
        paddingVertical: "$1.5",
        fontSize: "$2",
        fontWeight: "600",
      } as any)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator() {
  return (
    <YStack
      {...({
        height: 1,
        backgroundColor: "$borderColor",
        marginVertical: "$1",
      } as any)}
    />
  );
}

export const DropdownMenuShortcut = Text;
export const DropdownMenuSubContent = DropdownMenuContent;
export const DropdownMenuSubTrigger = DropdownMenuItem;
