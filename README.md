# 🏆 Sport Event Mobile — Jadwal Event Olahraga Indonesia 2026-2030

Aplikasi React Native (Expo) untuk melihat jadwal lengkap event olahraga nasional dan internasional di Indonesia dari 2026 hingga 2030.

## Screenshot

| Beranda | Event List | Kalender | Detail |
|---------|-----------|----------|--------|
| 🏠 | 🏆 | 📅 | 📋 |

## Tech Stack

- **React Native** + Expo SDK 54 (managed, Expo Go compatible)
- **TypeScript** strict mode
- **React Navigation 7** — Bottom Tabs + Native Stack
- **Zustand** + AsyncStorage persist (wishlist & theme)
- **@expo/vector-icons** (Ionicons)

## Fitur

- 🏠 **Beranda** — Event terdekat, statistik, filter by sport
- 🏆 **Event** — Daftar semua event dengan pencarian & filter (sport/tahun/status)
- 📅 **Kalender** — Tampilan bulan, navigasi tahun, tap bulan untuk lihat event
- ❤️ **Watchlist** — Daftar event yang di-simpan, sorted by date
- 📋 **Detail** — Info lengkap event, wishlist, share, beli tiket
- ⚙️ **Lainnya** — Dark/Light mode, statistik, venue populer, tentang

## Data

~50 event olahraga meliputi:
- MotoGP Mandalika (2026-2030)
- Indonesia Open & Masters Badminton
- Asian Games 2026 & 2030
- FIFA World Cup 2026
- Olimpiade Los Angeles 2028
- SEA Games 2027
- Jakarta/Bali/Borobudur Marathon
- Tour de Flores
- Liga 1, IBL, Proliga
- PON, Surfing Championship, Esports, dan lainnya

## Menjalankan

```bash
# Install dependencies
npm install

# Jalankan di Expo Go
npx expo start

# Verifikasi TypeScript
npx tsc --noEmit

# Verifikasi bundle
npx expo export --platform android
```

## Struktur

```
src/
├── data/events.ts          # 50 event olahraga
├── types/index.ts          # TypeScript interfaces
├── constants/
│   ├── colors.ts           # Dark & Light theme
│   └── sports.ts           # Sport metadata (emoji, label, color)
├── store/appStore.ts       # Zustand: wishlist, filters, theme
├── utils/helpers.ts        # Date formatting, filtering, sorting
├── components/
│   ├── EventCard.tsx       # Card untuk list
│   ├── FilterChips.tsx     # Sport/year filter chips
│   └── SearchBar.tsx       # Search input
├── screens/
│   ├── HomeScreen.tsx      # Beranda
│   ├── EventsScreen.tsx    # Semua event + search/filter
│   ├── DetailScreen.tsx    # Detail event
│   ├── CalendarScreen.tsx  # Kalender bulanan
│   └── MoreScreen.tsx      # Settings & about
└── navigation/
    └── AppNavigator.tsx    # Tab + Stack navigation
```

## Data Accuracy (Juli 2026)

13 past sport events (dates < 2026-07-21) updated from `status: 'confirmed'` to `status: 'completed'` (commit: Update event statuses to completed for all past events).

## Bahasa

Seluruh UI menggunakan **Bahasa Indonesia**.

## Lisensi

MIT
