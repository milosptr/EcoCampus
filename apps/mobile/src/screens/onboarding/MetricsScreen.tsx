import { useState } from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import {
  useOnboardingStore,
  TransportMode,
  HousingType,
} from '@/src/store/useOnboardingStore'

import { SafeAreaScreen, Card } from '@/src/components'
import { transportOptions, housingOptions } from '@/src/constants/onboarding'

export default function MetricsScreen() {
  const router = useRouter()
  const store = useOnboardingStore()

  const [distance, setDistance] = useState(store.distanceFromCampus)
  const [transport, setTransport] = useState<TransportMode | null>(
    store.transportMode
  )
  const [visits, setVisits] = useState(store.weeklyCampusVisits)
  const [housing, setHousing] = useState<HousingType | null>(store.housingType)

  const handleContinue = () => {
    store.setCommuteMetrics({
      distanceFromCampus: distance,
      transportMode: transport,
      weeklyCampusVisits: visits,
      housingType: housing,
    })
    router.push('/onboarding/success')
  }

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
            <Text style={styles.title}>Your campus routine</Text>
            <Text style={styles.subtitle}>
              Help us calculate your environmental impact
            </Text>
          </View>
        </MotiView>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Distance Slider */}
        <MotiView
          from={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
        >
          <Card>
            <View style={styles.sliderSection}>
              <View style={styles.sliderHeader}>
                <Text style={styles.label}>Distance from Campus</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{distance} km</Text>
                </View>
              </View>
              <Slider
                style={styles.slider}
                value={distance}
                onValueChange={setDistance}
                minimumValue={0}
                maximumValue={50}
                step={1}
                minimumTrackTintColor='#4CAF50'
                maximumTrackTintColor='#E0E0E0'
                thumbTintColor='#4CAF50'
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>0 km</Text>
                <Text style={styles.sliderLabelText}>50 km</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Transport Mode */}
        <MotiView
          from={{ translateX: -30, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 300 }}
        >
          <View style={styles.section}>
            <Text style={styles.label}>Primary Transport Mode</Text>
            <View style={styles.optionsRow}>
              {transportOptions.map((option) => (
                <Pressable
                  key={option.value}
                  style={({ pressed }) => [
                    styles.optionButton,
                    transport === option.value &&
                      styles.transportButtonSelected,
                    pressed && styles.optionButtonPressed,
                  ]}
                  onPress={() => setTransport(option.value)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      transport === option.value &&
                        styles.optionButtonTextSelected,
                    ]}
                  >
                    {option.emoji} {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </MotiView>

        {/* Weekly Visits Slider */}
        <MotiView
          from={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 400 }}
        >
          <Card>
            <View style={styles.sliderSection}>
              <View style={styles.sliderHeader}>
                <Text style={styles.label}>Weekly Campus Visits</Text>
                <View style={styles.badgeSecondary}>
                  <Text style={styles.badgeText}>
                    {visits} {visits === 1 ? 'day' : 'days'}
                  </Text>
                </View>
              </View>
              <Slider
                style={styles.slider}
                value={visits}
                onValueChange={setVisits}
                minimumValue={1}
                maximumValue={7}
                step={1}
                minimumTrackTintColor='#8E44AD'
                maximumTrackTintColor='#E0E0E0'
                thumbTintColor='#8E44AD'
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>1 day</Text>
                <Text style={styles.sliderLabelText}>7 days</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Housing Type */}
        <MotiView
          from={{ translateX: -30, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 500 }}
        >
          <View style={styles.section}>
            <Text style={styles.label}>
              Housing Type
              <Text style={styles.optionalText}> (Optional)</Text>
            </Text>
            <View style={styles.optionsRow}>
              {housingOptions.map((option) => (
                <Pressable
                  key={option.value}
                  style={({ pressed }) => [
                    styles.optionButton,
                    housing === option.value && styles.housingButtonSelected,
                    pressed && styles.optionButtonPressed,
                  ]}
                  onPress={() => setHousing(option.value)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      housing === option.value &&
                        styles.housingButtonTextSelected,
                    ]}
                  >
                    {option.emoji} {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </MotiView>
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
            pressed && styles.buttonPressed,
          ]}
          onPress={handleContinue}
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
    backgroundColor: '#FAFAFA',
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
    gap: 28,
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
    color: '#1A1A1A',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#757575',
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
    backgroundColor: '#E0E0E0',
    height: 4,
    width: 50,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: '#4CAF50',
  },
  sliderSection: {
    gap: 12,
    padding: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.2,
  },
  optionalText: {
    color: '#9E9E9E',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  badgeSecondary: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8E44AD',
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabelText: {
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  section: {
    gap: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 95,
  },
  transportButtonSelected: {
    backgroundColor: '#F3E5F5',
    borderWidth: 1,
    borderColor: '#8E44AD',
  },
  housingButtonSelected: {
    backgroundColor: '#FFF9C4',
    borderWidth: 1,
    borderColor: '#FFD54F',
  },
  optionButtonPressed: {
    opacity: 0.7,
  },
  optionButtonText: {
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
    fontWeight: '600',
  },
  optionButtonTextSelected: {
    color: '#6A1B9A',
  },
  housingButtonTextSelected: {
    color: '#F57F17',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#45A049',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonPressed: {
    opacity: 0.9,
  },
})
