import React from 'react'
import { XStack, YStack, Text } from 'tamagui'

interface CheckBoxPlaceholderProps {
  checked: boolean
  label?: string
}

export const CheckBoxPlaceholder: React.FC<CheckBoxPlaceholderProps> = ({
  checked,
  label,
}) => {
  return (
    <XStack style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <YStack
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          backgroundColor: checked ? 'green' : 'lightgray',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {checked && <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>}
      </YStack>
      <Text>{label}</Text>
    </XStack>
  )
}
