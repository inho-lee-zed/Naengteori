import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../src/constants/colors'

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value?: string
  onPress?: () => void
}

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const allergies = ['땅콩', '갑각류']

  const menuItems: MenuItem[] = [
    { icon: 'alert-circle-outline', label: '알레르기 설정', value: allergies.join(', ') || '없음' },
    { icon: 'help-circle-outline', label: '도움말 & FAQ' },
    { icon: 'chatbubble-outline', label: '피드백 보내기' },
    { icon: 'document-text-outline', label: '이용약관' },
    { icon: 'shield-outline', label: '개인정보 처리방침' },
    { icon: 'information-circle-outline', label: '앱 버전', value: '1.0.0' },
  ]

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.neutral[400]} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.nickname}>냉털이 유저</Text>
            <Text style={styles.email}>오늘도 냉장고를 털어보자!</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>요리 횟수</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>즐겨찾기</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>인식 재료</Text>
          </View>
        </View>

        {/* Toggles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>환경설정</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <Ionicons name="moon-outline" size={20} color={colors.neutral[600]} />
              <Text style={styles.toggleLabel}>다크모드</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: colors.primary[500], false: colors.neutral[300] }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.neutral[600]} />
              <Text style={styles.toggleLabel}>알림</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.primary[500], false: colors.neutral[300] }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Menu items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>정보</Text>
          {menuItems.map((item) => (
            <Pressable key={item.label} style={styles.menuRow} onPress={item.onPress}>
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={20} color={colors.neutral[600]} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuRight}>
                {item.value && (
                  <Text style={styles.menuValue}>{item.value}</Text>
                )}
                <Ionicons name="chevron-forward" size={16} color={colors.neutral[400]} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.neutral[0] },
  content: { paddingBottom: 40 },
  profileHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.neutral[100], alignItems: 'center', justifyContent: 'center',
  },
  profileInfo: { flex: 1 },
  nickname: { fontSize: 18, fontWeight: '700', color: colors.neutral[800] },
  email: { fontSize: 13, color: colors.neutral[500], marginTop: 2 },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.neutral[50], marginHorizontal: 20,
    borderRadius: 14, paddingVertical: 16, marginBottom: 24,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '700', color: colors.primary[500] },
  statLabel: { fontSize: 12, color: colors.neutral[500], marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: colors.neutral[200] },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 13, fontWeight: '600', color: colors.neutral[400],
    paddingHorizontal: 20, marginBottom: 8, textTransform: 'uppercase',
  },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { fontSize: 15, color: colors.neutral[700] },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuLabel: { fontSize: 15, color: colors.neutral[700] },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  menuValue: { fontSize: 13, color: colors.neutral[400] },
})
