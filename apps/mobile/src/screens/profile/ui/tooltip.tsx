import * as React from "react";
import { Tooltip as TamaguiTooltip } from "tamagui";

// Some versions of Tamagui Tooltip may not have Provider
// Create a safe wrapper with fallback
export const TooltipProvider = (TamaguiTooltip as any).Provider
  ? (TamaguiTooltip as any).Provider
  : ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const Tooltip = TamaguiTooltip;
export const TooltipTrigger = TamaguiTooltip.Trigger;

export function TooltipContent({ children, ...props }: React.ComponentProps<typeof TamaguiTooltip.Content>) {
  return (
    <TamaguiTooltip.Content
      enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
      exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
      scale={1}
      x={0}
      y={0}
      opacity={1}
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
      <TamaguiTooltip.Arrow />
      {children}
    </TamaguiTooltip.Content>
  );
}
