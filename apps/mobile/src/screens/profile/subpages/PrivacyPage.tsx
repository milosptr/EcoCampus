import { YStack, Text } from "tamagui";

export function PrivacyPage() {
  return (
    <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$6", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
      <Text {...({ fontSize: "$6", fontWeight: "600", color: "#5F7E68", marginBottom: "$4" } as any)}>Privacy Policy</Text>

      <YStack {...({ gap: "$4", color: "#5F7E68", opacity: 0.8 } as any)}>
        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>1. Information We Collect</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            We collect information you provide directly, including your name, email, university affiliation, and transportation data. We also collect usage data to improve our services.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>2. How We Use Your Information</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            Your data is used to calculate your environmental impact, provide personalized recommendations, and enable leaderboard features. We may share aggregated, anonymized data with your university for sustainability reporting.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>3. Data Sharing</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            We do not sell your personal data. Data sharing with your university can be controlled in Privacy Settings. We may share data with service providers who assist in operating our app.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>4. Data Security</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>5. Your Rights</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            You have the right to access, correct, or delete your personal data. You can exercise these rights through the app settings or by contacting our support team.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>6. Cookies and Tracking</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            We use analytics tools to understand how users interact with our app. You can control analytics tracking in Privacy Settings.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>7. Children's Privacy</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            Our service is intended for users 13 years and older. We do not knowingly collect data from children under 13.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ fontSize: "$5", fontWeight: "600", color: "#5F7E68", marginBottom: "$2" } as any)}>8. Policy Updates</Text>
          <Text {...({ color: "#5F7E68", opacity: 0.8 } as any)}>
            We may update this privacy policy from time to time. We will notify you of significant changes through the app.
          </Text>
        </YStack>

        <YStack>
          <Text {...({ marginTop: "$6", color: "#5F7E68", opacity: 0.6 } as any)}>
            Last updated: November 10, 2025
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
