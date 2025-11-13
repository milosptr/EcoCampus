import { YStack, XStack, Text } from "tamagui";

export function Card(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      background="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      gap="$6"
    />
  );
}

export function CardHeader(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      paddingHorizontal="$6"
      paddingTop="$6"
      gap="$1.5"
    />
  );
}

export function CardTitle(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      fontSize="$6"
      fontWeight="600"
      color="$color"
      {...props}
    />
  );
}

export function CardDescription(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      fontSize="$3"
      opacity={0.7}
      {...props}
    />
  );
}

export function CardAction(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      justifyContent="flex-end"
    />
  );
}

export function CardContent(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      paddingHorizontal="$6"
    />
  );
}

export function CardFooter(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      paddingHorizontal="$6"
      paddingBottom="$6"
      alignItems="center"
    />
  );
}
