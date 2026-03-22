import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors } from '../../src/constants/colors'
import { RecipeCard } from '../../src/components/RecipeCard'
import { mockRecipeCards } from '../../src/utils/mockData'

export default function RecipeListScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </Pressable>
        <Text style={styles.headerTitle}>추천 레시피</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.subtitle}>
        이 조합 실화? 대박 레시피 발견! 🎉
      </Text>

      <FlatList
        data={mockRecipeCards}
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
})
