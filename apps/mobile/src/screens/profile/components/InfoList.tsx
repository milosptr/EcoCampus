import { Feather } from "@expo/vector-icons";
import { YStack, XStack, Text } from "tamagui";
import { TouchableOpacity } from "react-native";

interface InfoItem {
  label: string;
  value: string;
  field: string;
}

interface InfoListProps {
  items: InfoItem[];
  onEditField: (field: string, value: string) => void;
}

export function InfoList({ items, onEditField }: InfoListProps) {
  return (
    <YStack
      {...({
        marginHorizontal: "$4",
        marginTop: "$6",
        backgroundColor: "white",
        borderRadius: "$8",
        padding: "$4",
        shadowColor: "$shadowColor",
        shadowOpacity: 0.05,
        shadowRadius: 10,
      } as any)}
    >
      <Text
        {...({
          fontSize: "$6",
          fontWeight: "600",
          color: "#5F7E68",
          paddingHorizontal: "$2",
          marginBottom: "$4",
        } as any)}
      >
        Personal Info
      </Text>

      <YStack {...({ gap: "$1" } as any)}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.field}
            onPress={() => onEditField(item.field, item.value)}
            style={{ width: '100%' }}
          >
            <XStack
              {...({
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: "$4",
                paddingVertical: "$4",
                borderRadius: "$6",
              } as any)}
            >
              <YStack {...({ alignItems: "flex-start" } as any)}>
                <Text {...({ fontSize: "$2", color: "#5F7E68", opacity: 0.6 } as any)}>
                  {item.label}
                </Text>
                <Text
                  {...({
                    fontSize: "$4",
                    color: "#5F7E68",
                    marginTop: "$1",
                  } as any)}
                >
                  {item.value}
                </Text>
              </YStack>

              <Feather name="chevron-right" size={20} color="#9DBFA8" />
            </XStack>
          </TouchableOpacity>
        ))}
      </YStack>
    </YStack>
  );
}
