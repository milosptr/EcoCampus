import { XStack } from "tamagui";
import { Toggle, ToggleProps } from "./toggle";
import { createContext, useContext } from "react";

type ToggleGroupContextValue = {
  variant?: ToggleProps["variant"];
  size?: ToggleProps["size"];
};

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
});

interface ToggleGroupProps extends React.ComponentProps<typeof XStack> {
  variant?: ToggleProps["variant"];
  size?: ToggleProps["size"];
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export function ToggleGroup({
  variant = "default",
  size = "default",
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <XStack
        {...(props as any)}
        borderRadius="$3"
        alignItems="center"
      >
        {children}
      </XStack>
    </ToggleGroupContext.Provider>
  );
}

export function ToggleGroupItem(props: ToggleProps) {
  const context = useContext(ToggleGroupContext);

  return (
    <Toggle
      variant={context.variant}
      size={context.size}
      {...props}
    />
  );
}

export type { ToggleGroupProps };
