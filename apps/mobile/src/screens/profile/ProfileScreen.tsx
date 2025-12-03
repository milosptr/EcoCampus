import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'
import { useRouter, type Href } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { BackgroundPattern } from '@/src/shapes/BackgroundPattern'
import { Colors } from '@/src/constants/Colors'  
import { ProfileHeader } from './components/ProfileHeader'
import { ProfileImageUploadDialog } from './components/ProfileImageUploadDialog'
import { InfoList } from './components/InfoList'
import { ImpactCard } from './components/ImpactCard'
import { useMainStore } from '@/src/store/useMainStore'
import { View } from 'react-native'
import { EditModal } from './components/EditModal'
import { DeleteAccountModal } from './components/DeleteAccountModal'

export default function ProfileScreen() {

  const userProfile = useMainStore((state) => state.userProfile)
  const setUserProfile = useMainStore((state) => state.setUserProfile)
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editField, setEditField] = useState('')
  const [editValue, setEditValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)


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

    React.useEffect(() => {
      loadProfile()
    }, [])

    async function loadProfile() {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        console.warn("No user logged in")
        setLoading(false)
        return
      }

      setUserId(user.id)

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      const { data: settingsData } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setUserData({
          userName: profileData.user_name || '',
          university: profileData.university || '',
          ecoLevel: profileData.eco_level || 0,
          avatarUrl: profileData.avatar_url || '',
          fullName: profileData.full_name || '',
          age: profileData.age || '',
          gender: profileData.gender || '',
          distance: profileData.distance_from_campus || '',
          transport: profileData.transport_mode || ''
        })
      }

      if (settingsData) {
        setSettings({
          dailyReminders: settingsData.daily_reminders,
          weeklyReports: settingsData.weekly_reports,
          leaderboardUpdates: settingsData.leaderboard_updates,
          dataSharing: settingsData.data_sharing,
          analyticsTracking: settingsData.analytics_tracking
        })
      }

      setLoading(false)
    }


  const handleEditField = (field: string, value: string) => {
    setEditField(field)
    setEditValue(value)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = async (value: string) => {
    if (!userId) {
      console.warn("Not logged in — cannot save in Supabase.");
      return;
    }

    // Mapping von UI-Feld -> Supabase-Feld
    const fieldMap: Record<string, string> = {
      fullName: 'full_name',
      age: 'age',
      gender: 'gender',
      distance: 'distance_from_campus',
      transport: 'transport_mode',
    };

    const dbField = fieldMap[editField];

    if (!dbField) {
      console.warn("Unknown profile field:", editField);
      return;
    }

    const { error } = await supabase
      .from('user_profiles')
      .update({ [dbField]: value, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error("Supabase update error:", error);
      return;
    }

    // Sobald Supabase OK -> UI sofort updaten
    setUserData((prev) => ({ ...prev, [editField]: value }));

    setIsEditModalOpen(false);
  };


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
      
      {/* 🔹 Background Pattern – exactly like in WelcomeScreen */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
          zIndex: 0,
        }}
        pointerEvents="none"
      >
        <BackgroundPattern
          width="100%"
          height="100%"
          color={Colors.primary}
          preserveAspectRatio="xMidYMid slice"
        />
      </View>


      {/* 🔹 Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 0, 
        }}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <YStack
          {...({
            width: '100%',
            maxWidth: 600, 
            alignSelf: 'center',
            gap: '$4',
            minHeight: '100%',
            paddingBottom: 0
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
