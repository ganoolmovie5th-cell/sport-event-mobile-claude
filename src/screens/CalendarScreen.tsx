import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EVENTS } from '../data/events';
import { darkTheme, lightTheme } from '../constants/colors';
import { useAppStore } from '../store/appStore';
import { getEventsByMonth, formatDateShort } from '../utils/helpers';
import { SPORTS } from '../constants/sports';

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { theme } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear() < 2026 ? 2026 : now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const eventDays = useMemo(() => {
    const days: Record<number, number> = {};
    EVENTS.forEach((e) => {
      const d = new Date(e.startDate);
      if (d.getFullYear() === year) {
        const m = d.getMonth();
        days[m] = (days[m] || 0) + 1;
      }
    });
    return days;
  }, [year]);

  const monthEvents = useMemo(() => {
    if (selectedMonth === null) return [];
    return getEventsByMonth(EVENTS, year, selectedMonth);
  }, [year, selectedMonth]);

  const isCurrentMonth = (idx: number) => {
    return now.getFullYear() === year && now.getMonth() === idx;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      {/* Year navigation - bigger, bolder */}
      <View style={styles.yearNav}>
        <Pressable
          style={[styles.navBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setYear((y) => y - 1)}
          accessibilityRole="button"
          accessibilityLabel="Tahun sebelumnya"
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.yearCenter}>
          <Text style={[styles.yearText, { color: colors.text }]}>{year}</Text>
          <Text style={[styles.yearSubtext, { color: colors.textMuted }]}>
            {Object.values(eventDays).reduce((a, b) => a + b, 0)} event
          </Text>
        </View>
        <Pressable
          style={[styles.navBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setYear((y) => y + 1)}
          accessibilityRole="button"
          accessibilityLabel="Tahun berikutnya"
        >
          <Ionicons name="chevron-forward" size={22} color={colors.text} />
        </Pressable>
      </View>

      {/* Month grid */}
      <View style={styles.monthGrid}>
        {MONTH_NAMES.map((name, idx) => {
          const count = eventDays[idx] || 0;
          const isSelected = selectedMonth === idx;
          const isCurrent = isCurrentMonth(idx);
          return (
            <Pressable
              key={idx}
              style={[
                styles.monthCell,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isCurrent && !isSelected ? colors.primary : isSelected ? colors.primary : colors.border,
                  borderWidth: isCurrent && !isSelected ? 2 : 1,
                  ...(isSelected ? Platform.select({
                    ios: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
                    android: { elevation: 4 },
                  }) : {}),
                },
              ]}
              onPress={() => setSelectedMonth(isSelected ? null : idx)}
              accessibilityRole="button"
              accessibilityLabel={`${name} ${year}, ${count} event`}
            >
              <Text style={[styles.monthName, { color: isSelected ? '#fff' : colors.text }]}>
                {name.slice(0, 3)}
              </Text>
              {count > 0 && (
                <View style={styles.dotRow}>
                  {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
                    <View
                      key={i}
                      style={[styles.eventDot, { backgroundColor: isSelected ? '#fff' : colors.primary }]}
                    />
                  ))}
                  {count > 4 && (
                    <Text style={[styles.dotMore, { color: isSelected ? '#fff' : colors.primary }]}>
                      +{count - 4}
                    </Text>
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Event list for selected month */}
      {selectedMonth !== null && (
        <View style={styles.eventList}>
          <Text style={[styles.monthTitle, { color: colors.text }]}>
            📅 {MONTH_NAMES[selectedMonth]} {year}
          </Text>
          {monthEvents.length === 0 ? (
            <View style={styles.noEventsWrap}>
              <Text style={styles.noEventsEmoji}>📭</Text>
              <Text style={[styles.noEvents, { color: colors.textMuted }]}>
                Tidak ada event di bulan ini
              </Text>
            </View>
          ) : (
            monthEvents.map((event) => {
              const sportMeta = SPORTS[event.sport];
              return (
                <Pressable
                  key={event.id}
                  style={[styles.eventItem, {
                    backgroundColor: colors.surface,
                    borderColor: colors.cardBorder,
                    borderLeftColor: sportMeta.color,
                  }]}
                  onPress={() => navigation.navigate('Detail', { eventId: event.id })}
                  accessibilityRole="button"
                >
                  <Text style={styles.eventEmoji}>{event.imageEmoji}</Text>
                  <View style={styles.eventInfo}>
                    <Text style={[styles.eventTitle, { color: colors.text }]} numberOfLines={1}>
                      {event.title}
                    </Text>
                    <Text style={[styles.eventDate, { color: colors.textSecondary }]}>
                      {formatDateShort(event.startDate)} · {event.city}
                    </Text>
                  </View>
                  <View style={[styles.sportChip, { backgroundColor: sportMeta.color + '15' }]}>
                    <Text style={[styles.sportChipText, { color: sportMeta.color }]}>
                      {sportMeta.emoji}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  yearNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  navBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearCenter: { alignItems: 'center' },
  yearText: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  yearSubtext: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  monthCell: {
    width: '30%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
  },
  monthName: { fontSize: 14, fontWeight: '700' },
  dotRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  eventDot: { width: 6, height: 6, borderRadius: 3 },
  dotMore: { fontSize: 10, fontWeight: '700', marginLeft: 2 },
  eventList: { paddingHorizontal: 16, paddingTop: 28 },
  monthTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14, letterSpacing: -0.3 },
  noEventsWrap: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  noEventsEmoji: { fontSize: 36 },
  noEvents: { fontSize: 14 },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderLeftWidth: 3,
    marginBottom: 10,
    gap: 12,
  },
  eventEmoji: { fontSize: 28 },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 15, fontWeight: '700', marginBottom: 3, letterSpacing: -0.2 },
  eventDate: { fontSize: 12, fontWeight: '500' },
  sportChip: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportChipText: { fontSize: 16 },
});
