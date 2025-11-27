import React, { useMemo } from 'react'
import { View } from 'react-native'
import { YStack, Text, Paragraph, XStack } from 'tamagui'

interface ChallengeProps {}

// TODO: Use real actions or consider to leave this out
const greenChallenges = [
  'Take a cold shower today',
  'Use public transport instead of driving',
  'Recycle at least 3 items',
  'Eat a plant-based meal',
  'Turn off unused electronics',
]

export const Challenge: React.FC<ChallengeProps> = () => {
  const challengeOfTheDay = useMemo(() => {
    const index = Math.floor(Math.random() * greenChallenges.length)
    return greenChallenges[index]
  }, [])

  return (
    <YStack style={{ padding: 12, borderRadius: 8 }}>
      <Text fontWeight='600' fontSize={16}>
        Challenge of the day:
      </Text>
      <XStack
        borderColor='$borderColor'
        style={{
          marginTop: 16,
          padding: 12,
          borderWidth: 1,
          backgroundColor: '#F3F7EC',
          borderRadius: 8,
        }}
      >
        <Paragraph fontSize='$6' fontWeight='600'>
          {challengeOfTheDay}
        </Paragraph>
      </XStack>
    </YStack>
  )
}
