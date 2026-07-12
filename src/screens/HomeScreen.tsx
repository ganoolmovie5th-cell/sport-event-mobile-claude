import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
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

  // Featured events for horizontal scroll
  const featured = getUpcomingEvents(EVENTS).slice(0, 4);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      {/* Hero Section */}
      <View style={[styles.heroSection, { paddingTop: insets.top + 20 }]}>
        <Text style={[styles.heroGreeting, { color: colors.textSecondary }]}>
          Selamat datang di
        </Text>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          🏆 Sport Event ID
        </Text>
        <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
          Jadwal lengkap event olahraga Indonesia 2026-2030
        </Text>
      </View>

      {/* Stats Row - Glass Cards */}
      <View style={styles.statsRow}>
        <View style={[
          styles.statCard,
          {
            backgroundColor: colors.glass,
            borderColor: colors.cardBorder,
            ...Platform.select({
              ios: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8 },
              android: { elevation: 2 },
            }),
          },
        ]}>
          <Text style={[styles.statEmoji]}>🎯</Text>
          <Text style={[styles.statNum, { color: colors.primary }]}>{EVENTS.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Event</Text>
        </View>
        <View style={[
          styles.statCard,
          {
            backgroundColor: colors.glass,
            borderColor: colors.cardBorder,
            ...Platform.select({
              ios: { shadowColor: colors.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8 },
              android: { elevation: 2 },
            }),
          },
        ]}>
          <Text style={[styles.statEmoji]}>🏅</Text>
          <Text style={[styles.statNum, { color: colors.accent }]}>{sports.size}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cabor</Text>
        </View>
        <View style={[
          styles.statCard,
          {
            backgroundColor: colors.glass,
            borderColor: colors.cardBorder,
            ...Platform.select({
              ios: { shadowColor: colors.success, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8 },
              android: { elevation: 2 },
            }),
          },
        ]}>
          <Text style={[styles.statEmoji]}>📍</Text>
          <Text style={[styles.statNum, { color: colors.success }]}>{cities.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Kota</Text>
        </View>
      </View>

      {/* Hot Events - Horizontal Scroll */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          🔥 Hot Events
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hotScrollContainer}
      >
        {featured.map((event) => {
          const sportMeta = SPORTS[event.sport];
          return (
            <Pressable
              key={event.id}
              style={[
                styles.hotCard,
                {
                  backgroundColor: sportMeta.color + '12',
                  borderColor: sportMeta.color + '30',
                  ...Platform.select({
                    ios: { shadowColor: sportMeta.color, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12 },
                    android: { elevation: 4 },
                  }),
                },
              ]}
              onPress={() => navigation.navigate('Detail', { eventId: event.id })}
              accessibilityRole="button"
              accessibilityLabel={`Hot event ${event.title}`}
            >
              <Text style={styles.hotEmoji}>{event.imageEmoji}</Text>
              <Text style={[styles.hotTitle, { color: colors.text }]} numberOfLines={2}>
                {event.title}
              </Text>
              <View style={[styles.hotSportPill, { backgroundColor: sportMeta.color + '20' }]}>
                <Text style={[styles.hotSportText, { color: sportMeta.color }]}>
                  {sportMeta.emoji} {sportMeta.label}
                </Text>
              </View>
              <Text style={[styles.hotCity, { color: colors.textSecondary }]}>
                📍 {event.city}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Upcoming Events Section */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          📅 Event Terdekat
        </Text>
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
          <Text style={styles.emptyEmoji}>🏟️</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Belum Ada Event
          </Text>
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
  heroSection: { paddingHorizontal: 20, paddingBottom: 24 },
  heroGreeting: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  heroTitle: { fontSize: 30, fontWeight: '800', lineHeight: 38, letterSpacing: -0.5 },
  heroDesc: { fontSize: 14, marginTop: 6, lineHeight: 20 },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 2,
  },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statNum: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 4,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
  hotScrollContainer: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  hotCard: {
    width: 180,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
  },
  hotEmoji: { fontSize: 36 },
  hotTitle: { fontSize: 14, fontWeight: '700', lineHeight: 19, letterSpacing: -0.2 },
  hotSportPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  hotSportText: { fontSize: 11, fontWeight: '600' },
  hotCity: { fontSize: 12, fontWeight: '500' },
  empty: { alignItems: 'center', padding: 40, gap: 8 },
  emptyEmoji: { fontSize: 48, marginBottom: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '700' },
  emptyText: { fontSize: 14 },
});
