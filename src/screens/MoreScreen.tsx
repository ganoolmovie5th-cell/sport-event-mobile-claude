import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable, Linking } from 'react-native';
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
      <View style={[styles.section, { borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Pengaturan</Text>
        <View style={[styles.row, { borderBottomColor: colors.border }]}>
          <View style={styles.rowLeft}>
            <Ionicons name={theme === 'dark' ? 'moon' : 'sunny'} size={22} color={colors.primary} />
            <Text style={[styles.rowLabel, { color: colors.text }]}>Mode Gelap</Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={(v) => setTheme(v ? 'dark' : 'light')}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={[styles.section, { borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Statistik</Text>
        <StatRow icon="calendar" label="Total Event" value={`${EVENTS.length}`} colors={colors} />
        <StatRow icon="heart" label="Wishlist" value={`${wishlist.length} event`} colors={colors} />
        <StatRow icon="location" label="Kota" value={`${cities.length} kota`} colors={colors} />
      </View>

      <View style={[styles.section, { borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Venue Populer</Text>
        {['Istora Senayan, Jakarta', 'Mandalika Circuit, Lombok', 'Stadion GBK, Jakarta', 'ICE BSD, Tangerang', 'Candi Borobudur, Magelang'].map((v) => (
          <View key={v} style={[styles.venueRow, { borderBottomColor: colors.border }]}>
            <Ionicons name="pin-outline" size={18} color={colors.accent} />
            <Text style={[styles.venueText, { color: colors.textSecondary }]}>{v}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tentang</Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
          Aplikasi jadwal event olahraga di Indonesia 2026-2030. Mencakup event internasional, nasional, dan regional.
        </Text>
        <Text style={[styles.version, { color: colors.textMuted }]}>Versi 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

function StatRow({ icon, label, value, colors }: { icon: any; label: string; value: string; colors: any }) {
  return (
    <View style={[statStyles.row, { borderBottomColor: colors.border }]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
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
  label: { flex: 1, fontSize: 15 },
  value: { fontSize: 14, fontWeight: '600' },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowLabel: { fontSize: 15 },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  venueText: { fontSize: 14 },
  aboutText: { fontSize: 14, lineHeight: 22 },
  version: { fontSize: 12, marginTop: 12 },
});
