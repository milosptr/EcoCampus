import * as React from "react";
import { XStack, YStack, styled, Stack } from "tamagui";
import { Feather } from "@expo/vector-icons";

const PaginationContainer = styled(XStack, {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
} as any);

const PaginationContentContainer = styled(XStack, {
  flexDirection: "row",
  alignItems: "center",
  gap: "$1",
} as any);

const PaginationItemContainer = styled(Stack, {} as any);

const PaginationLinkButton = styled(Stack, {
  height: 36,
  width: 36,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "$2",
  cursor: "pointer",
  pressStyle: {
    opacity: 0.8,
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: "$background",
        borderWidth: 1,
        borderColor: "$borderColor",
      },
      false: {
        backgroundColor: "transparent",
      },
    },
  } as const,
} as any);

function Pagination({ children, ...props }: React.ComponentProps<typeof PaginationContainer>) {
  return (
    <PaginationContainer {...props}>
      {children}
    </PaginationContainer>
  );
}

function PaginationContent({ children, ...props }: React.ComponentProps<typeof PaginationContentContainer>) {
  return (
    <PaginationContentContainer {...props}>
      {children}
    </PaginationContentContainer>
  );
}

function PaginationItem({ children, ...props }: React.ComponentProps<typeof PaginationItemContainer>) {
  return <PaginationItemContainer {...props}>{children}</PaginationItemContainer>;
}

type PaginationLinkProps = {
  isActive?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
} & React.ComponentProps<typeof PaginationLinkButton>;

function PaginationLink({
  isActive = false,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLinkButton {...({ isActive } as any)} {...props}>
      {children}
    </PaginationLinkButton>
  );
}

function PaginationPrevious({
  onPress,
  ...props
}: { onPress?: () => void } & React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink onPress={onPress} {...props}>
      <XStack {...({ gap: "$1", paddingHorizontal: "$2.5", alignItems: "center" } as any)}>
        <Feather name="chevron-left" size={16} />
      </XStack>
    </PaginationLink>
  );
}

function PaginationNext({
  onPress,
  ...props
}: { onPress?: () => void } & React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink onPress={onPress} {...props}>
      <XStack {...({ gap: "$1", paddingHorizontal: "$2.5", alignItems: "center" } as any)}>
        <Feather name="chevron-right" size={16} />
      </XStack>
    </PaginationLink>
  );
}

function PaginationEllipsis({ ...props }: React.ComponentProps<typeof Stack>) {
  return (
    <Stack
      {...({
        height: 36,
        width: 36,
        justifyContent: "center",
        alignItems: "center",
      } as any)}
      {...props}
    >
      <Feather name="more-horizontal" size={16} />
    </Stack>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
