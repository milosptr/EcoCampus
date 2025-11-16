import { YStack, Text, Avatar, XStack, ScrollView, Separator } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Badge } from './components/Badge'

export default function PersonalProgressScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView background='$background'>
        <YStack flex={1} background='$background' p='$4' space='$4' style={{ alignContent: 'center' }}>
        <Text color='$color' fontSize='$8' fontWeight='700'>
          Personal Progress
        </Text>
        <Text color='$color' fontSize='$5'>
          Welcome to your personal progress!
        </Text>
        <XStack space='$3'>
          <Avatar circular size="$6">
          <Avatar.Image src="http://picsum.photos/200/300" />
          <Avatar.Fallback bg="red" />
          </Avatar>
        <YStack>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            John Doe
          </Text>
          <XStack style={{ alignItems: 'center' }} space='$2'>
            <Text>Level: </Text>
            <Badge points={275} />
          </XStack>
          <Text>CO2 saved: 5.2kg</Text>
        </YStack>
        </XStack>
        <Separator style={{ backgroundColor: '#ccc', height: 2, marginVertical: 8 }} />
        <Text fontSize='$6' fontWeight='600'>
          Monthly progress:
        </Text>
      </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
