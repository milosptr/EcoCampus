import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Colors } from '@/src/constants/Colors'
import { ModalWrapper } from '@/src/components'
import { useSettings } from '@/src/hooks/useSettings'
import { useModalManager } from '@/src/hooks/useModalManager'
import { SettingsList } from './components/SettingsList'
import { signOut } from '@/src/lib/signOut'
import { useMainStore } from '@/src/store/useMainStore'
import { EditEmailPage } from './subpages/EditEmailPage'
import { FAQPage } from './subpages/FAQPage'
import { LanguagePage } from './subpages/LanguagePage'
import { UnitsPage } from './subpages/UnitsPage'
import { ContactSupportPage } from './subpages/ContactSupportPage'
import { TermsPage } from './subpages/TermsPage'
import { PrivacyPage } from './subpages/PrivacyPage'

export default function SettingsScreen() {
  const router = useRouter()
  const {
    settings,
    toggleSetting,
    unitSystem,
    setUnitSystem,
    language,
    setLanguage,
  } = useSettings()
  const { activeModal, openModal, closeModal } = useModalManager()
  const userProfile = useMainStore((state) => state.userProfile)
  const currentEmail = userProfile?.email || ''

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'edit-email':
        openModal('editEmail')
        break
      case 'support':
        openModal('support')
        break
      case 'units':
        openModal('units')
        break
      case 'language':
        openModal('language')
        break
      case 'faq':
        openModal('faq')
        break
      case 'terms':
        openModal('terms')
        break
      case 'privacy':
        openModal('privacy')
        break
      default:
        console.warn('Unknown settings target:', screen)
    }
  }

  const handleToggle = (key: string, _value: boolean) => {
    toggleSetting(key as keyof typeof settings)
  }

  const handleSignOut = () => signOut()

  const handleDeleteAccount = () => {
    console.log('Account deleted')
    router.back()
  }

  const handleBack = () => router.back()

  return (
    <View style={styles.container}>
      {/* Header */}
      <MotiView
        from={{ translateY: -20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Feather name='chevron-left' size={20} color={Colors.primary} />
          </Pressable>

          <Text style={styles.headerTitle}>Settings</Text>

          <View style={styles.headerSpacer} />
        </View>
      </MotiView>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SettingsList
          settings={settings}
          unitSystem={unitSystem}
          language={language}
          onToggle={handleToggle}
          onNavigate={handleNavigate}
        />

        {/* Footer Actions */}
        <MotiView
          from={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 700 }}
          style={styles.footerActions}
        >
          <Pressable
            onPress={handleSignOut}
            style={({ pressed }) => [
              styles.signOutButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </Pressable>

          <Pressable onPress={handleDeleteAccount}>
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </Pressable>
        </MotiView>
      </ScrollView>

      {/* Modals */}
      <ModalWrapper
        visible={activeModal === 'editEmail'}
        title='Edit Email'
        onClose={closeModal}
      >
        <EditEmailPage
          currentEmail={currentEmail}
          onSave={(email) => {
            console.log('Email saved:', email)
            closeModal()
          }}
        />
      </ModalWrapper>

      <ModalWrapper
        visible={activeModal === 'support'}
        title='Contact Support'
        onClose={closeModal}
      >
        <ContactSupportPage />
      </ModalWrapper>

      <ModalWrapper
        visible={activeModal === 'units'}
        title='Units'
        onClose={closeModal}
      >
        <UnitsPage
          currentUnit={unitSystem}
          onSelect={(unit) => {
            setUnitSystem(unit)
            closeModal()
          }}
        />
      </ModalWrapper>

      <ModalWrapper
        visible={activeModal === 'language'}
        title='Language'
        onClose={closeModal}
      >
        <LanguagePage
          currentLanguage={language}
          onSelect={(lang) => {
            setLanguage(lang)
            closeModal()
          }}
        />
      </ModalWrapper>

      <ModalWrapper
        visible={activeModal === 'faq'}
        title='FAQ'
        onClose={closeModal}
      >
        <FAQPage />
      </ModalWrapper>

      <ModalWrapper
        visible={activeModal === 'terms'}
        title='Terms of Service'
        onClose={closeModal}
      >
        <TermsPage />
      </ModalWrapper>

      <ModalWrapper
        visible={activeModal === 'privacy'}
        title='Privacy Policy'
        onClose={closeModal}
      >
        <PrivacyPage />
      </ModalWrapper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  footerActions: {
    marginHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  signOutButton: {
    borderRadius: 12,
    height: 48,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  signOutButtonText: {
    color: Colors.error,
    fontSize: 15,
    fontWeight: '600',
  },
  deleteAccountText: {
    fontSize: 13,
    color: Colors.error,
    textAlign: 'center',
    paddingVertical: 8,
  },
})
