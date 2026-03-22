import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import type { RecipeRecommendation } from '../services/api'

interface RecipeCardProps {
  recipe: RecipeRecommendation
  onPress: () => void
}

const difficultyConfig = {
  easy: { label: '쉬움', bg: '#D1FAE5', color: '#047857' },
  medium: { label: '보통', bg: '#FFF3BF', color: '#E67700' },
  hard: { label: '어려움', bg: '#FFE0E3', color: '#C92A2A' },
} as const

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const diff = difficultyConfig[recipe.difficulty]

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Match rate badge */}
      <View style={styles.matchBadge}>
        <Text style={styles.matchText}>{recipe.matchRate}% 일치</Text>
      </View>

      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {recipe.description}
      </Text>

      <View style={styles.meta}>
        <View style={[styles.badge, { backgroundColor: diff.bg }]}>
          <Text style={[styles.badgeText, { color: diff.color }]}>
            {diff.label}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={colors.neutral[500]} />
          <Text style={styles.metaText}>{recipe.cookingTime}분</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="flame-outline" size={14} color={colors.neutral[500]} />
          <Text style={styles.metaText}>{recipe.calories}kcal</Text>
        </View>
      </View>

      {recipe.missingIngredients.length > 0 && (
        <Text style={styles.missing}>
          부족한 재료: {recipe.missingIngredients.join(', ')}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  matchBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary[50],
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary[600],
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.neutral[500],
    lineHeight: 20,
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  missing: {
    fontSize: 12,
    color: colors.semantic.warning,
    marginTop: 8,
  },
})
