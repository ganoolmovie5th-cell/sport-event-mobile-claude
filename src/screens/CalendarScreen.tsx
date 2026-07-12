import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
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

  const [year, setYear] = useState(2026);
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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View style={styles.yearNav}>
        <Pressable onPress={() => setYear((y) => y - 1)} accessibilityRole="button" accessibilityLabel="Tahun sebelumnya">
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </Pressable>
        <Text style={[styles.yearText, { color: colors.text }]}>{year}</Text>
        <Pressable onPress={() => setYear((y) => y + 1)} accessibilityRole="button" accessibilityLabel="Tahun berikutnya">
          <Ionicons name="chevron-forward" size={28} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.monthGrid}>
        {MONTH_NAMES.map((name, idx) => {
          const count = eventDays[idx] || 0;
          const isSelected = selectedMonth === idx;
          return (
            <Pressable
              key={idx}
              style={[
                styles.monthCell,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
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
                <View style={[styles.dot, { backgroundColor: isSelected ? '#fff' : colors.primary }]}>
                  <Text style={[styles.dotText, { color: isSelected ? colors.primary : '#fff' }]}>
                    {count}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {selectedMonth !== null && (
        <View style={styles.eventList}>
          <Text style={[styles.monthTitle, { color: colors.text }]}>
            {MONTH_NAMES[selectedMonth]} {year}
          </Text>
          {monthEvents.length === 0 ? (
            <Text style={[styles.noEvents, { color: colors.textMuted }]}>
              Tidak ada event di bulan ini
            </Text>
          ) : (
            monthEvents.map((event) => (
              <Pressable
                key={event.id}
                style={[styles.eventItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
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
                <View style={[styles.sportDot, { backgroundColor: SPORTS[event.sport].color }]} />
              </Pressable>
            ))
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
    gap: 24,
    paddingVertical: 20,
  },
  yearText: { fontSize: 24, fontWeight: '800' },
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
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  monthName: { fontSize: 14, fontWeight: '600' },
  dot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  dotText: { fontSize: 10, fontWeight: '700' },
  eventList: { paddingHorizontal: 16, paddingTop: 24 },
  monthTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  noEvents: { fontSize: 14, textAlign: 'center', paddingVertical: 24 },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
  },
  eventEmoji: { fontSize: 28 },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  eventDate: { fontSize: 12 },
  sportDot: { width: 10, height: 10, borderRadius: 5 },
});
