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
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../src/constants/colors'
import { IngredientCard } from '../src/components/IngredientCard'
import { mockIngredients } from '../src/utils/mockData'
import type { Ingredient } from '../src/types'

export default function IngredientsScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>()
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      setIngredients(mockIngredients)
      setIsAnalyzing(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

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
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {isAnalyzing ? (
        <View style={styles.analyzingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={styles.analyzingText}>
            냉장고 탈탈 털어보는 중... 🔍
          </Text>
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
              onPress={() => router.push('/recipes')}
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
    height: 180,
    marginHorizontal: 20,
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
