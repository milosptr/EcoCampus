import * as React from "react";
import { YStack, XStack, styled, Button } from "tamagui";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Dimensions } from "react-native";

// Simple carousel implementation for React Native
// For more advanced features, consider using react-native-reanimated-carousel

type CarouselContextProps = {
  scrollViewRef: React.RefObject<ScrollView | null>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  itemWidth: number;
  itemCount: number;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const CarouselContainer = styled(YStack, {
  position: "relative",
});

function Carousel({
  children,
  ...props
}: React.ComponentProps<typeof CarouselContainer>) {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(Dimensions.get("window").width);
  const [itemCount, setItemCount] = React.useState(0);

  React.useEffect(() => {
    const childArray = React.Children.toArray(children);
    const contentChild = childArray.find(
      (child) => React.isValidElement(child) && child.type === CarouselContent
    );
    if (React.isValidElement(contentChild) && contentChild.props) {
      setItemCount(React.Children.count((contentChild.props as any).children));
    }
  }, [children]);

  const contextValue = React.useMemo<CarouselContextProps>(
    () => ({
      scrollViewRef,
      currentIndex,
      setCurrentIndex,
      itemWidth,
      itemCount,
    }),
    [currentIndex, itemWidth, itemCount]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <CarouselContainer {...props}>{children}</CarouselContainer>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  children,
  ...props
}: React.ComponentProps<typeof XStack>) {
  const { scrollViewRef, setCurrentIndex, itemWidth } = useCarousel();

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemWidth);
    setCurrentIndex(index);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <XStack {...props}>{children}</XStack>
    </ScrollView>
  );
}

const CarouselItemContainer = styled(YStack, {
  minWidth: "100%",
  flexShrink: 0,
  flexGrow: 0,
} as any);

function CarouselItem({
  children,
  ...props
}: React.ComponentProps<typeof CarouselItemContainer>) {
  return <CarouselItemContainer {...props}>{children}</CarouselItemContainer>;
}

const NavigationButton = styled(Button, {
  position: "absolute",
  width: 32,
  height: 32,
  borderRadius: "$round",
  backgroundColor: "$background",
  borderWidth: 1,
  borderColor: "$borderColor",
  justifyContent: "center",
  alignItems: "center",
  pressStyle: {
    opacity: 0.8,
  },
} as any);

function CarouselPrevious({ ...props }: React.ComponentProps<typeof NavigationButton>) {
  const { scrollViewRef, currentIndex, setCurrentIndex, itemWidth } = useCarousel();

  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({
        x: newIndex * itemWidth,
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <NavigationButton
      {...({
        position: "absolute",
        top: "50%",
        left: -48,
        transform: [{ translateY: -16 }],
      } as any)}
      disabled={currentIndex === 0}
      onPress={scrollToPrevious}
      {...props}
    >
      <Feather name="arrow-left" size={16} />
    </NavigationButton>
  );
}

function CarouselNext({ ...props }: React.ComponentProps<typeof NavigationButton>) {
  const { scrollViewRef, currentIndex, setCurrentIndex, itemWidth, itemCount } = useCarousel();

  const scrollToNext = () => {
    if (currentIndex < itemCount - 1) {
      const newIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: newIndex * itemWidth,
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <NavigationButton
      {...({
        position: "absolute",
        top: "50%",
        right: -48,
        transform: [{ translateY: -16 }],
      } as any)}
      disabled={currentIndex === itemCount - 1}
      onPress={scrollToNext}
      {...props}
    >
      <Feather name="arrow-right" size={16} />
    </NavigationButton>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
