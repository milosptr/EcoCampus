import * as React from "react";
import { YStack, XStack, Text, styled, Stack, ScrollView } from "tamagui";
import { Feather } from "@expo/vector-icons";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

const SidebarContainer = styled(YStack, {
  backgroundColor: "$background",
  height: "100%",
  variants: {
    state: {
      expanded: {
        width: 256,
      },
      collapsed: {
        width: 48,
      },
    },
  } as const,
} as any);

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  ...props
}: React.ComponentProps<typeof YStack> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const isMobile = false; // For React Native, adjust based on your platform detection

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <YStack flex={1} {...props}>
        {children}
      </YStack>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  children,
  ...props
}: React.ComponentProps<typeof SidebarContainer>) {
  const { state } = useSidebar();

  return (
    <SidebarContainer {...({ state } as any)} {...props}>
      {children}
    </SidebarContainer>
  );
}

const SidebarTriggerButton = styled(Stack, {
  width: 28,
  height: 28,
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  pressStyle: {
    opacity: 0.7,
  },
} as any);

function SidebarTrigger({
  onPress,
  ...props
}: { onPress?: () => void } & React.ComponentProps<typeof SidebarTriggerButton>) {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarTriggerButton
      onPress={(e) => {
        onPress?.(e as any);
        toggleSidebar();
      }}
      {...props}
    >
      <Feather name="menu" size={20} />
    </SidebarTriggerButton>
  );
}

function SidebarHeader({ children, ...props }: React.ComponentProps<typeof YStack>) {
  return (
    <YStack {...({ padding: "$2", gap: "$2" } as any)} {...props}>
      {children}
    </YStack>
  );
}

function SidebarFooter({ children, ...props }: React.ComponentProps<typeof YStack>) {
  return (
    <YStack {...({ padding: "$2", gap: "$2" } as any)} {...props}>
      {children}
    </YStack>
  );
}

function SidebarContent({ children, ...props }: React.ComponentProps<typeof ScrollView>) {
  return (
    <ScrollView flex={1} {...props}>
      <YStack flex={1} gap="$2">
        {children}
      </YStack>
    </ScrollView>
  );
}

function SidebarGroup({ children, ...props }: React.ComponentProps<typeof YStack>) {
  return (
    <YStack {...({ padding: "$2" } as any)} {...props}>
      {children}
    </YStack>
  );
}

function SidebarGroupLabel({ children, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...({
        fontSize: "$2",
        fontWeight: "500",
        opacity: 0.7,
        paddingHorizontal: "$2",
        paddingVertical: "$2",
      } as any)}
      {...props}
    >
      {children}
    </Text>
  );
}

function SidebarGroupContent({ children, ...props }: React.ComponentProps<typeof YStack>) {
  return (
    <YStack width="100%" {...props}>
      {children}
    </YStack>
  );
}

function SidebarMenu({ children, ...props }: React.ComponentProps<typeof YStack>) {
  return (
    <YStack width="100%" gap="$1" {...props}>
      {children}
    </YStack>
  );
}

function SidebarMenuItem({ children, ...props }: React.ComponentProps<typeof Stack>) {
  return <Stack {...props}>{children}</Stack>;
}

const SidebarMenuButtonStyled = styled(XStack, {
  width: "100%",
  alignItems: "center",
  gap: "$2",
  padding: "$2",
  borderRadius: "$2",
  cursor: "pointer",
  pressStyle: {
    backgroundColor: "$backgroundHover",
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: "$backgroundPress",
        fontWeight: "600",
      },
    },
  } as const,
} as any);

function SidebarMenuButton({
  isActive = false,
  children,
  onPress,
  ...props
}: {
  isActive?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
} & React.ComponentProps<typeof SidebarMenuButtonStyled>) {
  return (
    <SidebarMenuButtonStyled {...({ isActive } as any)} onPress={onPress} {...props}>
      {children}
    </SidebarMenuButtonStyled>
  );
}

function SidebarMenuSub({ children, ...props }: React.ComponentProps<typeof YStack>) {
  return (
    <YStack
      {...({
        marginLeft: "$3.5",
        paddingLeft: "$2.5",
        paddingVertical: "$0.5",
        borderLeftWidth: 1,
        borderLeftColor: "$borderColor",
        gap: "$1",
      } as any)}
      {...props}
    >
      {children}
    </YStack>
  );
}

function SidebarMenuSubItem({ children, ...props }: React.ComponentProps<typeof Stack>) {
  return <Stack {...props}>{children}</Stack>;
}

const SidebarMenuSubButtonStyled = styled(XStack, {
  minWidth: 0,
  alignItems: "center",
  gap: "$2",
  paddingHorizontal: "$2",
  height: 28,
  borderRadius: "$2",
  cursor: "pointer",
  pressStyle: {
    backgroundColor: "$backgroundHover",
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: "$backgroundPress",
      },
    },
  } as const,
} as any);

function SidebarMenuSubButton({
  isActive = false,
  children,
  onPress,
  ...props
}: {
  isActive?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
} & React.ComponentProps<typeof SidebarMenuSubButtonStyled>) {
  return (
    <SidebarMenuSubButtonStyled {...({ isActive } as any)} onPress={onPress} {...props}>
      {children}
    </SidebarMenuSubButtonStyled>
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
