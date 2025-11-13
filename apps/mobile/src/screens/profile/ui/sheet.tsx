import { Sheet as TamaguiSheet, YStack, XStack, Text, styled } from "tamagui";

export const Sheet = TamaguiSheet;

// Some versions of Tamagui Sheet may not have these sub-components
// Create safe wrappers with fallbacks
export const SheetTrigger = (TamaguiSheet as any).Trigger
  ? (TamaguiSheet as any).Trigger
  : styled(XStack, {
      cursor: "pointer",
      pressStyle: { opacity: 0.8 },
    } as any);

export const SheetClose = (TamaguiSheet as any).Close
  ? (TamaguiSheet as any).Close
  : styled(XStack, {
      cursor: "pointer",
      pressStyle: { opacity: 0.8 },
    } as any);

export const SheetOverlay = (TamaguiSheet as any).Overlay
  ? (TamaguiSheet as any).Overlay
  : styled(YStack, {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
    } as any);

export function SheetContent({ children, ...props }: React.ComponentProps<typeof TamaguiSheet.Frame>) {
  return (
    <TamaguiSheet.Frame padding="$4" gap="$4" {...(props as any)}>
      {children}
    </TamaguiSheet.Frame>
  );
}

// Fallback implementations for sub-components that may not exist
export const SheetHeader = (TamaguiSheet as any).Header
  ? (TamaguiSheet as any).Header
  : styled(YStack, {
      gap: "$2",
      marginBottom: "$4",
    } as any);

export const SheetFooter = (TamaguiSheet as any).Footer
  ? (TamaguiSheet as any).Footer
  : styled(YStack, {
      gap: "$2",
      marginTop: "$4",
    } as any);

export const SheetTitle = (TamaguiSheet as any).Title
  ? (TamaguiSheet as any).Title
  : styled(Text, {
      fontSize: "$6",
      fontWeight: "600",
    } as any);

export const SheetDescription = (TamaguiSheet as any).Description
  ? (TamaguiSheet as any).Description
  : styled(Text, {
      fontSize: "$3",
      color: "$gray11",
    } as any);
