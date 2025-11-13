import React from 'react'
import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Feather } from '@expo/vector-icons'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name']
  color: string
  size?: number
}) {
  const { size = 24, ...rest } = props
  return <Feather size={size} {...rest} />
}

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabIconSelected?.get(),
        tabBarInactiveTintColor: theme.tabIconDefault?.get(),
        tabBarStyle: { marginBottom: -3 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="personal-progress/index"
        options={{
          title: 'Personal Progress',
          tabBarIcon: ({ color }) => <TabBarIcon name="feather" color={color} />,
        }}
      />

      <Tabs.Screen
        name="leaderboard/index"
        options={{
          title: 'Leaderboard',
          // Feather hat "bar-chart-2" (nicht "bar-chart")
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart-2" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
