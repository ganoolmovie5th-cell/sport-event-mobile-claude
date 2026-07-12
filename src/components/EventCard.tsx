import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
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
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          borderLeftColor: sportMeta.color,
          ...Platform.select({
            ios: {
              shadowColor: sportMeta.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
            },
            android: { elevation: 4 },
          }),
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Event ${event.title}`}
    >
      {/* Sport emoji watermark */}
      <Text style={[styles.watermark, { color: sportMeta.color }]}>
        {sportMeta.emoji}
      </Text>

      <View style={styles.header}>
        <View style={[styles.emojiBox, { backgroundColor: sportMeta.color + '18' }]}>
          <Text style={styles.emoji}>{event.imageEmoji}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={styles.meta}>
            <View style={[styles.sportBadge, { backgroundColor: sportMeta.color + '15' }]}>
              <Text style={[styles.sportText, { color: sportMeta.color }]}>
                {sportMeta.emoji} {sportMeta.label}
              </Text>
            </View>
            <View style={[
              styles.statusBadge,
              {
                backgroundColor: event.status === 'confirmed'
                  ? colors.success + '15'
                  : event.status === 'tentative'
                    ? colors.warning + '15'
                    : colors.textMuted + '15',
              },
            ]}>
              <View style={[
                styles.statusDot,
                {
                  backgroundColor: event.status === 'confirmed'
                    ? colors.success
                    : event.status === 'tentative'
                      ? colors.warning
                      : colors.textMuted,
                },
              ]} />
              <Text style={[styles.statusText, {
                color: event.status === 'confirmed'
                  ? colors.success
                  : event.status === 'tentative'
                    ? colors.warning
                    : colors.textMuted,
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

      <View style={styles.footer}>
        <View style={[styles.dateBadge, { backgroundColor: colors.primary + '12' }]}>
          <Ionicons name="calendar" size={13} color={colors.primary} />
          <Text style={[styles.dateText, { color: colors.primary }]}>
            {formatDateRange(event.startDate, event.endDate)}
          </Text>
        </View>
        <View style={styles.footerRight}>
          <View style={styles.footerItem}>
            <Ionicons name="location" size={13} color={colors.textSecondary} />
            <Text style={[styles.footerText, { color: colors.textSecondary }]} numberOfLines={1}>
              {event.city}
            </Text>
          </View>
          {days > 0 && (
            <View style={[styles.daysChip, { backgroundColor: colors.accent + '15' }]}>
              <Text style={[styles.daysText, { color: colors.accent }]}>
                {days}d
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderLeftWidth: 3,
    marginHorizontal: 16,
    marginVertical: 7,
    padding: 16,
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    right: -8,
    top: -8,
    fontSize: 80,
    opacity: 0.06,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  emojiBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  headerInfo: { flex: 1, gap: 8 },
  title: { fontSize: 16, fontWeight: '700', lineHeight: 22, letterSpacing: -0.2 },
  meta: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  sportBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sportText: { fontSize: 11, fontWeight: '600' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: { fontSize: 11, fontWeight: '600' },
  footer: {
    marginTop: 14,
    paddingTop: 12,
    gap: 8,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  dateText: { fontSize: 12, fontWeight: '600' },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontSize: 12, fontWeight: '500' },
  daysChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  daysText: { fontSize: 11, fontWeight: '700' },
});
