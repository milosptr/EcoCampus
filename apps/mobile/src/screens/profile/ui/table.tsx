import { YStack, XStack, Text } from "tamagui";
import { ScrollView } from "react-native";

export function Table(props: React.ComponentProps<typeof YStack>) {
  return (
    <ScrollView horizontal>
      <YStack {...(props as any)} width="100%" />
    </ScrollView>
  );
}

export function TableHeader(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    />
  );
}

export function TableBody(props: React.ComponentProps<typeof YStack>) {
  return <YStack {...(props as any)} />;
}

export function TableFooter(props: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...(props as any)}
      borderTopWidth={1}
      borderTopColor="$borderColor"
      backgroundColor="$backgroundHover"
      fontWeight="500"
    />
  );
}

export function TableRow(props: React.ComponentProps<typeof XStack>) {
  return (
    <XStack
      {...(props as any)}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      hoverStyle={{
        backgroundColor: "$backgroundHover",
      }}
    />
  );
}

export function TableHead(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...({
        fontSize: "$2",
        fontWeight: "500",
        paddingHorizontal: "$4",
        paddingVertical: "$3",
        textAlign: "left",
      } as any)}
      {...props}
    />
  );
}

export function TableCell(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...({
        fontSize: "$2",
        paddingHorizontal: "$4",
        paddingVertical: "$3",
      } as any)}
      {...props}
    />
  );
}

export function TableCaption(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...({
        fontSize: "$2",
        opacity: 0.7,
        paddingVertical: "$2",
      } as any)}
      {...props}
    />
  );
}
