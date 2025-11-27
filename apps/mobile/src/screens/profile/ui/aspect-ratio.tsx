import { View } from "tamagui";

interface AspectRatioProps extends React.ComponentProps<typeof View> {
  ratio?: number;
}

export function AspectRatio({ ratio = 1, style, ...props }: AspectRatioProps) {
  return (
    <View
      {...(props as any)}
      style={[{ aspectRatio: ratio }, style]}
    />
  );
}
