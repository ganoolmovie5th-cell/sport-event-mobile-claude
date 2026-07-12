import { Sport, SportMeta } from '../types';

export const SPORTS: Record<Sport, SportMeta> = {
  badminton: { label: 'Bulu Tangkis', emoji: '🏸', color: '#10b981' },
  football: { label: 'Sepak Bola', emoji: '⚽', color: '#3b82f6' },
  motogp: { label: 'MotoGP', emoji: '🏍️', color: '#ef4444' },
  running: { label: 'Lari', emoji: '🏃', color: '#f59e0b' },
  cycling: { label: 'Balap Sepeda', emoji: '🚴', color: '#8b5cf6' },
  surfing: { label: 'Selancar', emoji: '🏄', color: '#06b6d4' },
  basketball: { label: 'Basket', emoji: '🏀', color: '#f97316' },
  volleyball: { label: 'Voli', emoji: '🏐', color: '#ec4899' },
  swimming: { label: 'Renang', emoji: '🏊', color: '#0ea5e9' },
  athletics: { label: 'Atletik', emoji: '🏅', color: '#eab308' },
  tennis: { label: 'Tenis', emoji: '🎾', color: '#84cc16' },
  golf: { label: 'Golf', emoji: '⛳', color: '#22c55e' },
  esports: { label: 'Esports', emoji: '🎮', color: '#a855f7' },
  'martial-arts': { label: 'Beladiri', emoji: '🥋', color: '#dc2626' },
  'multi-sport': { label: 'Multi Olahraga', emoji: '🏟️', color: '#6366f1' },
  motorsport: { label: 'Motorsport', emoji: '🏎️', color: '#e11d48' },
};

export const SPORT_LIST = Object.entries(SPORTS).map(([key, value]) => ({
  key: key as Sport,
  ...value,
}));
