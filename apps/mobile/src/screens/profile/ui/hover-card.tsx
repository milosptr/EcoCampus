import * as React from "react";
import { YStack, styled, Popover } from "tamagui";

// Note: Hover is not a native mobile interaction, so this is a simplified version
// using Popover instead. In React Native, you would typically use long press or tap.

const HoverCardContent = styled(YStack, {
  backgroundColor: "$background",
  borderRadius: "$4",
  borderWidth: 1,
  borderColor: "$borderColor",
  padding: "$4",
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
  width: 256,
} as any);

function HoverCard({ children, ...props }: React.ComponentProps<typeof Popover>) {
  return <Popover {...props}>{children}</Popover>;
}

function HoverCardTrigger({ children, ...props }: React.ComponentProps<typeof Popover.Trigger>) {
  return <Popover.Trigger {...props}>{children}</Popover.Trigger>;
}

function HoverCardContentComponent({
  children,
  ...props
}: React.ComponentProps<typeof HoverCardContent>) {
  return (
    <Popover.Content
      {...({
        padding: "$0",
        borderWidth: 0,
        backgroundColor: "transparent",
      } as any)}
      elevate
      {...props}
    >
      <HoverCardContent>{children}</HoverCardContent>
    </Popover.Content>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContentComponent as HoverCardContent };
