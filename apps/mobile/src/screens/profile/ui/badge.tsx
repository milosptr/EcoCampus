import { XStack, Text } from "tamagui";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

const variantStyles = {
  default: {
    bg: "$primary" as const,
    color: "white" as const,
    borderColor: "transparent" as const,
  },
  secondary: {
    bg: "$secondary" as const,
    color: "$color" as const,
    borderColor: "transparent" as const,
  },
  destructive: {
    bg: "$error" as const,
    color: "white" as const,
    borderColor: "transparent" as const,
  },
  outline: {
    bg: "transparent" as const,
    color: "$color" as const,
    borderColor: "$borderColor" as const,
  },
} as const;

export function Badge({ variant = "default", children, ...props }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <XStack
      {...(props as any)}
      borderRadius="$2"
      borderWidth={1}
      paddingHorizontal="$2"
      paddingVertical="$0.5"
      gap="$1"
      alignItems="center"
      justifyContent="center"
      background={styles.bg}
      borderColor={styles.borderColor}
    >
      {typeof children === "string" ? (
        <Text fontSize="$1" fontWeight="500" color={styles.color}>
          {children}
        </Text>
      ) : (
        children
      )}
    </XStack>
  );
}

export type { BadgeProps };
