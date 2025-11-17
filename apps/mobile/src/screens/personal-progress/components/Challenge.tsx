import React, { useMemo } from 'react'
import { YStack, Text } from 'tamagui'

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
      <Text fontWeight="600" fontSize={16}>
        Challenge of the day:
      </Text>
      <Text fontSize={14} style={{ marginTop: 4 }}>
        {challengeOfTheDay}
      </Text>
    </YStack>
  )
}