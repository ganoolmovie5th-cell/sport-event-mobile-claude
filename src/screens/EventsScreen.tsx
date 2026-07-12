import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EVENTS } from '../data/events';
import { SPORT_LIST } from '../constants/sports';
import { darkTheme, lightTheme } from '../constants/colors';
import { useAppStore } from '../store/appStore';
import { filterEvents, sortEventsByDate, getUniqueYears } from '../utils/helpers';
import { EventCard } from '../components/EventCard';
import { SearchBar } from '../components/SearchBar';
import { FilterChips } from '../components/FilterChips';

export function EventsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { theme, sportFilter, yearFilter, searchQuery, setSportFilter, setYearFilter, setSearchQuery } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const years = getUniqueYears(EVENTS);

  const filteredEvents = useMemo(() => {
    const f = filterEvents(EVENTS, {
      sport: sportFilter,
      year: yearFilter,
      search: searchQuery,
    });
    return sortEventsByDate(f);
  }, [sportFilter, yearFilter, searchQuery]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80, paddingTop: 8 }}
        ListHeaderComponent={
          <View>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              colors={colors}
            />
            <FilterChips
              items={years.map((y) => ({ key: String(y), label: String(y) }))}
              selected={yearFilter ? String(yearFilter) : null}
              onSelect={(key) => setYearFilter(key ? Number(key) : null)}
              colors={colors}
            />
            <FilterChips
              items={SPORT_LIST.map((s) => ({ key: s.key, label: s.label, emoji: s.emoji }))}
              selected={sportFilter}
              onSelect={(key) => setSportFilter(key as any)}
              colors={colors}
            />
            <Text style={[styles.resultCount, { color: colors.textSecondary }]}>
              {filteredEvents.length} event ditemukan
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <EventCard
            event={item}
            colors={colors}
            onPress={() => navigation.navigate('Detail', { eventId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              Tidak ada event yang cocok
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultCount: { fontSize: 13, paddingHorizontal: 20, paddingVertical: 4 },
  empty: { alignItems: 'center', padding: 48 },
  emptyText: { fontSize: 15 },
});
