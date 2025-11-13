import { View } from "tamagui";

export function Skeleton(props: React.ComponentProps<typeof View>) {
  return (
    <View
      {...(props as any)}
      backgroundColor="$backgroundHover"
      borderRadius="$3"
      animation="quick"
      opacity={0.5}
    />
  );
}
