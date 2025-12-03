import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native'
import { MotiView } from 'moti'
import { Feather } from '@expo/vector-icons'
import { Card } from '@/src/components'
import { Colors } from '@/src/constants/Colors'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export interface InfoItem {
  label: string
  value: string
  field: string
}

export interface InfoCategory {
  id: string
  title: string
  icon: keyof typeof Feather.glyphMap
  items: InfoItem[]
}

interface InfoListProps {
  categories: InfoCategory[]
  onEditField: (field: string, value: string) => void
}

export function InfoList({ categories, onEditField }: InfoListProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  )

  const toggleCategory = (categoryId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  return (
    <MotiView
      from={{ translateX: -30, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 400, delay: 200 }}
    >
      <View style={styles.container}>
        {categories.map((category, categoryIndex) => {
          const isExpanded = expandedCategories.has(category.id)

          return (
            <MotiView
              key={category.id}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 300, delay: 200 + categoryIndex * 100 }}
            >
              <Card style={styles.categoryCard}>
                {/* Category Header */}
                <Pressable
                  onPress={() => toggleCategory(category.id)}
                  style={({ pressed }) => [
                    styles.categoryHeader,
                    pressed && styles.categoryHeaderPressed,
                  ]}
                >
                  <View style={styles.categoryTitleRow}>
                    <View style={styles.categoryIconContainer}>
                      <Feather name={category.icon} size={16} color={Colors.primary} />
                    </View>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                  </View>
                  <Feather
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={Colors.textSecondary}
                  />
                </Pressable>

                {/* Category Items */}
                {isExpanded && (
                  <View style={styles.itemsContainer}>
                    {category.items.map((item, index) => (
                      <Pressable
                        key={item.field}
                        onPress={() => onEditField(item.field, item.value)}
                        style={({ pressed }) => [
                          styles.itemRow,
                          pressed && styles.itemRowPressed,
                          index === category.items.length - 1 && styles.itemRowLast,
                        ]}
                      >
                        <View style={styles.itemContent}>
                          <Text style={styles.itemLabel}>{item.label}</Text>
                          <Text style={styles.itemValue}>{item.value}</Text>
                        </View>
                        <Feather name="edit-2" size={16} color={Colors.textSecondary} />
                      </Pressable>
                    ))}
                  </View>
                )}
              </Card>
            </MotiView>
          )
        })}
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  categoryCard: {
    padding: 0,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.white,
  },
  categoryHeaderPressed: {
    backgroundColor: Colors.backgroundMuted,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  itemRowPressed: {
    backgroundColor: Colors.backgroundMuted,
  },
  itemRowLast: {
    borderBottomWidth: 0,
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  itemValue: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
})
