import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text, Button, Dialog, Sheet } from "tamagui";

interface ProfileImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageUrl: string) => void;
  currentImage?: string;
}

export function ProfileImageUploadDialog({
  isOpen,
  onClose,
  onUpload,
  currentImage
}: ProfileImageUploadDialogProps) {

  const handleFileUpload = () => {
    // Simuliere Upload - in echter App würde hier File Input verwendet
    const demoImages = [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    ];
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    onUpload(randomImage);
    onClose();
  };

  const handleRemove = () => {
    onUpload("");
    onClose();
  };

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={onClose}
      dismissOnSnapToBottom
      zIndex={100000}
    >
      <Sheet.Overlay {...({ backgroundColor: "rgba(0, 0, 0, 0.5)" } as any)} />
      <Sheet.Frame {...({ borderTopLeftRadius: "$8", borderTopRightRadius: "$8", padding: "$4", backgroundColor: "white" } as any)}>
        <YStack {...({ gap: "$4", paddingTop: "$2" } as any)}>
          <Text {...({ fontSize: "$7", fontWeight: "600", color: "#5F7E68", textAlign: "center" } as any)}>Change Profile Picture</Text>

          <YStack {...({ gap: "$3", paddingVertical: "$4" } as any)}>
            <Button
              onPress={handleFileUpload}
              {...({
                borderRadius: "$6",
                height: 48,
                justifyContent: "flex-start",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#9DBFA8",
                pressStyle: { opacity: 0.8 }
              } as any)}
            >
              <XStack {...({ alignItems: "center", gap: "$3" } as any)}>
                <Feather name="upload" size={20} color="#5F7E68" />
                <Text color="#5F7E68">Upload from Gallery</Text>
              </XStack>
            </Button>

            <Button
              onPress={handleFileUpload}
              {...({
                borderRadius: "$6",
                height: 48,
                justifyContent: "flex-start",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#9DBFA8",
                pressStyle: { opacity: 0.8 }
              } as any)}
            >
              <XStack {...({ alignItems: "center", gap: "$3" } as any)}>
                <Feather name="camera" size={20} color="#5F7E68" />
                <Text color="#5F7E68">Take Photo</Text>
              </XStack>
            </Button>

            {currentImage && (
              <Button
                onPress={handleRemove}
                {...({
                  borderRadius: "$6",
                  height: 48,
                  justifyContent: "flex-start",
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#EA715B",
                  pressStyle: { opacity: 0.8 }
                } as any)}
              >
                <XStack {...({ alignItems: "center", gap: "$3" } as any)}>
                  <Feather name="x" size={20} color="#EA715B" />
                  <Text color="#EA715B">Remove Photo</Text>
                </XStack>
              </Button>
            )}
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
