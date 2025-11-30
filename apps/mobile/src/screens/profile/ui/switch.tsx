import { Switch as TamaguiSwitch } from "tamagui";

export function Switch(props: React.ComponentProps<typeof TamaguiSwitch>) {
  return (
    <TamaguiSwitch
      size="$2"
      backgroundColor="$backgroundHover"
      {...props}
    >
      <TamaguiSwitch.Thumb animation="quick" />
    </TamaguiSwitch>
  );
}

export type SwitchProps = React.ComponentProps<typeof Switch>;
