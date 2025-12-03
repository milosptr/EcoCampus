import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'

interface ProfileImageUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (imageUrl: string) => void
  currentImage?: string
}

export function ProfileImageUploadDialog({
  isOpen,
  onClose,
  onUpload,
  currentImage,
}: ProfileImageUploadDialogProps) {
  const handleFileUpload = () => {
    // Simulate upload - in a real app this would use image picker
    const demoImages = [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    ]
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)]
    onUpload(randomImage)
    onClose()
  }

  const handleRemove = () => {
    onUpload('')
    onClose()
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />

          <Text style={styles.title}>Change Profile Picture</Text>

          <View style={styles.optionsContainer}>
            <Pressable
              onPress={handleFileUpload}
              style={({ pressed }) => [
                styles.optionButton,
                pressed && styles.optionButtonPressed,
              ]}
            >
              <Feather name="upload" size={20} color={Colors.primary} />
              <Text style={styles.optionText}>Upload from Gallery</Text>
            </Pressable>

            <Pressable
              onPress={handleFileUpload}
              style={({ pressed }) => [
                styles.optionButton,
                pressed && styles.optionButtonPressed,
              ]}
            >
              <Feather name="camera" size={20} color={Colors.primary} />
              <Text style={styles.optionText}>Take Photo</Text>
            </Pressable>

            {currentImage && (
              <Pressable
                onPress={handleRemove}
                style={({ pressed }) => [
                  styles.optionButton,
                  styles.removeButton,
                  pressed && styles.optionButtonPressed,
                ]}
              >
                <Feather name="x" size={20} color={Colors.error} />
                <Text style={styles.removeText}>Remove Photo</Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
    paddingVertical: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 12,
  },
  optionButtonPressed: {
    opacity: 0.8,
  },
  optionText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500',
  },
  removeButton: {
    borderColor: Colors.error,
  },
  removeText: {
    fontSize: 15,
    color: Colors.error,
    fontWeight: '500',
  },
})
