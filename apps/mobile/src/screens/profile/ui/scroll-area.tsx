import { ScrollView } from "tamagui";

export function ScrollArea(props: React.ComponentProps<typeof ScrollView>) {
  return <ScrollView {...props} />;
}

export function ScrollBar() {
  // React Native ScrollView handles scrollbars automatically
  return null;
}
