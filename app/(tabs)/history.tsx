import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../src/constants/colors'

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>기록</Text>
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
