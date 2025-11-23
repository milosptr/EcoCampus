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
import { useOnboardingStore } from '@/src/store/useOnboardingStore'

import { SafeAreaScreen, Card } from '@/src/components'
import { universities } from '@/src/constants/onboarding'

export default function UniversityScreen() {
  const router = useRouter()
  const store = useOnboardingStore()

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(store.university)

  const filteredUniversities = universities.filter((uni) =>
    uni.toLowerCase().includes(search.toLowerCase())
  )

  const handleContinue = () => {
    if (!selected) return
    store.setUniversity(selected)
    router.push('/onboarding/metrics')
  }

  return (
    <SafeAreaScreen style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Header */}
        <MotiView
          from={{ translateY: -20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Select your university</Text>
            <Text style={styles.subtitle}>Join your campus community</Text>
          </View>
        </MotiView>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        {/* Search Input */}
        <MotiView
          from={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
        >
          <Card>
            <View style={styles.searchContainer}>
              <Feather name='search' size={20} color='#4CAF50' />
              <TextInput
                style={styles.searchInput}
                placeholder='Search universities...'
                value={search}
                onChangeText={setSearch}
                placeholderTextColor='#999'
              />
            </View>
          </Card>
        </MotiView>
      </View>

      {/* Info Banner */}
      <Card variant='info' style={styles.infoBanner}>
        <Feather name='mail' size={16} color='#2196F3' />
        <Text style={styles.infoBannerText}>
          Email verification required after signup
        </Text>
      </Card>

      {/* University List */}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredUniversities.map((uni, index) => (
          <MotiView
            key={uni}
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 400,
              delay: 300 + index * 30,
            }}
          >
            <Pressable
              onPress={() => setSelected(uni)}
              style={({ pressed }) => [pressed && styles.itemPressed]}
            >
              <Card variant={selected === uni ? 'selected' : 'default'}>
                <View style={styles.universityItemContent}>
                  <Text
                    style={[
                      styles.universityItemText,
                      selected === uni && styles.universityItemTextSelected,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {uni}
                  </Text>
                  {selected === uni && (
                    <Feather name='check-circle' size={20} color='#4CAF50' />
                  )}
                </View>
              </Card>
            </Pressable>
          </MotiView>
        ))}

        {filteredUniversities.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name='search' size={40} color='#E0E0E0' />
            <Text style={styles.emptyStateText}>No universities found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try a different search term
            </Text>
          </View>
        )}

        <View style={styles.listBottomPadding} />
      </ScrollView>

      {/* Continue Button */}
      <MotiView
        from={{ translateY: 30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 400 }}
        style={styles.footer}
      >
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            !selected && styles.continueButtonDisabled,
            pressed && selected && styles.buttonPressed,
          ]}
          onPress={handleContinue}
          disabled={!selected}
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
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    marginTop: 16,
    marginBottom: 8,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: '#1565C0',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: 16,
    gap: 12,
  },
  listBottomPadding: {
    height: 100,
  },
  universityItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  universityItemText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
    flex: 1,
  },
  universityItemTextSelected: {
    color: '#4CAF50',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateText: {
    color: '#9E9E9E',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyStateSubtext: {
    color: '#BDBDBD',
    fontSize: 14,
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
  continueButtonDisabled: {
    backgroundColor: '#BDBDBD',
    borderColor: '#9E9E9E',
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
  itemPressed: {
    opacity: 0.7,
  },
})
