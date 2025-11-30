import * as React from "react";
import { YStack, XStack, styled } from "tamagui";
import { Feather } from "@expo/vector-icons";

// Simplified resizable panels for React Native
// For full functionality, you'd need react-native-gesture-handler and react-native-reanimated

type ResizableContextProps = {
  direction: "horizontal" | "vertical";
};

const ResizableContext = React.createContext<ResizableContextProps>({
  direction: "horizontal",
});

const ResizablePanelGroupContainer = styled(XStack, {
  width: "100%",
  height: "100%",
  variants: {
    direction: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
  } as const,
} as any);

function ResizablePanelGroup({
  direction = "horizontal",
  children,
  ...props
}: {
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof ResizablePanelGroupContainer>, 'direction'>) {
  return (
    <ResizableContext.Provider value={{ direction }}>
      <ResizablePanelGroupContainer {...({ direction } as any)} {...props}>
        {children}
      </ResizablePanelGroupContainer>
    </ResizableContext.Provider>
  );
}

const ResizablePanelContainer = styled(YStack, {
  flex: 1,
} as any);

function ResizablePanel({
  defaultSize,
  minSize,
  maxSize,
  children,
  ...props
}: {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children: React.ReactNode;
} & React.ComponentProps<typeof ResizablePanelContainer>) {
  return (
    <ResizablePanelContainer {...props}>
      {children}
    </ResizablePanelContainer>
  );
}

const ResizableHandleContainer = styled(YStack, {
  backgroundColor: "$borderColor",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  variants: {
    direction: {
      horizontal: {
        width: 1,
        height: "100%",
        cursor: "col-resize",
      },
      vertical: {
        width: "100%",
        height: 1,
        cursor: "row-resize",
      },
    },
    withHandle: {
      true: {},
    },
  } as const,
} as any);

const HandleIcon = styled(YStack, {
  backgroundColor: "$borderColor",
  borderWidth: 1,
  borderColor: "$borderColor",
  borderRadius: "$1",
  zIndex: 10,
  justifyContent: "center",
  alignItems: "center",
  variants: {
    direction: {
      horizontal: {
        width: 12,
        height: 16,
      },
      vertical: {
        width: 16,
        height: 12,
        transform: [{ rotate: "90deg" }],
      },
    },
  } as const,
} as any);

function ResizableHandle({
  withHandle = false,
  ...props
}: {
  withHandle?: boolean;
} & Omit<React.ComponentProps<typeof ResizableHandleContainer>, 'direction' | 'withHandle'>) {
  const { direction } = React.useContext(ResizableContext);

  return (
    <ResizableHandleContainer
      {...({ direction, withHandle } as any)}
      {...props}
    >
      {withHandle && (
        <HandleIcon {...({ direction } as any)}>
          <Feather name="more-vertical" size={10} />
        </HandleIcon>
      )}
    </ResizableHandleContainer>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
