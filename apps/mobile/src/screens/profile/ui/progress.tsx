import { Progress as TamaguiProgress } from "tamagui";

export function Progress({ value, ...props }: React.ComponentProps<typeof TamaguiProgress> & { value?: number }) {
  return (
    <TamaguiProgress
      value={value}
      {...props}
    >
      <TamaguiProgress.Indicator animation="quick" />
    </TamaguiProgress>
  );
}

export type ProgressProps = React.ComponentProps<typeof Progress>;
