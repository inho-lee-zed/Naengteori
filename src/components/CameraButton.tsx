import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { colors } from '../constants/colors'

interface CameraButtonProps {
  onPress: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function CameraButton({ onPress }: CameraButtonProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <View style={styles.container}>
      <AnimatedPressable
        onPressIn={() => {
          scale.value = withSpring(0.93)
        }}
        onPressOut={() => {
          scale.value = withSpring(1)
        }}
        onPress={onPress}
        style={[styles.button, animatedStyle]}
      >
        <Ionicons name="camera" size={48} color="#FFFFFF" />
      </AnimatedPressable>
      <Text style={styles.label}>냉장고 털기!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary[500],
  },
})
