import { XStack, YStack, Text } from "tamagui";
import { Feather } from "@expo/vector-icons";

export function Breadcrumb(props: React.ComponentProps<typeof XStack>) {
  return <XStack {...(props as any)} />;
}

export function BreadcrumbList(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      flexWrap="wrap"
      alignItems="center"
      gap="$1.5"
      opacity={0.7}
    />
  );
}

export function BreadcrumbItem(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      alignItems="center"
      gap="$1.5"
    />
  );
}

export function BreadcrumbLink(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      fontSize="$2"
      color="$color"
      hoverStyle={{ textDecorationLine: "underline" }}
      {...props}
    />
  );
}

export function BreadcrumbPage(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      fontSize="$2"
      color="$color"
      fontWeight="500"
      {...props}
    />
  );
}

export function BreadcrumbSeparator(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack {...(props as any)} role="presentation" aria-hidden>
      <Feather name="chevron-right" size={16} />
    </XStack>
  );
}

export function BreadcrumbEllipsis(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack {...(props as any)} alignItems="center" justifyContent="center">
      <Feather name="more-horizontal" size={16} />
      <Text position="absolute" width={1} height={1} opacity={0}>More</Text>
    </XStack>
  );
}
