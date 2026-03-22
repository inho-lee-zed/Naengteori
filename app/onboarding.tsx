import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors } from '../src/constants/colors'

interface OnboardingPage {
  icon: keyof typeof Ionicons.glyphMap
  emoji: string
  title: string
  description: string
}

const pages: OnboardingPage[] = [
  {
    icon: 'camera',
    emoji: '📸',
    title: '냉장고 사진 한 장이면 끝!',
    description: '냉장고를 열고 사진만 찍어봐.\nAI가 재료를 알아서 인식해줄게.',
  },
  {
    icon: 'restaurant',
    emoji: '🍳',
    title: '맞춤 레시피 추천',
    description: '있는 재료로 뭘 만들 수 있는지\n바로 알려줄게. 부족한 재료도 표시해줘!',
  },
  {
    icon: 'flame',
    emoji: '🔥',
    title: '스텝 바이 스텝 조리',
    description: '타이머까지 포함된 단계별 가이드로\n누구나 쉽게 따라할 수 있어.',
  },
]

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0)
  const page = pages[currentPage]
  const isLast = currentPage === pages.length - 1

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.skip}>
        <Pressable onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>건너뛰기</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>{page.emoji}</Text>
        <Text style={styles.title}>{page.title}</Text>
        <Text style={styles.description}>{page.description}</Text>
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {pages.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentPage && styles.dotActive]}
          />
        ))}
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        {isLast ? (
          <Pressable
            style={styles.startBtn}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.startBtnText}>냉장고 털러 가기!</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.nextBtn}
            onPress={() => setCurrentPage(currentPage + 1)}
          >
            <Text style={styles.nextBtnText}>다음</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.neutral[0] },
  skip: { alignItems: 'flex-end', paddingHorizontal: 20, paddingTop: 8 },
  skipText: { fontSize: 14, color: colors.neutral[400], padding: 8 },
  content: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emoji: { fontSize: 72, marginBottom: 24 },
  title: {
    fontSize: 24, fontWeight: '700', color: colors.neutral[800],
    textAlign: 'center', marginBottom: 12,
  },
  description: {
    fontSize: 15, color: colors.neutral[500],
    textAlign: 'center', lineHeight: 24,
  },
  dots: {
    flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 32,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.neutral[300],
  },
  dotActive: { width: 24, backgroundColor: colors.primary[500] },
  bottom: { paddingHorizontal: 20, paddingBottom: 34 },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary[500], paddingVertical: 16, borderRadius: 12,
  },
  nextBtnText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  startBtn: {
    backgroundColor: colors.primary[500], paddingVertical: 16, borderRadius: 12,
    alignItems: 'center',
  },
  startBtnText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
})
