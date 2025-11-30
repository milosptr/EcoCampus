import type {
  Gender,
  DietaryPreference,
  TransportMode,
  HousingType,
} from '@/src/store/useOnboardingStore'

export const genderOptions: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

export const dietOptions: {
  value: DietaryPreference
  label: string
  emoji: string
}[] = [
  { value: 'omnivore', label: 'Omnivore', emoji: '🍖' },
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'pescatarian', label: 'Pescatarian', emoji: '🐟' },
]

export const transportOptions: {
  value: TransportMode
  label: string
  emoji: string
}[] = [
  { value: 'walk', label: 'Walk', emoji: '🚶' },
  { value: 'bike', label: 'Bike', emoji: '🚴' },
  { value: 'bus', label: 'Bus', emoji: '🚌' },
  { value: 'car', label: 'Car', emoji: '🚗' },
  { value: 'carpool', label: 'Carpool', emoji: '🚙' },
]

export const housingOptions: {
  value: HousingType
  label: string
  emoji: string
}[] = [
  { value: 'dorm', label: 'Dorm', emoji: '🏫' },
  { value: 'apartment', label: 'Apartment', emoji: '🏢' },
  { value: 'house', label: 'House', emoji: '🏡' },
  { value: 'shared-housing', label: 'Shared', emoji: '🏘️' },
]

export const universities = [
  'Reykjavik University, Iceland',
  'Unicorn University, Czechia',
  'University of Würzburg, Germany',
].sort()
