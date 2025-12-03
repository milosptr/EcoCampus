import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native'
import type { ReactNode } from 'react'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'

interface ModalWrapperProps {
  visible: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function ModalWrapper({
  visible,
  title,
  onClose,
  children,
}: ModalWrapperProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <Feather name='x' size={22} color={Colors.primary} />
            </Pressable>
          </View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
  },
  closeButton: {
    padding: 4,
    borderRadius: 8,
  },
  closeButtonPressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
})
