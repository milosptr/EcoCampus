import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, XStack, YStack } from 'tamagui'

type LeaderboardEntry = {
  rank: number
  name: string
  points: number
}

const createMockLeaderboard = (): LeaderboardEntry[] => [
  { rank: 1, name: 'Jordan Example', points: 1200 },
  { rank: 2, name: 'Alex Rivera', points: 980 },
  { rank: 3, name: 'Sam Lee', points: 870 },
  { rank: 4, name: 'Taylor Kim', points: 760 },
  { rank: 5, name: 'Morgan Patel', points: 640 },
]

const leaderboardEntries = createMockLeaderboard()

export default function LeaderboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} background='$background' p='$4' space='$4'>
        <Text color='$color' fontSize='$8' fontWeight='700'>
          Leaderboard
        </Text>

        <Text color='$color' fontSize='$4'>
          See how Eco Campus students rank based on their eco actions.
        </Text>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 8 }}
        >
          <YStack space='$3'>
            {leaderboardEntries.map((entry) => {
              return (
                <Card
                  key={entry.rank}
                  p='$3'
                  br='$4'
                  background='$backgroundStrong'
                >
                  <XStack ai='center' jc='space-between'>
                    <XStack ai='center' space='$3'>
                      <Text fontSize='$6' fontWeight='700' color='$color'>
                        #{entry.rank}
                      </Text>

                      <YStack>
                        <Text fontSize='$5' fontWeight='600' color='$color'>
                          {entry.name}
                        </Text>
                        <Text fontSize='$3' color='$colorMuted'>
                          Eco points
                        </Text>
                      </YStack>
                    </XStack>

                    <Text fontSize='$6' fontWeight='700' color='$color'>
                      {entry.points}
                    </Text>
                  </XStack>
                </Card>
              )
            })}
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  )
}
