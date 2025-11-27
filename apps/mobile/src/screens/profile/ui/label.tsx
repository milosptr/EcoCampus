import { Label as TamaguiLabel } from "tamagui";

export function Label(props: React.ComponentProps<typeof TamaguiLabel>) {
  return (
    <TamaguiLabel
      fontSize="$2"
      fontWeight="500"
      {...({ userSelect: "none" } as any)}
      {...props}
    />
  );
}

export type LabelProps = React.ComponentProps<typeof Label>;
