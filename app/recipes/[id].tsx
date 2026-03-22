import { View, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { colors } from '../../src/constants/colors'

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>레시피 상세</Text>
      <Text style={styles.subtitle}>{id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral[0],
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[500],
    marginTop: 8,
  },
})
