import { useState } from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { Gender, DietaryPreference } from '@/src/store/useOnboardingStore'
import { useOnboardingStore } from '@/src/store/useOnboardingStore'

import { SafeAreaScreen } from '@/src/components'
import { genderOptions, dietOptions } from '@/src/constants/onboarding'
import { Colors } from '@/src/constants/Colors'

export default function ProfileScreen() {
  const router = useRouter()
  const store = useOnboardingStore()

  const [fullName, setFullName] = useState(store.fullName)
  const [age, setAge] = useState(store.age)
  const [gender, setGender] = useState<Gender | null>(store.gender)
  const [diet, setDiet] = useState<DietaryPreference | null>(
    store.dietaryPreference
  )

  const handleContinue = () => {
    if (!fullName.trim() || !age.trim()) return

    store.setPersonalProfile({
      fullName: fullName.trim(),
      age: age.trim(),
      gender,
      dietaryPreference: diet,
    })
    router.push('/onboarding/university')
  }

  const isValid = fullName.trim().length > 0 && age.trim().length > 0

  return (
    <SafeAreaScreen style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <MotiView
          from={{ translateY: -20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>
              Help us personalize your experience
            </Text>
          </View>
        </MotiView>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <MotiView
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your full name'
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor='#999'
              />
            </View>
          </MotiView>

          {/* Age Input */}
          <MotiView
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 300 }}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age *</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your age'
                value={age}
                onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
                keyboardType='number-pad'
                placeholderTextColor='#999'
              />
            </View>
          </MotiView>

          {/* Gender Selection */}
          <MotiView
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 400 }}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.optionsRow}>
                {genderOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    style={({ pressed }) => [
                      styles.optionButton,
                      gender === option.value && styles.optionButtonSelected,
                      pressed && styles.optionButtonPressed,
                    ]}
                    onPress={() => setGender(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        gender === option.value &&
                          styles.optionButtonTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </MotiView>

          {/* Dietary Preference */}
          <MotiView
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 500 }}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Dietary Preference
                <Text style={styles.optionalText}> (Optional)</Text>
              </Text>
              <View style={styles.optionsRow}>
                {dietOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    style={({ pressed }) => [
                      styles.optionButton,
                      diet === option.value && styles.dietOptionSelected,
                      pressed && styles.optionButtonPressed,
                    ]}
                    onPress={() => setDiet(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        diet === option.value && styles.dietOptionTextSelected,
                      ]}
                    >
                      {option.emoji} {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </MotiView>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <MotiView
        from={{ translateY: 30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 600 }}
        style={styles.footer}
      >
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            !isValid && styles.continueButtonDisabled,
            pressed && isValid && styles.buttonPressed,
          ]}
          onPress={handleContinue}
          disabled={!isValid}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Feather name='arrow-right' size={20} color='#fff' />
        </Pressable>
      </MotiView>
    </SafeAreaScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    gap: 24,
  },
  header: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    paddingVertical: 20,
    paddingBottom: 32,
    backgroundColor: 'transparent',
  },
  title: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    backgroundColor: Colors.border,
    height: 4,
    width: 50,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: Colors.primary,
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  optionalText: {
    color: Colors.textMuted,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionButtonSelected: {
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  dietOptionSelected: {
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  optionButtonPressed: {
    opacity: 0.7,
  },
  optionButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  optionButtonTextSelected: {
    color: Colors.text,
  },
  dietOptionTextSelected: {
    color: Colors.text,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.disabled,
    borderColor: Colors.textMuted,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonPressed: {
    opacity: 0.9,
  },
})
