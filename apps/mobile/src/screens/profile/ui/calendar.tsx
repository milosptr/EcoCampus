import * as React from "react";
import { YStack, XStack, Text, styled, Button } from "tamagui";
import { Feather } from "@expo/vector-icons";

// This is a simplified calendar component for React Native
// For a full-featured calendar, consider using @react-native-community/datetimepicker
// or a third-party library like react-native-calendars

const CalendarContainer = styled(YStack, {
  padding: "$3",
  backgroundColor: "$background",
  borderRadius: "$4",
} as any);

const CalendarHeader = styled(XStack, {
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$4",
} as any);

const CalendarNavButton = styled(Button, {
  width: 28,
  height: 28,
  padding: "$0",
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: "$borderColor",
  borderRadius: "$2",
  opacity: 0.5,
  pressStyle: {
    opacity: 1,
  },
} as any);

// Helper component for day buttons
function DayButton({
  isSelected,
  isToday,
  isDisabled,
  children,
  onPress,
}: {
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Button
      {...({
        width: 32,
        height: 32,
        padding: "$0",
        backgroundColor: isSelected ? "$blue9" : isToday ? "$gray4" : "transparent",
        color: isSelected ? "white" : undefined,
        borderRadius: "$2",
        opacity: isDisabled ? 0.3 : 1,
        onPress,
      } as any)}
    >
      {children}
    </Button>
  );
}

type CalendarProps = {
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  mode?: "single" | "multiple" | "range";
};

function Calendar({
  selected,
  onSelect,
  disabled,
  mode = "single",
  ...props
}: CalendarProps & React.ComponentProps<typeof CalendarContainer>) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected || new Date()
  );

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDayOfMonth).fill(null);

  days.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      day === selected.getDate() &&
      currentMonth.getMonth() === selected.getMonth() &&
      currentMonth.getFullYear() === selected.getFullYear()
    );
  };

  return (
    <CalendarContainer {...props}>
      <CalendarHeader>
        <CalendarNavButton onPress={goToPreviousMonth}>
          <Feather name="chevron-left" size={16} />
        </CalendarNavButton>
        <Text fontWeight="500">{monthName}</Text>
        <CalendarNavButton onPress={goToNextMonth}>
          <Feather name="chevron-right" size={16} />
        </CalendarNavButton>
      </CalendarHeader>

      <YStack gap="$2">
        {/* Day headers */}
        <XStack {...({ justifyContent: "space-around" } as any)}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text key={day} {...({ width: 32, textAlign: "center", fontSize: "$2", opacity: 0.7 } as any)}>
              {day.slice(0, 1)}
            </Text>
          ))}
        </XStack>

        {/* Calendar weeks */}
        {weeks.map((week, weekIndex) => (
          <XStack key={weekIndex} {...({ justifyContent: "space-around" } as any)}>
            {week.map((day, dayIndex) => (
              <YStack key={dayIndex} {...({ width: 32 } as any)}>
                {day !== null ? (
                  <DayButton
                    isSelected={isSelected(day)}
                    isToday={isToday(day)}
                    isDisabled={disabled?.(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                    onPress={() => {
                      const selectedDate = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      );
                      onSelect?.(selectedDate);
                    }}
                  >
                    <Text {...({ fontSize: "$2" } as any)}>{day}</Text>
                  </DayButton>
                ) : (
                  <YStack {...({ width: 32, height: 32 } as any)} />
                )}
              </YStack>
            ))}
          </XStack>
        ))}
      </YStack>
    </CalendarContainer>
  );
}

export { Calendar };
