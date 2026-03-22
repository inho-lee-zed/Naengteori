import { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { colors } from '../../../src/constants/colors'
import { getRecipeDetail } from '../../../src/services/api'
import type { RecipeDetail } from '../../../src/services/api'

export default function CookingModeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useFocusEffect(
    useCallback(() => {
      if (!id) return
      setIsLoading(true)
      getRecipeDetail(id)
        .then(setRecipe)
        .catch(() => {})
        .finally(() => setIsLoading(false))
    }, [id])
  )

  const steps = recipe?.steps || []
  const step = steps[currentStep]

  useEffect(() => {
    if (step?.duration) {
      setTimer(step.duration)
      setIsTimerRunning(false)
    }
  }, [currentStep, step?.duration])

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            if (intervalRef.current) clearInterval(intervalRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isTimerRunning, timer])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      </SafeAreaView>
    )
  }

  if (!recipe || !step) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>레시피를 찾을 수 없어요</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>돌아가기</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.neutral[700]} />
        </Pressable>
        <Text style={styles.headerTitle}>{recipe.title}</Text>
        <Text style={styles.stepCount}>
          {currentStep + 1}/{steps.length}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Step content */}
      <View style={styles.stepContainer}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>STEP {step.order}</Text>
        </View>

        <Text style={styles.instruction}>{step.instruction}</Text>

        {step.tip && (
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>💡 {step.tip}</Text>
          </View>
        )}

        {/* Timer */}
        {step.duration && step.duration > 0 && (
          <View style={styles.timerSection}>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
            <Pressable
              style={[
                styles.timerBtn,
                isTimerRunning && styles.timerBtnActive,
              ]}
              onPress={() => setIsTimerRunning(!isTimerRunning)}
            >
              <Ionicons
                name={isTimerRunning ? 'pause' : 'play'}
                size={20}
                color={isTimerRunning ? colors.primary[500] : '#FFFFFF'}
              />
              <Text
                style={[
                  styles.timerBtnText,
                  isTimerRunning && styles.timerBtnTextActive,
                ]}
              >
                {isTimerRunning ? '일시정지' : '타이머 시작'}
              </Text>
            </Pressable>
            {timer === 0 && step.duration > 0 && (
              <Text style={styles.timerDone}>⏰ 시간 완료!</Text>
            )}
          </View>
        )}
      </View>

      {/* Navigation */}
      <View style={styles.navBar}>
        <Pressable
          style={[styles.navBtn, currentStep === 0 && styles.navBtnDisabled]}
          onPress={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={currentStep === 0 ? colors.neutral[300] : colors.neutral[700]}
          />
          <Text
            style={[
              styles.navBtnText,
              currentStep === 0 && styles.navBtnTextDisabled,
            ]}
          >
            이전
          </Text>
        </Pressable>

        {isLastStep ? (
          <Pressable
            style={styles.completeBtn}
            onPress={() => {
              router.dismissAll()
              router.replace('/(tabs)')
            }}
          >
            <Text style={styles.completeBtnText}>완료! 🎉</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.nextBtn}
            onPress={() => setCurrentStep(currentStep + 1)}
          >
            <Text style={styles.nextBtnText}>다음</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.neutral[0] },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.neutral[700] },
  stepCount: { fontSize: 14, fontWeight: '500', color: colors.neutral[500] },
  progressBg: { height: 3, backgroundColor: colors.neutral[200] },
  progressFill: { height: 3, backgroundColor: colors.primary[500] },
  stepContainer: { flex: 1, paddingHorizontal: 24, paddingTop: 40, alignItems: 'center' },
  stepBadge: {
    backgroundColor: colors.primary[50], paddingVertical: 6, paddingHorizontal: 16,
    borderRadius: 20, marginBottom: 24,
  },
  stepBadgeText: { fontSize: 13, fontWeight: '700', color: colors.primary[600] },
  instruction: {
    fontSize: 20, fontWeight: '600', color: colors.neutral[800],
    textAlign: 'center', lineHeight: 30, marginBottom: 20,
  },
  tipBox: {
    backgroundColor: '#FFF4ED', borderRadius: 12, padding: 14,
    alignSelf: 'stretch', marginBottom: 24,
  },
  tipText: { fontSize: 14, color: colors.primary[700], lineHeight: 22 },
  timerSection: { alignItems: 'center', gap: 12, marginTop: 16 },
  timerText: { fontSize: 48, fontWeight: '700', color: colors.neutral[800] },
  timerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.primary[500], paddingVertical: 12, paddingHorizontal: 24,
    borderRadius: 24,
  },
  timerBtnActive: {
    backgroundColor: colors.primary[50], borderWidth: 1, borderColor: colors.primary[500],
  },
  timerBtnText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  timerBtnTextActive: { color: colors.primary[500] },
  timerDone: { fontSize: 16, fontWeight: '600', color: colors.semantic.success },
  navBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 34,
    borderTopWidth: 1, borderTopColor: colors.neutral[200],
  },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
  navBtnDisabled: { opacity: 0.4 },
  navBtnText: { fontSize: 15, color: colors.neutral[700] },
  navBtnTextDisabled: { color: colors.neutral[300] },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primary[500], paddingVertical: 12, paddingHorizontal: 24,
    borderRadius: 12,
  },
  nextBtnText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  completeBtn: {
    backgroundColor: colors.semantic.success, paddingVertical: 12, paddingHorizontal: 28,
    borderRadius: 12,
  },
  completeBtnText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: 16, color: colors.neutral[500], textAlign: 'center', marginTop: 100 },
  backLink: { fontSize: 14, color: colors.primary[500], textAlign: 'center', marginTop: 12 },
})
