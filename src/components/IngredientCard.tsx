import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import type { Ingredient } from '../types'

interface IngredientCardProps {
  ingredient: Ingredient
  onRemove: (id: string) => void
}

export function IngredientCard({ ingredient, onRemove }: IngredientCardProps) {
  const confidencePercent = Math.round(ingredient.confidence * 100)

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{ingredient.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{ingredient.category}</Text>
        </View>
      </View>

      <View style={styles.confidenceContainer}>
        <Text style={styles.confidenceText}>{confidencePercent}%</Text>
        <View style={styles.confidenceBarBg}>
          <View
            style={[
              styles.confidenceBarFill,
              { width: `${confidencePercent}%` },
            ]}
          />
        </View>
      </View>

      <Pressable
        onPress={() => onRemove(ingredient.id)}
        style={styles.removeButton}
        hitSlop={8}
      >
        <Ionicons name="close" size={18} color={colors.neutral[400]} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D1FAE5',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#047857',
  },
  confidenceContainer: {
    width: 60,
    alignItems: 'flex-end',
    gap: 4,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[500],
  },
  confidenceBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  confidenceBarFill: {
    height: 4,
    backgroundColor: colors.primary[500],
    borderRadius: 2,
  },
  removeButton: {
    padding: 4,
  },
})
