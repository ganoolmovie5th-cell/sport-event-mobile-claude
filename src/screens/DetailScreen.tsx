import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { EVENTS } from '../data/events';
import { SPORTS } from '../constants/sports';
import { darkTheme, lightTheme } from '../constants/colors';
import { useAppStore } from '../store/appStore';
import { formatDateRange, daysUntil, getStatusLabel, getCategoryLabel } from '../utils/helpers';

export function DetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { theme, wishlist, toggleWishlist } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const event = EVENTS.find((e) => e.id === route.params?.eventId);
  if (!event) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Event tidak ditemukan</Text>
      </View>
    );
  }

  const sportMeta = SPORTS[event.sport];
  const isWishlisted = wishlist.includes(event.id);
  const days = daysUntil(event.startDate);

  const handleShare = async () => {
    await Share.share({
      message: `${event.title}\n${formatDateRange(event.startDate, event.endDate)}\n${event.venue}, ${event.city}`,
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
    >
      <View style={[styles.heroCard, { backgroundColor: sportMeta.color + '15' }]}>
        <Text style={styles.heroEmoji}>{event.imageEmoji}</Text>
        <View style={[styles.sportPill, { backgroundColor: sportMeta.color + '30' }]}>
          <Text style={[styles.sportPillText, { color: sportMeta.color }]}>
            {sportMeta.emoji} {sportMeta.label}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>

        <View style={styles.badges}>
          <View style={[styles.badge, {
            backgroundColor: event.status === 'confirmed' ? colors.success + '20' : colors.warning + '20'
          }]}>
            <Text style={[styles.badgeText, {
              color: event.status === 'confirmed' ? colors.success : colors.warning
            }]}>{getStatusLabel(event.status)}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{getCategoryLabel(event.category)}</Text>
          </View>
          {days > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.accent + '20' }]}>
              <Text style={[styles.badgeText, { color: colors.accent }]}>{days} hari lagi</Text>
            </View>
          )}
        </View>

        <View style={[styles.infoSection, { borderColor: colors.border }]}>
          <InfoRow icon="calendar-outline" label="Tanggal" value={formatDateRange(event.startDate, event.endDate)} colors={colors} />
          <InfoRow icon="location-outline" label="Venue" value={event.venue} colors={colors} />
          <InfoRow icon="business-outline" label="Kota" value={`${event.city}, ${event.country}`} colors={colors} />
          {event.organizer && <InfoRow icon="people-outline" label="Penyelenggara" value={event.organizer} colors={colors} />}
          {event.athletes && <InfoRow icon="trophy-outline" label="Atlet" value={event.athletes} colors={colors} />}
          {event.priceRange && <InfoRow icon="pricetag-outline" label="Harga Tiket" value={event.priceRange} colors={colors} />}
        </View>

        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {event.description}
        </Text>

        <View style={styles.actions}>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: isWishlisted ? '#ef4444' : colors.surface, borderColor: colors.border }]}
            onPress={() => toggleWishlist(event.id)}
            accessibilityRole="button"
            accessibilityLabel={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          >
            <Ionicons name={isWishlisted ? 'heart' : 'heart-outline'} size={20} color={isWishlisted ? '#fff' : colors.text} />
            <Text style={[styles.actionText, { color: isWishlisted ? '#fff' : colors.text }]}>
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel="Bagikan event"
          >
            <Ionicons name="share-outline" size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Bagikan</Text>
          </Pressable>
        </View>

        {event.ticketUrl && (
          <Pressable
            style={[styles.ticketBtn, { backgroundColor: colors.primary }]}
            onPress={() => Linking.openURL(event.ticketUrl!)}
            accessibilityRole="button"
            accessibilityLabel="Beli tiket"
          >
            <Ionicons name="ticket-outline" size={22} color="#fff" />
            <Text style={styles.ticketText}>Beli Tiket</Text>
          </Pressable>
        )}

        {event.websiteUrl && (
          <Pressable
            style={[styles.websiteBtn, { borderColor: colors.primary }]}
            onPress={() => Linking.openURL(event.websiteUrl!)}
            accessibilityRole="button"
            accessibilityLabel="Kunjungi website"
          >
            <Ionicons name="globe-outline" size={20} color={colors.primary} />
            <Text style={[styles.websiteBtnText, { color: colors.primary }]}>Website Resmi</Text>
          </Pressable>
        )}

        {event.tags.length > 0 && (
          <View style={styles.tags}>
            {event.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.surfaceLight }]}>
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value, colors }: { icon: any; label: string; value: string; colors: any }) {
  return (
    <View style={infoStyles.row}>
      <Ionicons name={icon} size={18} color={colors.textMuted} style={infoStyles.icon} />
      <View style={infoStyles.textCol}>
        <Text style={[infoStyles.label, { color: colors.textMuted }]}>{label}</Text>
        <Text style={[infoStyles.value, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10 },
  icon: { marginRight: 12, marginTop: 2 },
  textCol: { flex: 1 },
  label: { fontSize: 12, fontWeight: '500', marginBottom: 2 },
  value: { fontSize: 15, fontWeight: '600' },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorText: { fontSize: 16, textAlign: 'center', marginTop: 48 },
  heroCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  heroEmoji: { fontSize: 64 },
  sportPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  sportPillText: { fontSize: 14, fontWeight: '600' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '800', lineHeight: 32, marginBottom: 12 },
  badges: { flexDirection: 'row', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  infoSection: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 20 },
  description: { fontSize: 15, lineHeight: 24, marginBottom: 24 },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionText: { fontSize: 14, fontWeight: '600' },
  ticketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  ticketText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  websiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  websiteBtnText: { fontSize: 15, fontWeight: '600' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  tagText: { fontSize: 12 },
});
