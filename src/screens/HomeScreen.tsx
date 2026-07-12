import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EVENTS } from '../data/events';
import { SPORTS, SPORT_LIST } from '../constants/sports';
import { darkTheme, lightTheme } from '../constants/colors';
import { useAppStore } from '../store/appStore';
import { getUpcomingEvents, getUniqueCities } from '../utils/helpers';
import { EventCard } from '../components/EventCard';
import { FilterChips } from '../components/FilterChips';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { theme, sportFilter, setSportFilter } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const upcoming = getUpcomingEvents(EVENTS).slice(0, 6);
  const cities = getUniqueCities(EVENTS);
  const sports = new Set(EVENTS.map((e) => e.sport));

  const filteredUpcoming = sportFilter
    ? upcoming.filter((e) => e.sport === sportFilter)
    : upcoming;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View style={[styles.heroSection, { paddingTop: insets.top + 16 }]}>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          🏆 Event Olahraga
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.text }]}>
          Indonesia 2026-2030
        </Text>
        <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
          Jadwal lengkap event olahraga nasional dan internasional di Indonesia
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statNum, { color: colors.primary }]}>{EVENTS.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Event</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statNum, { color: colors.accent }]}>{sports.size}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cabang Olahraga</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statNum, { color: colors.success }]}>{cities.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Kota</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>🔥 Event Terdekat</Text>
      </View>

      <FilterChips
        items={SPORT_LIST.map((s) => ({ key: s.key, label: s.label, emoji: s.emoji }))}
        selected={sportFilter}
        onSelect={(key) => setSportFilter(key as any)}
        colors={colors}
      />

      {filteredUpcoming.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          colors={colors}
          onPress={() => navigation.navigate('Detail', { eventId: event.id })}
        />
      ))}

      {filteredUpcoming.length === 0 && (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            Tidak ada event terdekat untuk kategori ini
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: { paddingHorizontal: 20, paddingBottom: 20 },
  heroTitle: { fontSize: 28, fontWeight: '800', lineHeight: 34 },
  heroSubtitle: { fontSize: 22, fontWeight: '700', marginTop: 2 },
  heroDesc: { fontSize: 14, marginTop: 8, lineHeight: 20 },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  statNum: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 11, marginTop: 4, fontWeight: '500' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  empty: { alignItems: 'center', padding: 32 },
  emptyText: { fontSize: 14 },
});
