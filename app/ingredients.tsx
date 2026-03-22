import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../src/constants/colors'
import { IngredientCard } from '../src/components/IngredientCard'
import { scanImage } from '../src/services/api'
import type { Ingredient } from '../src/types'

export default function IngredientsScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>()
  const { width: screenWidth } = useWindowDimensions()
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [imageAspect, setImageAspect] = useState(16 / 9)

  useEffect(() => {
    if (imageUri) {
      Image.getSize(decodeURIComponent(imageUri), (w, h) => {
        setImageAspect(w / h)
      })
    }
  }, [imageUri])

  const runScan = async (uri: string) => {
    setIsAnalyzing(true)
    setError(null)
    try {
      const result = await scanImage(decodeURIComponent(uri))
      const mapped: Ingredient[] = result.ingredients.map((item, index) => ({
        id: `${result.id}-${index}`,
        name: item.name,
        category: item.category,
        confidence: item.confidence,
      }))
      setIngredients(mapped)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '재료 인식에 실패했습니다.'
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  useEffect(() => {
    if (imageUri) {
      runScan(imageUri)
    }
  }, [imageUri])

  const handleRemove = (id: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id))
  }

  const handleAdd = () => {
    if (!newName.trim()) return
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: newName.trim(),
      category: '기타',
      confidence: 1.0,
    }
    setIngredients((prev) => [...prev, newIngredient])
    setNewName('')
    setIsAdding(false)
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </Pressable>
        <Text style={styles.headerTitle}>재료 인식</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Image preview */}
      {imageUri && (
        <Image
          source={{ uri: decodeURIComponent(imageUri) }}
          style={[
            styles.image,
            {
              width: screenWidth - 40,
              height: Math.min((screenWidth - 40) / imageAspect, 300),
            },
          ]}
          resizeMode="contain"
        />
      )}

      {isAnalyzing ? (
        <View style={styles.analyzingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={styles.analyzingText}>
            냉장고 탈탈 털어보는 중... 🔍
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.neutral[400]} />
          <Text style={styles.errorText}>{error}</Text>
          {imageUri && (
            <Pressable
              style={styles.retryBtn}
              onPress={() => runScan(imageUri)}
            >
              <Text style={styles.retryBtnText}>다시 시도</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <>
          {/* Ingredient list */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              발견된 재료 ({ingredients.length}개)
            </Text>
          </View>

          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <IngredientCard ingredient={item} onRemove={handleRemove} />
            )}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponent={
              <View style={styles.addSection}>
                {isAdding ? (
                  <View style={styles.addInputRow}>
                    <TextInput
                      style={styles.addInput}
                      placeholder="재료 이름 입력"
                      placeholderTextColor={colors.neutral[400]}
                      value={newName}
                      onChangeText={setNewName}
                      onSubmitEditing={handleAdd}
                      autoFocus
                    />
                    <Pressable onPress={handleAdd} style={styles.addConfirmBtn}>
                      <Text style={styles.addConfirmText}>추가</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => setIsAdding(true)}
                    style={styles.addBtn}
                  >
                    <Ionicons
                      name="add"
                      size={20}
                      color={colors.neutral[400]}
                    />
                    <Text style={styles.addBtnText}>재료 추가</Text>
                  </Pressable>
                )}
              </View>
            }
          />

          {/* Bottom CTA */}
          <View style={styles.bottomCta}>
            <Pressable
              style={styles.ctaButton}
              onPress={() =>
                router.push({
                  pathname: '/recipes',
                  params: { ingredients: ingredients.map((i) => i.name).join(',') },
                })
              }
            >
              <Text style={styles.ctaText}>
                {ingredients.length}개 재료로 레시피 찾기!
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  image: {
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: colors.neutral[200],
  },
  analyzingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  analyzingText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[600],
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  addSection: {
    marginTop: 8,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.neutral[300],
  },
  addBtnText: {
    fontSize: 14,
    color: colors.neutral[400],
  },
  addInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.neutral[700],
  },
  addConfirmBtn: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addConfirmText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 15,
    color: colors.neutral[500],
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomCta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    backgroundColor: colors.neutral[0],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  ctaButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
