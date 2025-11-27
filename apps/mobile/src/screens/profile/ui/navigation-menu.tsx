import { XStack, YStack, Text } from "tamagui";

export function NavigationMenu(props: React.ComponentProps<typeof XStack>) {
  return <XStack {...(props as any)} gap="$2" />;
}

export function NavigationMenuList(props: React.ComponentProps<typeof XStack>) {
  return <XStack {...(props as any)} gap="$2" alignItems="center" />;
}

export function NavigationMenuItem(props: React.ComponentProps<typeof YStack>) {
  return <YStack {...(props as any)} />;
}

export function NavigationMenuTrigger(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$2"
      cursor="pointer"
      hoverStyle={{
        backgroundColor: "$backgroundHover",
      }}
    />
  );
}

export function NavigationMenuContent(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      position="absolute"
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$3"
      padding="$2"
      elevate
    />
  );
}

export function NavigationMenuLink(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      cursor="pointer"
      hoverStyle={{
        textDecorationLine: "underline",
      }}
    />
  );
}

export const NavigationMenuIndicator = YStack;
export const NavigationMenuViewport = YStack;
