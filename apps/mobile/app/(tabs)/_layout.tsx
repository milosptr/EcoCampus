import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} {...props} />
}

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected?.get(),
        tabBarInactiveTintColor: theme.tabIconDefault?.get(),
        headerShown: false,
        tabBarStyle: {
          marginBottom: -3,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='personal-progress/index'
        options={{
          title: 'Personal Progress',
          tabBarIcon: ({ color }) => <TabBarIcon name='leaf' color={color} />,
        }}
      />
      <Tabs.Screen
        name='leaderboard/index'
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='bar-chart' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile/index'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />

    </Tabs>
  )
}
