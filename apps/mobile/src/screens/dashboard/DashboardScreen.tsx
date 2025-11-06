import { Text, View } from '@/src/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DashboardScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Dashboard</Text>
        <Text>Welcome to the dashboard!</Text>
      </View>
    </SafeAreaView>
  )
}
