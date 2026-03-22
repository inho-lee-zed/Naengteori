import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { colors } from '../../src/constants/colors'
import { CameraButton } from '../../src/components/CameraButton'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>오늘은 뭘 털어볼까? 🍳</Text>
          <Text style={styles.subtitle}>
            냉장고 사진을 찍으면 레시피를 찾아줄게
          </Text>
        </View>

        {/* Camera CTA */}
        <View style={styles.ctaSection}>
          <CameraButton onPress={() => router.push('/camera')} />
        </View>

        {/* Recent Recipes */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>최근 레시피</Text>
            <Text style={styles.seeMore}>더보기</Text>
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyTitle}>아직 요리 기록이 없어요</Text>
            <Text style={styles.emptySubtitle}>
              냉장고를 털어서 첫 레시피를 만들어보세요!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 16,
    marginBottom: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.neutral[800],
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 6,
    lineHeight: 22,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  recentSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  seeMore: {
    fontSize: 13,
    color: colors.primary[500],
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.neutral[500],
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.neutral[400],
    textAlign: 'center',
  },
})
