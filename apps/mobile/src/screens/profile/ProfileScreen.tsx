// 📄 screens/profile/ProfileScreen.tsx

import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'
import { useRouter, type Href } from 'expo-router'

// 🔹 Diese Komponenten kommen aus deinem components-Ordner:
import { ProfileHeader } from './components/ProfileHeader'
import { ProfileImageUploadDialog } from './components/ProfileImageUploadDialog'
import { InfoList } from './components/InfoList'
import { SettingsList } from './components/SettingsList'
import { ImpactCard } from './components/ImpactCard'
import { useMainStore } from '@/src/store/useMainStore'

// Falls du Modals brauchst (z. B. beim Button-Klick im ProfileHeader):
import { EditModal } from './components/EditModal'
import { DeleteAccountModal } from './components/DeleteAccountModal'

export default function ProfileScreen() {
  const userProfile = useMainStore((state) => state.userProfile)
  const setUserProfile = useMainStore((state) => state.setUserProfile)
  // State for modals and user data
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editField, setEditField] = useState('')
  const [editValue, setEditValue] = useState('')

  const [userData, setUserData] = useState({
    userName: userProfile?.name ?? 'EcoCampus User',
    university: 'TU Munich',
    ecoLevel: 5,
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    fullName: userProfile?.name ?? 'EcoCampus User',
    age: '22',
    gender: 'Female',
    distance: '5 km',
    transport: 'Bike',
  })

  const [settings, setSettings] = useState({
    dailyReminders: true,
    weeklyReports: true,
    leaderboardUpdates: false,
    dataSharing: true,
    analyticsTracking: false,
  })

  const handleEditField = (field: string, value: string) => {
    setEditField(field)
    setEditValue(value)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (value: string) => {
    let updated = { ...userData }

    if (editField === 'fullName') {
      // Keep header name and full name in sync
      updated = { ...updated, fullName: value, userName: value }
    } else if (editField === 'userName') {
      // Editing the header name should also reflect in full name
      updated = { ...updated, userName: value, fullName: value }
    } else {
      updated = { ...updated, [editField]: value }
    }

    setUserData(updated)

    if (editField === 'fullName' || editField === 'userName') {
      setUserProfile(
        userProfile
          ? { ...userProfile, name: value }
          : {
              id: 'local-profile',
              authId: 'local-profile',
              email: 'guest@ecocampus.app',
              name: value,
              avatarUrl: null,
              onboardingCompleted: true,
            }
      )
    }

    setIsEditModalOpen(false)
  }

  const handleImageUpload = (imageUrl: string) => {
    setUserData({ ...userData, avatarUrl: imageUrl })
  }

  const handleToggleSetting = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value })
  }

  const router = useRouter()

  const handleNavigate = (screen: string) => {
    router.push(screen as Href)
  }

  const handleDeleteAccount = () => {
    console.log('Account deleted')
    setIsDeleteModalOpen(false)
  }

  const infoItems = [
    { label: 'Full Name', value: userData.fullName, field: 'fullName' },
    { label: 'Age', value: userData.age, field: 'age' },
    { label: 'Gender', value: userData.gender, field: 'gender' },
    {
      label: 'Distance from Campus',
      value: userData.distance,
      field: 'distance',
    },
    {
      label: 'Primary Transport Mode',
      value: userData.transport,
      field: 'transport',
    },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F9F2' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          paddingVertical: 24,
          paddingHorizontal: 16,
          minHeight: '100%',
        }}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={true}
      >
        <YStack
          {...({
            width: '100%',
            maxWidth: 600, // verhindert zu breite Darstellung auf Tablets
            alignSelf: 'center',
            gap: '$4',
            minHeight: '100%',
          } as any)}
        >
          {/* 🔹 Profilkopf mit Bild, Name, evtl. Bearbeiten-Button */}
          <ProfileHeader
            onBack={() => console.log('Back')}
            onSettings={() => router.push('/profile/settings' as const)}
            onEdit={() => handleEditField('fullName', userData.fullName)}
            onAvatarClick={() => setIsImageUploadOpen(true)}
            userName={userData.userName}
            university={userData.university}
            ecoLevel={userData.ecoLevel}
            avatarUrl={userData.avatarUrl}
          />

          {/* 🔹 Übersicht mit allgemeinen Infos (z. B. Name, E-Mail, etc.) */}
          <InfoList items={infoItems} onEditField={handleEditField} />

          {/* 🔹 Kleine Zusammenfassung, z. B. Punkte, Fortschritt */}
          <ImpactCard
            co2Saved='42 kg'
            actionsLogged='156'
            leaderboardRank='#12 in TU Munich'
            progressValue={75}
            onViewProgress={() =>
              router.push('/(tabs)/personal-progress' as const)
            }
          />

          {/* 🔹 Modals (werden nur angezeigt, wenn aktiv) */}
          <ProfileImageUploadDialog
            isOpen={isImageUploadOpen}
            onClose={() => setIsImageUploadOpen(false)}
            onUpload={handleImageUpload}
            currentImage={userData.avatarUrl}
          />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            field={editField}
            currentValue={editValue}
            onSave={handleSaveEdit}
          />

          <DeleteAccountModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteAccount}
          />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
