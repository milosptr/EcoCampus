import { TextArea as TamaguiTextArea } from "tamagui";

export function Textarea(props: React.ComponentProps<typeof TamaguiTextArea>) {
  return (
    <TamaguiTextArea
      minHeight={64}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$3"
      backgroundColor="$background"
      color="$color"
      fontSize="$2"
      outlineWidth={0}
      {...({
        focusStyle: {
          borderColor: "$borderFocus",
          outlineWidth: 3,
          outlineColor: "$borderFocus",
          outlineStyle: "solid",
        },
      } as any)}
      {...props}
    />
  );
}

export type TextareaProps = React.ComponentProps<typeof Textarea>;
