import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import Svg, { Circle } from 'react-native-svg'
import { Colors } from '@/src/constants/Colors'
import type { EcoLevelInfo } from '@/src/hooks/useProfile'

interface ProfileHeaderProps {
  onBack: () => void
  onSettings: () => void
  onEdit: () => void
  onAvatarClick: () => void
  userName: string
  university: string
  ecoLevel: number
  ecoLevelInfo: EcoLevelInfo
  avatarUrl?: string
}

const AVATAR_SIZE = 100
const RING_SIZE = AVATAR_SIZE + 16
const RING_STROKE = 4

export function ProfileHeader({
  onBack,
  onSettings,
  onEdit,
  onAvatarClick,
  userName,
  university,
  ecoLevelInfo,
  avatarUrl,
}: ProfileHeaderProps) {
  const ringRadius = (RING_SIZE - RING_STROKE) / 2
  const ringCircumference = 2 * Math.PI * ringRadius

  return (
    <MotiView
      from={{ translateY: -20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <View style={styles.container}>
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.navButton,
              pressed && styles.navButtonPressed,
            ]}
          >
            <Feather name='chevron-left' size={20} color={Colors.primary} />
          </Pressable>

          <Text style={styles.navTitle}>Profile</Text>

          <Pressable
            onPress={onSettings}
            style={({ pressed }) => [
              styles.navButton,
              pressed && styles.navButtonPressed,
            ]}
          >
            <Feather name='settings' size={20} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Pressable
            onPress={onEdit}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.editButtonPressed,
            ]}
          >
            <Feather name='edit' size={16} color={Colors.primary} />
          </Pressable>

          <View style={styles.profileContent}>
            <Pressable onPress={onAvatarClick}>
              <View style={styles.avatarWrapper}>
                {/* Eco-Level Ring */}
                <View style={styles.ringContainer}>
                  <Svg width={RING_SIZE} height={RING_SIZE}>
                    {/* Background ring */}
                    <Circle
                      cx={RING_SIZE / 2}
                      cy={RING_SIZE / 2}
                      r={ringRadius}
                      stroke={Colors.border}
                      strokeWidth={RING_STROKE}
                      fill='transparent'
                    />
                    {/* Colored level ring */}
                    <Circle
                      cx={RING_SIZE / 2}
                      cy={RING_SIZE / 2}
                      r={ringRadius}
                      stroke={ecoLevelInfo.color}
                      strokeWidth={RING_STROKE}
                      fill='transparent'
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={ringCircumference * 0.15}
                      strokeLinecap='round'
                      rotation={-90}
                      origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
                    />
                  </Svg>
                </View>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                  <Image
                    source={{
                      uri:
                        avatarUrl ||
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                    }}
                    style={styles.avatar}
                  />
                </View>
                {/* Level Badge on Ring */}
                <View
                  style={[
                    styles.levelBadgeOnRing,
                    { backgroundColor: ecoLevelInfo.color },
                  ]}
                >
                  <Text style={styles.levelBadgeText}>
                    {ecoLevelInfo.level}
                  </Text>
                </View>
              </View>
            </Pressable>

            <Text style={styles.userName}>{userName}</Text>

            <View style={styles.universityRow}>
              <Feather name='book' size={14} color={Colors.textSecondary} />
              <Text style={styles.university}>{university}</Text>
            </View>

            <View
              style={[
                styles.ecoLevelBadge,
                { backgroundColor: ecoLevelInfo.color + '20' },
              ]}
            >
              <Text
                style={[styles.ecoLevelText, { color: ecoLevelInfo.color }]}
              >
                {ecoLevelInfo.title}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryLight,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 24,
    paddingTop: 24,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 40,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  profileCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editButtonPressed: {
    opacity: 0.8,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatarWrapper: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContainer: {
    position: 'absolute',
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  levelBadgeOnRing: {
    position: 'absolute',
    bottom: 0,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 16,
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  university: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  ecoLevelBadge: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ecoLevelText: {
    fontSize: 14,
    fontWeight: '600',
  },
})
