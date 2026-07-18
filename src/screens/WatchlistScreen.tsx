import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';
import { EVENTS } from '../data/events';
import { SPORTS } from '../constants/sports';
import { darkTheme, lightTheme } from '../constants/colors';
import { formatDateRange, daysUntil } from '../utils/helpers';
import { useNavigation } from '@react-navigation/native';

export function WatchlistScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme, wishlist, toggleWishlist } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const watchedEvents = EVENTS.filter((e) => wishlist.includes(e.id));

  const renderEvent = ({ item }: { item: typeof EVENTS[0] }) => {
    const sportMeta = SPORTS[item.sport];
    const days = daysUntil(item.startDate);

    return (
      <Pressable
        style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}
        onPress={() => navigation.navigate('Detail', { eventId: item.id })}
      >
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.emoji, { fontSize: 32 }]}>{item.imageEmoji}</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.sport, { color: sportMeta.color }]}>
                {sportMeta.emoji} {sportMeta.label}
              </Text>
            </View>
          </View>

          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {formatDateRange(item.startDate, item.endDate)}
          </Text>

          <View style={styles.footer}>
            <Text style={[styles.venue, { color: colors.textSecondary }]}>
              📍 {item.venue}
            </Text>
            {days > 0 && (
              <Text style={[styles.daysLeft, { color: colors.accent }]}>
                {days} hari
              </Text>
            )}
          </View>
        </View>

        <Pressable
          style={[styles.wishBtn, { backgroundColor: '#ef4444' }]}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(item.id);
          }}
          accessibilityRole="button"
          accessibilityLabel="Hapus dari watchlist"
        >
          <Ionicons name="heart" size={20} color="#fff" />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {watchedEvents.length === 0 ? (
        <View style={[styles.emptyContainer, { paddingTop: insets.top + 32 }]}>
          <Text style={[styles.emptyEmoji]}>❤️</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Belum ada watchlist</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Tambahkan event ke watchlist untuk memantau event favorit kamu
          </Text>
        </View>
      ) : (
        <FlatList
          data={watchedEvents}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: insets.top + 16,
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 16,
          }}
          scrollIndicatorInsets={{ right: 1 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  emoji: {
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  sport: {
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  venue: {
    fontSize: 11,
    flex: 1,
  },
  daysLeft: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 8,
  },
  wishBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
