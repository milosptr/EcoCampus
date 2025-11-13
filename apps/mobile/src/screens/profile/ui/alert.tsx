import { YStack, XStack, Text } from "tamagui";

type AlertVariant = "default" | "destructive";

interface AlertProps {
  variant?: AlertVariant;
  children?: React.ReactNode;
}

export function Alert({ variant = "default", children, ...props }: AlertProps) {
  const isDestructive = variant === "destructive";

  return (
    <YStack
      {...(props as any)}
      borderRadius="$3"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$3"
      backgroundColor="$background"
      gap="$0.5"
    >
      {children}
    </YStack>
  );
}

export function AlertTitle(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      fontSize="$3"
      fontWeight="500"
      color="$color"
      {...props}
    />
  );
}

export function AlertDescription(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      fontSize="$2"
      opacity={0.7}
      {...props}
    />
  );
}

export type { AlertProps };
