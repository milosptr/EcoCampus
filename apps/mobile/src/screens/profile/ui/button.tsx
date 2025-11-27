import { Button as TamaguiButton, styled, GetProps } from "tamagui";

export const Button = styled(TamaguiButton, {
  name: "Button",

  variants: {
    variant: {
      default: {
        backgroundColor: "$primary",
        color: "white",
        hoverStyle: {
          opacity: 0.9,
        },
        pressStyle: {
          opacity: 0.9,
        },
      },
      destructive: {
        backgroundColor: "$error",
        color: "white",
        hoverStyle: {
          opacity: 0.9,
        },
        pressStyle: {
          opacity: 0.9,
        },
      },
      outline: {
        borderWidth: 1,
        borderColor: "$borderColor",
        backgroundColor: "$background",
        color: "$color",
        hoverStyle: {
          backgroundColor: "$backgroundHover",
        },
        pressStyle: {
          backgroundColor: "$backgroundPress",
        },
      },
      secondary: {
        backgroundColor: "$secondary",
        color: "$color",
        hoverStyle: {
          opacity: 0.8,
        },
        pressStyle: {
          opacity: 0.8,
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "$color",
        hoverStyle: {
          backgroundColor: "$backgroundHover",
        },
        pressStyle: {
          backgroundColor: "$backgroundPress",
        },
      },
      link: {
        backgroundColor: "transparent",
        color: "$primary",
        textDecorationLine: "underline",
        hoverStyle: {
          opacity: 0.7,
        },
        pressStyle: {
          opacity: 0.7,
        },
      },
    },
    size: {
      default: {
        height: 36,
        px: "$4",
        py: "$2",
      },
      sm: {
        height: 32,
        px: "$3",
      },
      lg: {
        height: 40,
        px: "$6",
      },
      icon: {
        width: 36,
        height: 36,
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ButtonProps = GetProps<typeof Button>;
