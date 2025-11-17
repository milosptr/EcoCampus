import React from 'react'
import { XStack, YStack, Text } from 'tamagui'
import { CheckBoxPlaceholder } from './CheckBoxPlaceholder'

interface AchievementItemProps {
  title: string
  description?: string
  unlocked: boolean
}

export const AchievementItem: React.FC<AchievementItemProps> = ({
  title,
  description,
  unlocked,
}) => {
  return (
    <XStack style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <CheckBoxPlaceholder checked={unlocked}/>
      <YStack style={{ gap: 2 }}>
        <Text fontWeight="500">{title}</Text>
        {description && <Text style={{ fontSize: 12, color: 'gray' }}>{description}</Text>}
      </YStack>
    </XStack>
  )
}
