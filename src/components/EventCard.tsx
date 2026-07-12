import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SportEvent } from '../types';
import { SPORTS } from '../constants/sports';
import { Theme } from '../constants/colors';
import { formatDateRange, daysUntil, getStatusLabel } from '../utils/helpers';
import { useAppStore } from '../store/appStore';

interface Props {
  event: SportEvent;
  onPress: () => void;
  colors: Theme;
}

export function EventCard({ event, onPress, colors }: Props) {
  const { wishlist, toggleWishlist } = useAppStore();
  const isWishlisted = wishlist.includes(event.id);
  const sportMeta = SPORTS[event.sport];
  const days = daysUntil(event.startDate);

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Event ${event.title}`}
    >
      <View style={styles.header}>
        <View style={[styles.emojiBox, { backgroundColor: sportMeta.color + '20' }]}>
          <Text style={styles.emoji}>{event.imageEmoji}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={styles.meta}>
            <View style={[styles.sportBadge, { backgroundColor: sportMeta.color + '20' }]}>
              <Text style={[styles.sportText, { color: sportMeta.color }]}>
                {sportMeta.emoji} {sportMeta.label}
              </Text>
            </View>
            <View style={[styles.statusBadge, {
              backgroundColor: event.status === 'confirmed' ? colors.success + '20' :
                event.status === 'tentative' ? colors.warning + '20' : colors.textMuted + '20'
            }]}>
              <Text style={[styles.statusText, {
                color: event.status === 'confirmed' ? colors.success :
                  event.status === 'tentative' ? colors.warning : colors.textMuted
              }]}>
                {getStatusLabel(event.status)}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => toggleWishlist(event.id)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={24}
            color={isWishlisted ? '#ef4444' : colors.textMuted}
          />
        </Pressable>
      </View>
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View style={styles.footerItem}>
          <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            {formatDateRange(event.startDate, event.endDate)}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]} numberOfLines={1}>
            {event.city}
          </Text>
        </View>
        {days > 0 && (
          <View style={[styles.daysChip, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.daysText, { color: colors.primary }]}>
              {days} hari lagi
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  emojiBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 24 },
  headerInfo: { flex: 1, gap: 6 },
  title: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
  meta: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  sportBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  sportText: { fontSize: 11, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 12,
    flexWrap: 'wrap',
  },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontSize: 12 },
  daysChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 'auto' },
  daysText: { fontSize: 11, fontWeight: '700' },
});
