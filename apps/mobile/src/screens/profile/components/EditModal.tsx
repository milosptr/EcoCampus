import { useState, useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/src/constants/Colors'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  field: string
  currentValue: string
  onSave: (value: string) => void
}

const FIELD_LABELS: Record<string, string> = {
  fullName: 'Full Name',
  age: 'Age',
  gender: 'Gender',
  university: 'University',
  distance: 'Distance from Campus',
  transport: 'Primary Transport Mode',
}

const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']
const TRANSPORT_OPTIONS = [
  'Walk',
  'Bike',
  'Public Transit',
  'Car',
  'E-Scooter',
]

export function EditModal({
  isOpen,
  onClose,
  field,
  currentValue,
  onSave,
}: EditModalProps) {
  const [value, setValue] = useState(currentValue)

  useEffect(() => {
    setValue(currentValue)
  }, [currentValue, isOpen])

  const handleSave = () => {
    onSave(value)
    onClose()
  }

  const getFieldLabel = (fieldName: string) => {
    return FIELD_LABELS[fieldName] || fieldName
  }

  const renderSelectOption = (option: string, isSelected: boolean) => (
    <Pressable
      key={option}
      onPress={() => setValue(option)}
      style={({ pressed }) => [
        styles.selectOption,
        isSelected && styles.selectOptionSelected,
        pressed && styles.selectOptionPressed,
      ]}
    >
      <Text
        style={[
          styles.selectOptionText,
          isSelected && styles.selectOptionTextSelected,
        ]}
      >
        {option}
      </Text>
      {isSelected && (
        <Feather name="check" size={18} color={Colors.primary} />
      )}
    </Pressable>
  )

  const renderInput = () => {
    if (field === 'gender') {
      return (
        <View style={styles.optionsContainer}>
          {GENDER_OPTIONS.map((option) =>
            renderSelectOption(option, value === option)
          )}
        </View>
      )
    }

    if (field === 'transport') {
      return (
        <View style={styles.optionsContainer}>
          {TRANSPORT_OPTIONS.map((option) =>
            renderSelectOption(option, value === option)
          )}
        </View>
      )
    }

    return (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType={field === 'age' ? 'numeric' : 'default'}
        placeholderTextColor={Colors.textMuted}
      />
    )
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit {getFieldLabel(field)}</Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <Feather name="x" size={22} color={Colors.primary} />
            </Pressable>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.label}>{getFieldLabel(field)}</Text>
            {renderInput()}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.button,
                styles.saveButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
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
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    opacity: 0.7,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
  },
  optionsContainer: {
    gap: 8,
  },
  selectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },
  selectOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  selectOptionPressed: {
    opacity: 0.7,
  },
  selectOptionText: {
    fontSize: 16,
    color: Colors.text,
  },
  selectOptionTextSelected: {
    color: Colors.primary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  cancelButtonText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
})
