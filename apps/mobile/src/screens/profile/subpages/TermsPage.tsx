import { YStack, Text } from 'tamagui'

export function TermsPage() {
  return (
    <YStack
      {...({
        backgroundColor: 'white',
        borderRadius: '$8',
        padding: '$6',
        shadowColor: '$shadowColor',
        shadowOpacity: 0.05,
        shadowRadius: 10,
      } as any)}
    >
      <Text
        {...({
          fontSize: '$6',
          fontWeight: '600',
          color: '#5F7E68',
          marginBottom: '$4',
        } as any)}
      >
        Terms of Service
      </Text>

      <YStack {...({ gap: '$4', color: '#5F7E68', opacity: 0.8 } as any)}>
        <YStack>
          <Text
            {...({
              fontSize: '$5',
              fontWeight: '600',
              color: '#5F7E68',
              marginBottom: '$2',
            } as any)}
          >
            1. Acceptance of Terms
          </Text>
          <Text {...({ color: '#5F7E68', opacity: 0.8 } as any)}>
            By accessing and using EcoCampus, you accept and agree to be bound
            by the terms and provision of this agreement.
          </Text>
        </YStack>

        <YStack>
          <Text
            {...({
              fontSize: '$5',
              fontWeight: '600',
              color: '#5F7E68',
              marginBottom: '$2',
            } as any)}
          >
            2. Use License
          </Text>
          <Text {...({ color: '#5F7E68', opacity: 0.8 } as any)}>
            Permission is granted to use EcoCampus for personal, non-commercial
            tracking of your environmental impact and participation in campus
            sustainability initiatives.
          </Text>
        </YStack>

        <YStack>
          <Text
            {...({
              fontSize: '$5',
              fontWeight: '600',
              color: '#5F7E68',
              marginBottom: '$2',
            } as any)}
          >
            3. User Data
          </Text>
          <Text {...({ color: '#5F7E68', opacity: 0.8 } as any)}>
            You retain all rights to your personal data. We collect and process
            data as described in our Privacy Policy to provide and improve our
            services.
          </Text>
        </YStack>

        <YStack>
          <Text
            {...({
              fontSize: '$5',
              fontWeight: '600',
              color: '#5F7E68',
              marginBottom: '$2',
            } as any)}
          >
            4. Accuracy of Information
          </Text>
          <Text {...({ color: '#5F7E68', opacity: 0.8 } as any)}>
            While we strive to provide accurate CO₂ calculations and
            sustainability metrics, these are estimates and should be used as
            guidelines only.
          </Text>
        </YStack>

        <YStack>
          <Text
            {...({
              fontSize: '$5',
              fontWeight: '600',
              color: '#5F7E68',
              marginBottom: '$2',
            } as any)}
          >
            5. Account Termination
          </Text>
          <Text {...({ color: '#5F7E68', opacity: 0.8 } as any)}>
            You may terminate your account at any time through the app settings.
            Upon termination, your data will be permanently deleted.
          </Text>
        </YStack>

        <YStack>
          <Text
            {...({
              fontSize: '$5',
              fontWeight: '600',
              color: '#5F7E68',
              marginBottom: '$2',
            } as any)}
          >
            6. Changes to Terms
          </Text>
          <Text {...({ color: '#5F7E68', opacity: 0.8 } as any)}>
            We reserve the right to modify these terms at any time. Continued
            use of the app constitutes acceptance of modified terms.
          </Text>
        </YStack>

        <YStack>
          <Text
            {...({ marginTop: '$6', color: '#5F7E68', opacity: 0.6 } as any)}
          >
            Last updated: November 10, 2025
          </Text>
        </YStack>
      </YStack>
    </YStack>
  )
}
