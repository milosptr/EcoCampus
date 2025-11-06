import { Text, View } from '@/src/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LeaderboardScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Leaderboard</Text>
        <Text>Welcome to the leaderboard!</Text>
      </View>
    </SafeAreaView>
  )
}
