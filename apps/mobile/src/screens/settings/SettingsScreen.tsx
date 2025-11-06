import { Text, View } from '@/src/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SettingsScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Settings</Text>
        <Text>Welcome to the settings!</Text>
      </View>
    </SafeAreaView>
  )
}
