import { YStack, Text } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} background='$background' p='$4' space='$4'>
        <Text color='$color' fontSize='$8' fontWeight='700'>
          Dashboard
        </Text>
        <Text color='$color' fontSize='$5'>
          Welcome to the dashboard!
        </Text>
      </YStack>
    </SafeAreaView>
  )
}
