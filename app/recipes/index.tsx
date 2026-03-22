import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../src/constants/colors'

export default function RecipeListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>레시피 목록</Text>
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
})
