import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors } from '../../src/constants/colors'

interface HistoryItem {
  id: string
  recipeId: string
  title: string
  rating: number
  cookedAt: string
}

const mockHistory: HistoryItem[] = [
  { id: 'h1', recipeId: 'r1', title: '김치두부볶음', rating: 5, cookedAt: '2026-03-21' },
  { id: 'h2', recipeId: 'r2', title: '양파계란볶음밥', rating: 4, cookedAt: '2026-03-20' },
  { id: 'h3', recipeId: 'r3', title: '김치찌개', rating: 5, cookedAt: '2026-03-18' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color={i <= rating ? '#FCC419' : colors.neutral[300]}
        />
      ))}
    </View>
  )
}

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>조리 기록 📝</Text>
      <Text style={styles.subtitle}>
        총 {mockHistory.length}번 요리했어요!
      </Text>

      {mockHistory.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={56} color={colors.neutral[300]} />
          <Text style={styles.emptyTitle}>아직 요리 기록이 없어요</Text>
          <Text style={styles.emptySub}>
            냉장고를 털어서 첫 요리를 시작해보세요!
          </Text>
        </View>
      ) : (
        <FlatList
          data={mockHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/recipes/${item.recipeId}`)}
            >
              <View style={styles.dateBox}>
                <Text style={styles.dateDay}>
                  {new Date(item.cookedAt).getDate()}
                </Text>
                <Text style={styles.dateMonth}>
                  {new Date(item.cookedAt).getMonth() + 1}월
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <StarRating rating={item.rating} />
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.neutral[400]}
              />
            </Pressable>
          )}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
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
  emptySub: { fontSize: 13, color: colors.neutral[400] },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.neutral[50], borderRadius: 14, padding: 14, gap: 14,
  },
  dateBox: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: colors.primary[50], alignItems: 'center', justifyContent: 'center',
  },
  dateDay: { fontSize: 16, fontWeight: '700', color: colors.primary[600] },
  dateMonth: { fontSize: 10, color: colors.primary[500] },
  cardContent: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: colors.neutral[800] },
  stars: { flexDirection: 'row', gap: 2 },
})
