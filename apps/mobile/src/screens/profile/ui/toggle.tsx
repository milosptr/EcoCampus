import { XStack } from "tamagui";
import { useState } from "react";

type ToggleVariant = "default" | "outline";
type ToggleSize = "default" | "sm" | "lg";

interface ToggleProps extends React.ComponentProps<typeof XStack> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const sizeStyles = {
  default: { height: 36, minWidth: 36, px: "$2" },
  sm: { height: 32, minWidth: 32, px: "$1.5" },
  lg: { height: 40, minWidth: 40, px: "$2.5" },
};

export function Toggle({
  variant = "default",
  size = "default",
  pressed: controlledPressed,
  onPressedChange,
  ...props
}: ToggleProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(false);
  const pressed = controlledPressed !== undefined ? controlledPressed : uncontrolledPressed;

  const handlePress = () => {
    const newPressed = !pressed;
    if (onPressedChange) {
      onPressedChange(newPressed);
    } else {
      setUncontrolledPressed(newPressed);
    }
  };

  return (
    <XStack
      {...(props as any)}
      {...sizeStyles[size]}
      alignItems="center"
      justifyContent="center"
      gap="$2"
      borderRadius="$3"
      fontSize="$2"
      fontWeight="500"
      cursor="pointer"
      backgroundColor={pressed ? "$backgroundHover" : "transparent"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="$borderColor"
      hoverStyle={{
        backgroundColor: "$backgroundHover",
      }}
      pressStyle={{
        opacity: 0.8,
      }}
      onPress={handlePress}
    />
  );
}

export type { ToggleProps };
