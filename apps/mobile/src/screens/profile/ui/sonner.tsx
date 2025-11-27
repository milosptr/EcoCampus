import * as React from "react";
import { YStack } from "tamagui";

// For React Native toast notifications, consider using:
// - react-native-toast-message
// - react-native-toast-notifications
// - @tamagui/toast

// This is a placeholder component
// Tamagui has its own Toast component that can be used

function Toaster({ ...props }: React.ComponentProps<typeof YStack>) {
  // This would typically render a toast container
  // For now, it's an empty placeholder
  return <YStack {...props} />;
}

// Helper functions that would typically be provided by a toast library
const toast = {
  success: (message: string) => {
    console.log("Success toast:", message);
  },
  error: (message: string) => {
    console.error("Error toast:", message);
  },
  info: (message: string) => {
    console.info("Info toast:", message);
  },
  warning: (message: string) => {
    console.warn("Warning toast:", message);
  },
  custom: (component: React.ReactNode) => {
    console.log("Custom toast:", component);
  },
};

export { Toaster, toast };
