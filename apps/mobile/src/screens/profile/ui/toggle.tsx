import React, { useEffect, useRef } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";

export interface ToggleProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export function Toggle({ value, onValueChange }: ToggleProps) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 24], // Bewegung des weißen Knopfes
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#D1D5DB", "#5F7E68"], // grau -> grün
  });

  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    padding: 3,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "white",
  },
});
