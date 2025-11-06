import { Text, View } from '@/src/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PersonalProgressScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Personal Progress</Text>
        <Text>Welcome to your personal progress!</Text>
      </View>
    </SafeAreaView>
  )
}
