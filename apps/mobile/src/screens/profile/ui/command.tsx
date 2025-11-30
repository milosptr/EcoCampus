import * as React from "react";
import { YStack, XStack, Input, Text, styled, ScrollView } from "tamagui";
import { Feather } from "@expo/vector-icons";

// This is a simplified command palette for React Native
// For web, cmdk is great, but for mobile we need a simpler approach

type CommandContextProps = {
  search: string;
  setSearch: (search: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const CommandContext = React.createContext<CommandContextProps | null>(null);

function useCommand() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error("useCommand must be used within a <Command />");
  }
  return context;
}

const CommandContainer = styled(YStack, {
  backgroundColor: "$background",
  borderRadius: "$4",
  overflow: "hidden",
  width: "100%",
  height: "100%",
} as any);

function Command({
  children,
  ...props
}: React.ComponentProps<typeof CommandContainer>) {
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const contextValue = React.useMemo<CommandContextProps>(
    () => ({
      search,
      setSearch,
      selectedIndex,
      setSelectedIndex,
    }),
    [search, selectedIndex]
  );

  return (
    <CommandContext.Provider value={contextValue}>
      <CommandContainer {...props}>{children}</CommandContainer>
    </CommandContext.Provider>
  );
}

function CommandDialog({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  // This would integrate with a modal/dialog component
  // For now, it's a simple wrapper
  return open ? <YStack>{children}</YStack> : null;
}

const CommandInputWrapper = styled(XStack, {
  alignItems: "center",
  gap: "$2",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
  paddingHorizontal: "$3",
  height: 40,
} as any);

function CommandInput({
  placeholder = "Search...",
  ...props
}: React.ComponentProps<typeof Input> & { placeholder?: string }) {
  const { search, setSearch } = useCommand();

  return (
    <CommandInputWrapper>
      <Feather name="search" size={16} opacity={0.5} />
      <Input
        value={search}
        onChangeText={setSearch}
        placeholder={placeholder}
        flex={1}
        borderWidth={0}
        {...({ backgroundColor: "transparent" } as any)}
        padding="$0"
        height="100%"
        focusStyle={{
          borderWidth: 0,
        }}
        {...props}
      />
    </CommandInputWrapper>
  );
}

const CommandListContainer = styled(ScrollView, {
  maxHeight: 300,
  flex: 1,
} as any);

function CommandList({
  children,
  ...props
}: React.ComponentProps<typeof CommandListContainer>) {
  return <CommandListContainer {...props}>{children}</CommandListContainer>;
}

const CommandEmptyContainer = styled(YStack, {
  paddingVertical: "$6",
  justifyContent: "center",
  alignItems: "center",
} as any);

function CommandEmpty({
  children = "No results found.",
  ...props
}: React.ComponentProps<typeof CommandEmptyContainer> & {
  children?: React.ReactNode;
}) {
  return (
    <CommandEmptyContainer {...props}>
      <Text fontSize="$3">{children}</Text>
    </CommandEmptyContainer>
  );
}

const CommandGroupContainer = styled(YStack, {
  overflow: "hidden",
  padding: "$1",
} as any);

const CommandGroupHeading = styled(Text, {
  fontSize: "$2",
  fontWeight: "500",
  paddingHorizontal: "$2",
  paddingVertical: "$1.5",
  opacity: 0.7,
} as any);

function CommandGroup({
  heading,
  children,
  ...props
}: React.ComponentProps<typeof CommandGroupContainer> & {
  heading?: string;
}) {
  return (
    <CommandGroupContainer {...props}>
      {heading && <CommandGroupHeading>{heading}</CommandGroupHeading>}
      {children}
    </CommandGroupContainer>
  );
}

const CommandSeparatorLine = styled(YStack, {
  height: 1,
  backgroundColor: "$borderColor",
  marginHorizontal: "$1",
} as any);

function CommandSeparator({ ...props }: React.ComponentProps<typeof CommandSeparatorLine>) {
  return <CommandSeparatorLine {...props} />;
}

const CommandItemButton = styled(XStack, {
  alignItems: "center",
  gap: "$2",
  borderRadius: "$2",
  paddingHorizontal: "$2",
  paddingVertical: "$1.5",
  cursor: "pointer",
  pressStyle: {
    backgroundColor: "$backgroundHover",
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: "$backgroundPress",
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,
} as any);

function CommandItem({
  children,
  onSelect,
  disabled = false,
  ...props
}: React.ComponentProps<typeof CommandItemButton> & {
  onSelect?: () => void;
  disabled?: boolean;
}) {
  return (
    <CommandItemButton
      {...({ isDisabled: disabled } as any)}
      onPress={onSelect}
      {...props}
    >
      {children}
    </CommandItemButton>
  );
}

const CommandShortcutText = styled(Text, {
  fontSize: "$2",
  opacity: 0.7,
  marginLeft: "auto",
  letterSpacing: 1,
} as any);

function CommandShortcut({
  children,
  ...props
}: React.ComponentProps<typeof CommandShortcutText>) {
  return <CommandShortcutText {...props}>{children}</CommandShortcutText>;
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
