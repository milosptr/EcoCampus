import { Dialog as TamaguiDialog, YStack, XStack } from "tamagui";
import { Feather } from "@expo/vector-icons";

// Main Dialog components
export const Dialog = TamaguiDialog;
export const DialogTrigger = TamaguiDialog.Trigger;
export const DialogPortal = TamaguiDialog.Portal;
export const DialogClose = TamaguiDialog.Close;
export const DialogOverlay = TamaguiDialog.Overlay;

// Content wrapper
export function DialogContent({ children, ...props }: React.ComponentProps<typeof TamaguiDialog.Content>) {
  return (
    <TamaguiDialog.Portal>
      <TamaguiDialog.Overlay
        key="overlay"
        animation="quick"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <TamaguiDialog.Content
        bordered
        elevate
        key="content"
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        gap="$4"
        {...(props as any)}
      >
        {children}
        <TamaguiDialog.Close asChild>
          <XStack
            {...({
              position: "absolute",
              top: "$4",
              right: "$4",
              pressStyle: { opacity: 0.7 },
              cursor: "pointer",
            } as any)}
          >
            <Feather name="x" size={16} />
          </XStack>
        </TamaguiDialog.Close>
      </TamaguiDialog.Content>
    </TamaguiDialog.Portal>
  );
}

// Header and Footer
export function DialogHeader(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      gap="$2"
      alignItems="center"
    />
  );
}

export function DialogFooter(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      gap="$2"
      justifyContent="flex-end"
      flexDirection="row-reverse"
    />
  );
}

// Title and Description
export const DialogTitle = TamaguiDialog.Title;
export const DialogDescription = TamaguiDialog.Description;
