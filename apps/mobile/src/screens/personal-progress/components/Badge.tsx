import React from 'react';
import { XStack, YStack, Text } from 'tamagui';

interface BadgeProps {
  points: number;
}

const levels = [
  { title: 'Eco-Beginner', minPoints: 0, color: '#9E9E9E' },
  { title: 'Eco-Learner', minPoints: 50, color: '#4CAF50' },
  { title: 'Eco-Warrior', minPoints: 150, color: '#2E7D32' },
  { title: 'Eco-Hero', minPoints: 300, color: '#1B5E20' },
  { title: 'Eco-Legend', minPoints: 500, color: '#FFD700' },
];

export const Badge: React.FC<BadgeProps> = ({ points }) => {
  const level = [...levels].reverse().find(l => points >= l.minPoints) || levels[0];

  return (
    <XStack
      style={{
        padding: 8,
        borderRadius: 6,
        backgroundColor: level.color,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <YStack style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>
          {level.title}
        </Text>
        <Text style={{ fontSize: 12, color: '#fff', opacity: 0.8 }}>
          {points} pts
        </Text>
      </YStack>
    </XStack>
  );
};