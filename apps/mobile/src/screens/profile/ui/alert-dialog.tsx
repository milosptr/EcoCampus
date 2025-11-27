import { Dialog, YStack, XStack, Text } from "tamagui";
import { Button } from "./button";

// Main Dialog components
export const AlertDialog = Dialog;
export const AlertDialogTrigger = Dialog.Trigger;
export const AlertDialogPortal = Dialog.Portal;
export const AlertDialogOverlay = Dialog.Overlay;

// Content wrapper
export function AlertDialogContent({ children, ...props }: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        key="overlay"
        animation="quick"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Dialog.Content
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
      </Dialog.Content>
    </Dialog.Portal>
  );
}

// Header and Footer
export function AlertDialogHeader(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      gap="$2"
      alignItems="center"
    />
  );
}

export function AlertDialogFooter(props: React.ComponentProps<typeof XStack>) {
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
export const AlertDialogTitle = Dialog.Title;
export const AlertDialogDescription = Dialog.Description;

// Action buttons
export function AlertDialogAction(props: React.ComponentProps<typeof Button>) {
  return <Button {...props} />;
}

export function AlertDialogCancel(props: React.ComponentProps<typeof Button>) {
  return <Button variant="outline" {...props} />;
}
