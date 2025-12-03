import { useState, useMemo } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, type Href } from 'expo-router'
import { Colors } from '@/src/constants/Colors'
import { useProfile } from '@/src/hooks/useProfile'
import { useModalManager } from '@/src/hooks/useModalManager'
import { ProfileHeader } from './components/ProfileHeader'
import { InfoList, type InfoCategory } from './components/InfoList'
import { ImpactCard } from './components/ImpactCard'
import { QuickActions } from './components/QuickActions'
import { EditModal } from './components/EditModal'
import { DeleteAccountModal } from './components/DeleteAccountModal'
import { ProfileImageUploadDialog } from './components/ProfileImageUploadDialog'

export default function ProfileScreen() {
  const router = useRouter()
  const { userData, impactStats, updateProfileField, updateAvatar } =
    useProfile()
  const { activeModal, openModal, closeModal } = useModalManager()

  const [editField, setEditField] = useState('')
  const [editValue, setEditValue] = useState('')

  const handleEditField = (field: string, value: string) => {
    setEditField(field)
    setEditValue(value)
    openModal('editProfile')
  }

  const handleSaveEdit = (value: string) => {
    updateProfileField(editField as keyof typeof userData, value)
    closeModal()
  }

  const handleImageUpload = (imageUrl: string) => {
    updateAvatar(imageUrl)
  }

  const handleDeleteAccount = () => {
    console.log('Account deleted')
    closeModal()
  }

  const infoCategories: InfoCategory[] = useMemo(
    () => [
      {
        id: 'personal',
        title: 'Personal',
        icon: 'user',
        items: [
          { label: 'Full Name', value: userData.fullName, field: 'fullName' },
          { label: 'Age', value: userData.age, field: 'age' },
          { label: 'Gender', value: userData.gender, field: 'gender' },
        ],
      },
      {
        id: 'campus',
        title: 'Campus',
        icon: 'book',
        items: [
          {
            label: 'University',
            value: userData.university,
            field: 'university',
          },
          {
            label: 'Distance from Campus',
            value: userData.distance,
            field: 'distance',
          },
        ],
      },
      {
        id: 'preferences',
        title: 'Preferences',
        icon: 'sliders',
        items: [
          {
            label: 'Primary Transport Mode',
            value: userData.transport,
            field: 'transport',
          },
        ],
      },
    ],
    [userData]
  )

  const quickActions = useMemo(
    () => [
      {
        id: 'log',
        label: 'Log Action',
        icon: 'plus-circle' as const,
        isPrimary: true,
        onPress: () => console.log('Log action'),
      },
      {
        id: 'history',
        label: 'History',
        icon: 'clock' as const,
        onPress: () => router.push('/(tabs)/personal-progress' as Href),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings' as const,
        onPress: () => router.push('/profile/settings' as Href),
      },
    ],
    [router]
  )

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          onBack={() => router.back()}
          onSettings={() => router.push('/profile/settings' as Href)}
          onEdit={() => handleEditField('fullName', userData.fullName)}
          onAvatarClick={() => openModal('imageUpload')}
          userName={userData.userName}
          university={userData.university}
          ecoLevel={userData.ecoLevel}
          ecoLevelInfo={userData.ecoLevelInfo}
          avatarUrl={userData.avatarUrl}
        />

        <ImpactCard
          stats={impactStats}
          onViewProgress={() =>
            router.push('/(tabs)/personal-progress' as Href)
          }
        />

        <QuickActions actions={quickActions} />

        <InfoList categories={infoCategories} onEditField={handleEditField} />

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Modals */}
      <EditModal
        isOpen={activeModal === 'editProfile'}
        onClose={closeModal}
        field={editField}
        currentValue={editValue}
        onSave={handleSaveEdit}
      />

      <ProfileImageUploadDialog
        isOpen={activeModal === 'imageUpload'}
        onClose={closeModal}
        onUpload={handleImageUpload}
        currentImage={userData.avatarUrl}
      />

      <DeleteAccountModal
        isOpen={activeModal === 'deleteAccount'}
        onClose={closeModal}
        onConfirm={handleDeleteAccount}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomPadding: {
    height: 100,
  },
})
