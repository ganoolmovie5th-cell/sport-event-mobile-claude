import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Share, Platform } from 'react-native';
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
      {/* Hero area with gradient bg */}
      <View style={[styles.heroCard, { backgroundColor: sportMeta.color + '10' }]}>
        <View style={[styles.heroGradientOverlay, { backgroundColor: sportMeta.color + '08' }]} />
        <Text style={styles.heroEmoji}>{event.imageEmoji}</Text>
        <View style={[styles.sportPill, { backgroundColor: sportMeta.color + '25' }]}>
          <Text style={[styles.sportPillText, { color: sportMeta.color }]}>
            {sportMeta.emoji} {sportMeta.label}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>

        {/* Status badges */}
        <View style={styles.badges}>
          <View style={[styles.badge, {
            backgroundColor: event.status === 'confirmed' ? colors.success + '15' : colors.warning + '15',
          }]}>
            <View style={[styles.badgeDot, {
              backgroundColor: event.status === 'confirmed' ? colors.success : colors.warning,
            }]} />
            <Text style={[styles.badgeText, {
              color: event.status === 'confirmed' ? colors.success : colors.warning,
            }]}>{getStatusLabel(event.status)}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.primary + '12' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{getCategoryLabel(event.category)}</Text>
          </View>
          {days > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.accent + '12' }]}>
              <Text style={[styles.badgeText, { color: colors.accent }]}>{days} hari lagi</Text>
            </View>
          )}
        </View>

        {/* Info Grid 2x2 */}
        <View style={styles.infoGrid}>
          <InfoCard icon="calendar" label="Tanggal" value={formatDateRange(event.startDate, event.endDate)} color={colors.primary} colors={colors} />
          <InfoCard icon="location" label="Venue" value={event.venue} color={colors.accent} colors={colors} />
          <InfoCard icon="pricetag" label="Harga" value={event.priceRange || 'Gratis / TBA'} color={colors.success} colors={colors} />
          <InfoCard icon="people" label="Penyelenggara" value={event.organizer || '-'} color={colors.warning} colors={colors} />
        </View>

        {/* Description card */}
        <View style={[styles.descCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder, borderLeftColor: colors.primary }]}>
          <Text style={[styles.descTitle, { color: colors.text }]}>Tentang Event</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {event.description}
          </Text>
        </View>

        {/* Tags */}
        {event.tags.length > 0 && (
          <View style={styles.tags}>
            {event.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '25' }]}>
                <Text style={[styles.tagText, { color: colors.primaryLight }]}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.heartBtn, {
              backgroundColor: isWishlisted ? '#ef4444' : colors.surface,
              borderColor: isWishlisted ? '#ef4444' : colors.border,
              ...(isWishlisted ? Platform.select({
                ios: { shadowColor: '#ef4444', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
                android: { elevation: 4 },
              }) : {}),
            }]}
            onPress={() => toggleWishlist(event.id)}
            accessibilityRole="button"
            accessibilityLabel={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          >
            <Ionicons name={isWishlisted ? 'heart' : 'heart-outline'} size={22} color={isWishlisted ? '#fff' : colors.text} />
          </Pressable>
          <Pressable
            style={[styles.shareBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel="Bagikan event"
          >
            <Ionicons name="share-outline" size={20} color={colors.text} />
          </Pressable>
        </View>

        {/* Beli Tiket Button - Gradient style */}
        {event.ticketUrl && (
          <Pressable
            style={[styles.ticketBtn, {
              backgroundColor: colors.primary,
              ...Platform.select({
                ios: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12 },
                android: { elevation: 8 },
              }),
            }]}
            onPress={() => Linking.openURL(event.ticketUrl!)}
            accessibilityRole="button"
            accessibilityLabel="Beli tiket"
          >
            <Ionicons name="ticket" size={22} color="#fff" />
            <Text style={styles.ticketText}>Beli Tiket</Text>
            <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.7)" />
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
      </View>
    </ScrollView>
  );
}

function InfoCard({ icon, label, value, color, colors }: { icon: any; label: string; value: string; color: string; colors: any }) {
  return (
    <View style={[infoCardStyles.card, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
      <View style={[infoCardStyles.iconWrap, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={[infoCardStyles.label, { color: colors.textMuted }]}>{label}</Text>
      <Text style={[infoCardStyles.value, { color: colors.text }]} numberOfLines={2}>{value}</Text>
    </View>
  );
}

const infoCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  label: { fontSize: 11, fontWeight: '500' },
  value: { fontSize: 13, fontWeight: '700', lineHeight: 18 },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorText: { fontSize: 16, textAlign: 'center', marginTop: 48 },
  heroCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 14,
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroEmoji: { fontSize: 72 },
  sportPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  sportPillText: { fontSize: 14, fontWeight: '700' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '800', lineHeight: 32, marginBottom: 14, letterSpacing: -0.5 },
  badges: { flexDirection: 'row', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  descCard: {
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  descTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  description: { fontSize: 14, lineHeight: 22 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  heartBtn: {
    width: 50,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    width: 50,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 18,
    marginBottom: 12,
  },
  ticketText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
  websiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  websiteBtnText: { fontSize: 15, fontWeight: '700' },
});
