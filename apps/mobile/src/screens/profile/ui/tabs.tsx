import { Tabs as TamaguiTabs, YStack, XStack } from "tamagui";

export function Tabs(props: React.ComponentProps<typeof TamaguiTabs>) {
  return (
    <TamaguiTabs
      gap="$2"
      {...props}
    />
  );
}

export function TabsList(props: React.ComponentProps<typeof TamaguiTabs.List>) {
  return (
    <TamaguiTabs.List
      backgroundColor="$backgroundHover"
      padding="$0.5"
      borderRadius="$4"
      {...(props as any)}
    />
  );
}

export function TabsTrigger(props: React.ComponentProps<typeof TamaguiTabs.Tab>) {
  return (
    <TamaguiTabs.Tab
      {...({
        borderRadius: "$3",
        paddingHorizontal: "$2",
        paddingVertical: "$1",
        fontSize: "$2",
        fontWeight: "500",
      } as any)}
      {...props}
    />
  );
}

export function TabsContent(props: React.ComponentProps<typeof TamaguiTabs.Content>) {
  return <TamaguiTabs.Content {...props} />;
}

export type TabsProps = React.ComponentProps<typeof Tabs>;
