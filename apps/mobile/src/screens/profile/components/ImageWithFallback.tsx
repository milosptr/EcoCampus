import React, { useState } from 'react'
import { Image, ImageProps, View } from 'react-native'
import { YStack } from 'tamagui'
import { Feather } from '@expo/vector-icons'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends Omit<ImageProps, 'source'> {
  src?: string;
  alt?: string;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, ...rest } = props

  return didError ? (
    <YStack
      {...({
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      } as any)}
      style={style}
    >
      <Feather name="image" size={40} color="#9CA3AF" />
    </YStack>
  ) : (
    <Image
      source={{ uri: src }}
      style={style}
      {...rest}
      onError={handleError}
      accessibilityLabel={alt}
    />
  )
}
