import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../../src/constants/colors'
import { mockRecipes } from '../../src/utils/mockData'

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const recipe = mockRecipes.find((r) => r.id === id)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>레시피를 찾을 수 없어요 😢</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>돌아가기</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  const diffConfig = {
    easy: { label: '쉬움', bg: '#D1FAE5', color: '#047857' },
    medium: { label: '보통', bg: '#FFF3BF', color: '#E67700' },
    hard: { label: '어려움', bg: '#FFE0E3', color: '#C92A2A' },
  } as const
  const diff = diffConfig[recipe.difficulty]
  const totalTime = recipe.steps.reduce((sum, s) => sum + (s.duration || 0), 0)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </Pressable>
        <Pressable onPress={() => setIsFavorite(!isFavorite)} hitSlop={12}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? colors.semantic.error : colors.neutral[400]}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: diff.bg }]}>
            <Text style={[styles.badgeText, { color: diff.color }]}>{diff.label}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.neutral[500]} />
            <Text style={styles.metaText}>{recipe.cookingTime}분</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="flame-outline" size={16} color={colors.neutral[500]} />
            <Text style={styles.metaText}>{recipe.calories}kcal</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>재료</Text>
        <View style={styles.ingredientList}>
          {recipe.ingredients.map((ing) => (
            <View key={ing.id} style={styles.ingredientChip}>
              <Text style={styles.ingredientText}>{ing.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>
          조리 순서 ({recipe.steps.length}단계, 약 {Math.ceil(totalTime / 60)}분)
        </Text>
        {recipe.steps.map((step) => (
          <View key={step.order} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.order}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepInstruction}>{step.instruction}</Text>
              {step.tip && <Text style={styles.stepTip}>💡 {step.tip}</Text>}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomCta}>
        <Pressable
          style={styles.cookButton}
          onPress={() => router.push(`/recipes/${id}/cook`)}
        >
          <Ionicons name="flame" size={20} color="#FFFFFF" />
          <Text style={styles.cookButtonText}>조리 시작!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.neutral[0] },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: colors.neutral[800], marginBottom: 6 },
  description: { fontSize: 14, color: colors.neutral[500], lineHeight: 22, marginBottom: 16 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  badge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 14 },
  badgeText: { fontSize: 13, fontWeight: '600' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 13, color: colors.neutral[500] },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.neutral[700], marginBottom: 12 },
  ingredientList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  ingredientChip: { backgroundColor: '#ECFDF5', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  ingredientText: { fontSize: 14, fontWeight: '500', color: '#047857' },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary[500],
    alignItems: 'center', justifyContent: 'center',
  },
  stepNumberText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  stepContent: { flex: 1 },
  stepInstruction: { fontSize: 14, color: colors.neutral[700], lineHeight: 22 },
  stepTip: { fontSize: 12, color: colors.primary[600], marginTop: 4 },
  bottomCta: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 34,
    backgroundColor: colors.neutral[0], borderTopWidth: 1, borderTopColor: colors.neutral[200],
  },
  cookButton: {
    backgroundColor: colors.primary[500], paddingVertical: 16, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  cookButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  notFound: { fontSize: 16, color: colors.neutral[500], textAlign: 'center', marginTop: 100 },
  backLink: { fontSize: 14, color: colors.primary[500], textAlign: 'center', marginTop: 12 },
})
