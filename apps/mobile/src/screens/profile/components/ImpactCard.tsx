import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text, Button } from "tamagui";

interface ImpactCardProps {
  co2Saved: string;
  actionsLogged: string;
  leaderboardRank: string;
  progressValue: number;
  onViewProgress: () => void;
}

export function ImpactCard({
  co2Saved,
  actionsLogged,
  leaderboardRank,
  progressValue,
  onViewProgress,
}: ImpactCardProps) {
  return (
    <YStack
      {...({
        marginHorizontal: "$4",
        marginTop: "$6",
        backgroundColor: "white",
        borderRadius: "$8",
        padding: "$6",
        shadowColor: "$shadowColor",
        shadowOpacity: 0.05,
        shadowRadius: 10,
      } as any)}
    >
      <Text
        {...({
          fontSize: "$7",
          fontWeight: "600",
          color: "#5F7E68",
          marginBottom: "$4",
        } as any)}
      >
        Your Impact
      </Text>

      <YStack {...({ gap: "$4" } as any)}>
        {/* Stats Grid */}
        <XStack {...({ gap: "$4" } as any)}>
          <YStack
            {...({
              flex: 1,
              borderRadius: "$6",
              padding: "$4",
              backgroundColor: "#F6F9F2",
            } as any)}
          >
            <Feather name="feather" size={20} color="#5F7E68" style={{ marginBottom: 8 }} />
            <Text {...({ fontSize: "$3", color: "#5F7E68", opacity: 0.7 } as any)}>CO₂ Saved</Text>
            <Text
              {...({
                fontSize: "$7",
                fontWeight: "600",
                color: "#5F7E68",
                marginTop: "$1",
              } as any)}
            >
              {co2Saved}
            </Text>
          </YStack>

          <YStack
            {...({
              flex: 1,
              borderRadius: "$6",
              padding: "$4",
              backgroundColor: "#F6F9F2",
            } as any)}
          >
            <Feather name="trending-up" size={20} color="#5F7E68" style={{ marginBottom: 8 }} />
            <Text {...({ fontSize: "$3", color: "#5F7E68", opacity: 0.7 } as any)}>Actions</Text>
            <Text
              {...({
                fontSize: "$7",
                fontWeight: "600",
                color: "#5F7E68",
                marginTop: "$1",
              } as any)}
            >
              {actionsLogged}
            </Text>
          </YStack>
        </XStack>

        {/* Leaderboard Rank */}
        <YStack
          {...({
            borderRadius: "$6",
            padding: "$4",
            backgroundColor: "#F6F9F2",
          } as any)}
        >
          <XStack
            {...({
              alignItems: "center",
              gap: "$2",
              marginBottom: "$2",
            } as any)}
          >
            <Feather name="award" size={20} color="#5F7E68" />
            <Text {...({ fontSize: "$3", color: "#5F7E68", opacity: 0.7 } as any)}>
              Leaderboard Rank
            </Text>
          </XStack>
          <Text {...({ fontSize: "$6", fontWeight: "600", color: "#5F7E68" } as any)}>
            {leaderboardRank}
          </Text>
        </YStack>

        {/* Progress Bar */}
        <YStack>
          <XStack
            {...({
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "$2",
            } as any)}
          >
            <Text {...({ fontSize: "$2", color: "#5F7E68", opacity: 0.7 } as any)}>Weekly Goal</Text>
            <Text {...({ fontSize: "$2", color: "#5F7E68" } as any)}>{progressValue}%</Text>
          </XStack>
          <YStack
            {...({
              height: 8,
              width: "100%",
              borderRadius: "$10",
              backgroundColor: "#F6F9F2",
              overflow: "hidden",
            } as any)}
          >
            <YStack
              {...({
                height: "100%",
                width: `${progressValue}%`,
                borderRadius: "$10",
                backgroundColor: "#E8F89C",
              } as any)}
            />
          </YStack>
        </YStack>

        {/* CTA Button */}
        <Button
          onPress={onViewProgress}
          {...({
            borderRadius: "$6",
            height: 48,
            backgroundColor: "#5F7E68",
            color: "white",
            pressStyle: { opacity: 0.8 },
          } as any)}
        >
          View Detailed Progress
        </Button>
      </YStack>
    </YStack>
  );
}
