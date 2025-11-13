import { YStack, XStack } from "tamagui";
import { useState } from "react";

interface CollapsibleProps extends React.ComponentProps<typeof YStack> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export function Collapsible({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setUncontrolledOpen(newOpen);
    }
  };

  return (
    <YStack {...(props as any)}>
      {typeof children === "function" ? children({ open, setOpen: handleOpenChange }) : children}
    </YStack>
  );
}

export function CollapsibleTrigger(props: React.ComponentProps<typeof XStack>) {
  return <XStack {...(props as any)} cursor="pointer" />;
}

interface CollapsibleContentProps extends React.ComponentProps<typeof YStack> {
  forceMount?: boolean;
}

export function CollapsibleContent({ children, ...props }: CollapsibleContentProps) {
  return (
    <YStack
      {...(props as any)}
      animation="quick"
      enterStyle={{ opacity: 0, height: 0 }}
      exitStyle={{ opacity: 0, height: 0 }}
    >
      {children}
    </YStack>
  );
}
