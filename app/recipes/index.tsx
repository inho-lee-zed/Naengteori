import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../../src/constants/colors'
import { RecipeCard } from '../../src/components/RecipeCard'
import { recommendRecipes } from '../../src/services/api'
import type { RecipeRecommendation } from '../../src/services/api'

export default function RecipeListScreen() {
  const { ingredients: ingredientsParam } = useLocalSearchParams<{ ingredients?: string }>()
  const [recipes, setRecipes] = useState<RecipeRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ingredientList = ingredientsParam
      ? ingredientsParam.split(',').map((s) => s.trim()).filter(Boolean)
      : []

    const fetchRecipes = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await recommendRecipes(ingredientList)
        setRecipes(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : '레시피 추천에 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
  }, [ingredientsParam])

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </Pressable>
        <Text style={styles.headerTitle}>추천 레시피</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={styles.loadingText}>AI가 레시피를 추천하는 중...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.semantic.error} />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => {
              const ingredientList = ingredientsParam
                ? ingredientsParam.split(',').map((s) => s.trim()).filter(Boolean)
                : []
              setIsLoading(true)
              setError(null)
              recommendRecipes(ingredientList)
                .then(setRecipes)
                .catch((err) =>
                  setError(err instanceof Error ? err.message : '레시피 추천에 실패했습니다.')
                )
                .finally(() => setIsLoading(false))
            }}
          >
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="restaurant-outline" size={48} color={colors.neutral[400]} />
          <Text style={styles.emptyText}>추천할 레시피가 없어요</Text>
          <Text style={styles.emptySubText}>재료를 더 추가해보세요</Text>
        </View>
      ) : (
        <>
          <Text style={styles.subtitle}>
            이 조합 실화? 대박 레시피 발견! 🎉
          </Text>
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecipeCard
                recipe={item}
                onPress={() => router.push(`/recipes/${item.id}`)}
              />
            )}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.neutral[0],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral[500],
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: colors.semantic.error,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 4,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[600],
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: colors.neutral[400],
    textAlign: 'center',
  },
})
