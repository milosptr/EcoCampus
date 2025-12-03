import React, { useState } from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { YStack, XStack, Text, Button, ScrollView } from 'tamagui'
import { useRouter } from 'expo-router'

import { SettingsList } from './components/SettingsList'
import { signOut } from '@/src/lib/signOut'

import { EditEmailPage } from './subpages/EditEmailPage'
import { FAQPage } from './subpages/FAQPage'
import { LanguagePage } from './subpages/LanguagePage'
import { UnitsPage } from './subpages/UnitsPage'
import { ContactSupportPage } from './subpages/ContactSupportPage'
import { supabase } from '@/src/lib/supabase'

export default function SettingsScreen() {
  const router = useRouter()


  const [showEditEmail, setShowEditEmail] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [showUnits, setShowUnits] = useState(false)
  const [showLanguage, setShowLanguage] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)

  
  const [settings, setSettings] = useState({
    dailyReminders: true,
    weeklyReports: false,
    leaderboardUpdates: true,
    dataSharing: false,
    analyticsTracking: true,
  })

  const [unitSystem, setUnitSystem] = useState('Metric (km)')
  const [language, setLanguage] = useState('English')

  const handleToggle = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'edit-email':
        setShowEditEmail(true)
        break
      case 'support':
        setShowSupport(true)
        break
      case 'units':
        setShowUnits(true)
        break
      case 'language':
        setShowLanguage(true)
        break
      case 'faq':
        setShowFAQ(true)
        break
      default:
        console.warn('Unknown settings target:', screen)
    }
  }

  const handleSignOut = () => signOut()

  const handleDeleteAccount = () => {
    console.log('Account deleted')
    router.back()
  }

  const handleBack = () => router.back()

  const ModalWrapper = ({
    visible,
    title,
    onClose,
    children,
  }: {
    visible: boolean
    title: string
    onClose: () => void
    children: React.ReactNode
  }) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <YStack
        {...{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <YStack
          {...{
            width: '90%',
            maxHeight: '80%',
            backgroundColor: 'white',
            borderRadius: '$6',
            padding: '$4',
          }}
        >
          {/* Header */}
          <XStack
            {...{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '$3',
            }}
          >
            <Text
              {...{
                fontSize: '$6',
                fontWeight: '600',
                color: '#5F7E68',
              }}
            >
              {title}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={22} color="#5F7E68" />
            </TouchableOpacity>
          </XStack>

          {/* Content */}
          <ScrollView>{children}</ScrollView>
        </YStack>
      </YStack>
    </Modal>
  )

  return (
    <YStack {...{ flex: 1, backgroundColor: '#F6F9F2' }}>
      {/* -------- Header -------- */}
      <YStack
        {...{
          backgroundColor: 'white',
          shadowColor: '$shadowColor',
          shadowOpacity: 0.05,
          shadowRadius: 10,
        }}
      >
        <XStack
          {...{
            alignItems: 'center',
            paddingHorizontal: '$4',
            paddingVertical: '$4',
            paddingTop: '$10',
          }}
        >
          <Button
            circular
            size="$4"
            onPress={handleBack}
            {...{
              backgroundColor: 'transparent',
              pressStyle: { opacity: 0.8 },
            }}
          >
            <Feather name="chevron-left" size={20} color="#5F7E68" />
          </Button>

          <Text
            {...{
              flex: 1,
              textAlign: 'center',
              fontSize: '$7',
              fontWeight: '600',
              color: '#5F7E68',
            }}
          >
            Settings
          </Text>

          <YStack {...{ width: 40 }} />
        </XStack>
      </YStack>

      {/* -------- Modals (Subpages) -------- */}

      <ModalWrapper
        visible={showEditEmail}
        title="Edit Email"
        onClose={() => setShowEditEmail(false)}
      >
        <EditEmailPage
          currentEmail={''}
          onSave={async (newEmail: string) => {
            try {
              const { error } = await supabase.auth.updateUser({ email: newEmail })

              if (error) {
                console.error("Error updating email:", error)
                return
              }

              // Popup schließen
              setShowEditEmail(false)

              // Optional: Erfolgsmeldung
              console.log("Email updated successfully:", newEmail)

            } catch (err) {
              console.error("Unexpected error updating email:", err)
            }
          }}
        />
      </ModalWrapper>

      <ModalWrapper visible={showSupport} title="Contact Support" onClose={() => setShowSupport(false)}>
        <ContactSupportPage />
      </ModalWrapper>

      <ModalWrapper visible={showUnits} title="Units" onClose={() => setShowUnits(false)}>
        <UnitsPage currentUnit={''} onSelect={function (unit: string): void {
          throw new Error('Function not implemented.')
        } } />
      </ModalWrapper>

      <ModalWrapper visible={showLanguage} title="Language" onClose={() => setShowLanguage(false)}>
        <LanguagePage currentLanguage={''} onSelect={function (language: string): void {
          throw new Error('Function not implemented.')
        } } />
      </ModalWrapper>

      <ModalWrapper visible={showFAQ} title="FAQ" onClose={() => setShowFAQ(false)}>
        <FAQPage />
      </ModalWrapper>

      {/* -------- Settings Content -------- */}

      <ScrollView>
        <SettingsList
          settings={settings}
          unitSystem={unitSystem}
          language={language}
          onToggle={handleToggle}
          onNavigate={handleNavigate}
        />

        {/* Footer Actions */}
        <YStack
          {...{
            marginHorizontal: '$4',
            marginBottom: '$8',
            gap: '$3',
          }}
        >
          <Button
            onPress={handleSignOut}
            {...{
              borderRadius: '$6',
              height: 48,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#EA715B',
              pressStyle: { opacity: 0.8 },
            }}
          >
            <Text
              {...{
                color: '#EA715B',
                fontSize: '$4',
                fontWeight: '600',
              }}
            >
              Sign Out
            </Text>
          </Button>

          <TouchableOpacity onPress={handleDeleteAccount}>
            <YStack
              {...{
                width: '100%',
                alignItems: 'center',
                paddingVertical: '$2',
              }}
            >
              <Text
                {...{
                  fontSize: '$2',
                  color: '#EA715B',
                }}
              >
                Delete Account
              </Text>
            </YStack>
          </TouchableOpacity>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
