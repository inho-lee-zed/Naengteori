import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors } from '../../src/constants/colors'
import { mockRecipeCards, type MockRecipeCard } from '../../src/utils/mockData'

export default function FavoritesScreen() {
  // Mock: first 2 recipes as favorites
  const [favorites, setFavorites] = useState<MockRecipeCard[]>(
    mockRecipeCards.slice(0, 2)
  )

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>즐겨찾기 ❤️</Text>
      <Text style={styles.subtitle}>
        찜해둔 레시피 {favorites.length}개
      </Text>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={56} color={colors.neutral[300]} />
          <Text style={styles.emptyTitle}>아직 즐겨찾기가 없어요</Text>
          <Text style={styles.emptySub}>
            마음에 드는 레시피를 하트로 저장해보세요!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/recipes/${item.id}`)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={1}>
                  {item.description}
                </Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>
                    ⏱ {item.cookingTime}분
                  </Text>
                  <Text style={styles.cardMetaText}>
                    🔥 {item.calories}kcal
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => handleRemove(item.id)}
                hitSlop={8}
                style={styles.heartBtn}
              >
                <Ionicons name="heart" size={22} color={colors.semantic.error} />
              </Pressable>
            </Pressable>
          )}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.neutral[0] },
  title: {
    fontSize: 24, fontWeight: '700', color: colors.neutral[800],
    paddingHorizontal: 20, paddingTop: 16,
  },
  subtitle: {
    fontSize: 14, color: colors.neutral[500],
    paddingHorizontal: 20, marginTop: 4, marginBottom: 16,
  },
  empty: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, paddingBottom: 80,
  },
  emptyTitle: { fontSize: 16, fontWeight: '500', color: colors.neutral[500] },
  emptySub: { fontSize: 13, color: colors.neutral[400], textAlign: 'center' },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    flexDirection: 'row', backgroundColor: colors.neutral[50],
    borderRadius: 14, padding: 14, alignItems: 'center',
  },
  cardContent: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.neutral[800] },
  cardDesc: { fontSize: 13, color: colors.neutral[500] },
  cardMeta: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cardMetaText: { fontSize: 12, color: colors.neutral[400] },
  heartBtn: { padding: 8 },
})
