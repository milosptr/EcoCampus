import { Slider as TamaguiSlider } from "tamagui";

export function Slider(props: React.ComponentProps<typeof TamaguiSlider>) {
  return (
    <TamaguiSlider
      size="$1"
      {...props}
    >
      <TamaguiSlider.Track>
        <TamaguiSlider.TrackActive />
      </TamaguiSlider.Track>
      <TamaguiSlider.Thumb index={0} circular />
    </TamaguiSlider>
  );
}

export type SliderProps = React.ComponentProps<typeof Slider>;
