import { YStack, Text, Avatar, XStack, ScrollView, Separator, Accordion, Paragraph, Checkbox } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Badge } from './components/Badge'
import { AchievementItem } from './components/AchievementItem'
import { Challenge } from './components/Challenge'
import { CheckBoxPlaceholder } from './components/CheckBoxPlaceholder'


const achievements = [
  {
    id: 'a1',
    title: 'Eco-Beginner',
    description: 'Completed your first eco-friendly action',
    unlocked: true,
  },
  {
    id: 'a2',
    title: 'Eco-Learner',
    description: 'Earned 50 points in your progress',
    unlocked: true,
  },
  {
    id: 'a3',
    title: 'Eco-Warrior',
    description: 'Earned 150 points in your progress',
    unlocked: false,
  },
]

export default function PersonalProgressScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView background='$background'>
        <YStack flex={1} background='$background' p='$4' space='$4' style={{ alignContent: 'center' }}>
        <Text color='$color' fontSize='$8' fontWeight='700'>
          Personal Progress
        </Text>
        <Text color='$color' fontSize='$5'>
          Welcome to your personal progress!
        </Text>
        <XStack space='$3'>
          {/* //TODO: Replace with user avatar */}
          <Avatar circular size="$6">
          <Avatar.Image src="http://picsum.photos/200/300" />
          <Avatar.Fallback bg="red" />
          </Avatar>
        <YStack>
          {/* //TODO: Replace with dynamic user data(name, level, co2 saved) */}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            John Doe
          </Text>
          <XStack style={{ alignItems: 'center' }} space='$2'>
            <Text>Level: </Text>
            <Badge points={275} />
          </XStack>
          <Text>CO2 saved: 5.2kg</Text>
        </YStack>
        </XStack>
        <Separator style={{ backgroundColor: '#ccc', height: 2, marginVertical: 8 }} />
        {/* //TODO: Add charts or graphs to visualize progress */}
        <Text fontSize='$6' fontWeight='600'>
          Monthly progress:
        </Text>
        <Separator style={{ backgroundColor: '#ccc', height: 2, marginVertical: 8 }} />
        {/* //TODO: Action history -> show the actions that the user actually did*/}
        <Accordion type="multiple">
          <Accordion.Item value="a1">
            <Accordion.Trigger>
              {({ open }: { open: boolean }) => (
                <XStack
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Paragraph fontSize='$6' fontWeight='600'>Action History</Paragraph>

                  <Text
                    style={{
                      transform: [{ rotate: open ? '180deg' : '0deg' }],
                    }}
                  >
                    ▼
                  </Text>
                </XStack>
              )}
            </Accordion.Trigger>
            <Accordion.Content>
              {/* TODO: Consider whether it's better to fix the checkbox and use it, or stick with this fix */}
              <YStack space="$2">
                <CheckBoxPlaceholder checked={true} label="Sample action done" />
                <CheckBoxPlaceholder checked={false} label="Another action" />
              </YStack>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
        <Separator style={{ backgroundColor: '#ccc', height: 2, marginVertical: 8 }} />
        {/* //TODO: Achievements section -> check the data of the user and display achievements accordingly */}
        <Accordion type="multiple">
          <Accordion.Item value="a1">
            <Accordion.Trigger>
              {({ open }: { open: boolean }) => (
                <XStack
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Paragraph fontSize='$6' fontWeight='600'>Achievements</Paragraph>

                  <Text
                    style={{
                      transform: [{ rotate: open ? '180deg' : '0deg' }],
                    }}
                  >
                    ▼
                  </Text>
                </XStack>
              )}
            </Accordion.Trigger>
            <Accordion.Content>
              <YStack space="$2" mt="$2">
                {achievements.map((ach) => (
                  <AchievementItem
                    key={ach.id}
                    title={ach.title}
                    description={ach.description}
                    unlocked={ach.unlocked}
                  />
                ))}
              </YStack>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
        <Separator style={{ backgroundColor: '#ccc', height: 2, marginVertical: 8 }} />
        <Challenge />
      </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
