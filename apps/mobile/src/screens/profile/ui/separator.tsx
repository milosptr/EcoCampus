import { Separator as TamaguiSeparator } from "tamagui";

export function Separator({
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TamaguiSeparator> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <TamaguiSeparator
      vertical={orientation === "vertical"}
      {...props}
    />
  );
}

export type SeparatorProps = React.ComponentProps<typeof Separator>;
