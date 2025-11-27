import { YStack, Text } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable } from 'react-native'
import { signOut } from '@/src/lib/signOut'

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} background='$background' p='$4' space='$4'>
        <Text color='$color' fontSize='$8' fontWeight='700'>
          Settings
        </Text>
        <Text color='$color' fontSize='$5'>
          Welcome to the settings!
        </Text>
        <Pressable onPress={signOut}>
          <Text color='$color' fontSize='$5'>
            Sign Out
          </Text>
        </Pressable>
      </YStack>
    </SafeAreaView>
  )
}
