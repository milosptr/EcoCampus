import { Popover as TamaguiPopover } from "tamagui";

export const Popover = TamaguiPopover;
export const PopoverTrigger = TamaguiPopover.Trigger;
export const PopoverClose = TamaguiPopover.Close;
export const PopoverAnchor = TamaguiPopover.Anchor;

export function PopoverContent({
  children,
  ...props
}: React.ComponentProps<typeof TamaguiPopover.Content>) {
  return (
    <TamaguiPopover.Content
      borderWidth={1}
      borderColor="$borderColor"
      enterStyle={{ y: -10, opacity: 0 }}
      exitStyle={{ y: -10, opacity: 0 }}
      elevate
      animation={[
        "quick",
        {
          opacity: {
            overshootClamping: true,
          },
        },
      ]}
      {...(props as any)}
    >
      <TamaguiPopover.Arrow borderWidth={1} borderColor="$borderColor" />
      {children}
    </TamaguiPopover.Content>
  );
}
