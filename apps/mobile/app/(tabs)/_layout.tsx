import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { Colors } from '@/src/constants/Colors'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
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
        name='settings/index'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name='cog' color={color} />,
        }}
      />
    </Tabs>
  )
}
