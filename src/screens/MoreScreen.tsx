import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '../constants/colors';
import { useAppStore } from '../store/appStore';
import { EVENTS } from '../data/events';
import { getUniqueCities } from '../utils/helpers';

export function MoreScreen() {
  const insets = useSafeAreaInsets();
  const { theme, setTheme, wishlist } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  const cities = getUniqueCities(EVENTS);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      {/* Profile-like header */}
      <View style={[styles.profileHeader, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
        <View style={[styles.avatarWrap, { backgroundColor: colors.primary + '15' }]}>
          <Text style={styles.avatarEmoji}>🏆</Text>
        </View>
        <Text style={[styles.profileName, { color: colors.text }]}>Sport Event ID</Text>
        <Text style={[styles.profileDesc, { color: colors.textSecondary }]}>
          Jadwal event olahraga Indonesia 2026-2030
        </Text>
      </View>

      {/* Settings Section */}
      <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>⚙️ Pengaturan</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name={theme === 'dark' ? 'moon' : 'sunny'} size={18} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Mode Gelap</Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={(v) => setTheme(v ? 'dark' : 'light')}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Stats Section */}
      <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>📊 Statistik</Text>
        <StatRow icon="calendar" label="Total Event" value={`${EVENTS.length}`} color={colors.primary} colors={colors} />
        <StatRow icon="heart" label="Wishlist" value={`${wishlist.length} event`} color="#ef4444" colors={colors} />
        <StatRow icon="location" label="Kota" value={`${cities.length} kota`} color={colors.accent} colors={colors} />
      </View>

      {/* Venues Section */}
      <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>🏟️ Venue Populer</Text>
        {[
          { name: 'Istora Senayan, Jakarta', emoji: '🏸' },
          { name: 'Mandalika Circuit, Lombok', emoji: '🏍️' },
          { name: 'Stadion GBK, Jakarta', emoji: '⚽' },
          { name: 'ICE BSD, Tangerang', emoji: '🎮' },
          { name: 'Candi Borobudur, Magelang', emoji: '🏃' },
        ].map((v) => (
          <View key={v.name} style={[styles.venueCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={styles.venueEmoji}>{v.emoji}</Text>
            <Text style={[styles.venueText, { color: colors.text }]}>{v.name}</Text>
          </View>
        ))}
      </View>

      {/* About Section */}
      <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>ℹ️ Tentang</Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          Aplikasi jadwal event olahraga di Indonesia 2026-2030. Mencakup event internasional, nasional, dan regional dari berbagai cabang olahraga.
        </Text>
        <View style={[styles.versionBadge, { backgroundColor: colors.primary + '10' }]}>
          <Text style={[styles.versionText, { color: colors.primary }]}>v1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function StatRow({ icon, label, value, color, colors }: { icon: any; label: string; value: string; color: string; colors: any }) {
  return (
    <View style={[statStyles.row, { borderBottomColor: colors.border }]}>
      <View style={[statStyles.iconWrap, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={16} color={color} />
      </View>
      <Text style={[statStyles.label, { color: colors.text }]}>{label}</Text>
      <Text style={[statStyles.value, { color: colors.textSecondary }]}>{value}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { flex: 1, fontSize: 15, fontWeight: '500' },
  value: { fontSize: 14, fontWeight: '700' },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileHeader: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: '#7c3aed', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 2 },
    }),
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarEmoji: { fontSize: 32 },
  profileName: { fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  profileDesc: { fontSize: 13, textAlign: 'center' },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 1,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14, letterSpacing: -0.2 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  venueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  venueEmoji: { fontSize: 20 },
  venueText: { fontSize: 14, fontWeight: '500', flex: 1 },
  aboutText: { fontSize: 14, lineHeight: 22 },
  versionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 12,
  },
  versionText: { fontSize: 12, fontWeight: '700' },
});
