import { Input as TamaguiInput } from "tamagui";

export function Input(props: React.ComponentProps<typeof TamaguiInput>) {
  return (
    <TamaguiInput
      height={36}
      paddingHorizontal="$3"
      paddingVertical="$1"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$3"
      background="$background"
      color="$color"
      fontSize="$2"
      outlineWidth={0}
      {...({ focusStyle: {
        borderColor: "$borderFocus",
        outlineWidth: 3,
        outlineColor: "$borderFocus",
        outlineStyle: "solid",
      } } as any)}
      {...props}
    />
  );
}

export type InputProps = React.ComponentProps<typeof Input>;
