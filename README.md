# Sport Event Mobile

Aplikasi mobile jadwal event olahraga nasional dan internasional di Indonesia 2026-2030. Versi mobile dari SportEvent ID web.

**Tech Stack:** React Native · Expo SDK 54 · TypeScript · React Navigation 7 · Zustand

## Features

- 50+ event olahraga (MotoGP, Badminton, Asian Games, Marathon, Liga 1, dll)
- Beranda (event terdekat, statistik, filter by sport)
- Daftar event (pencarian & filter sport/tahun/status)
- Kalender bulanan (navigasi tahun, tap bulan)
- Watchlist (simpan event favorit)
- Detail event (info lengkap, share, beli tiket)
- Dark/Light mode
- Bahasa Indonesia

## Getting Started

```bash
npm install
npx expo start
```

Scan QR code dengan Expo Go.

## Project Structure

```
src/
  data/events.ts          → 50 event olahraga
  types/index.ts          → TypeScript interfaces
  constants/
    colors.ts                 Dark & Light theme
    sports.ts                 Sport metadata (emoji, label, color)
  store/appStore.ts       → Zustand (wishlist, filters, theme)
  utils/helpers.ts        → Date formatting, filtering, sorting
  components/             → EventCard, FilterChips, SearchBar
  screens/
    HomeScreen.tsx            Beranda
    EventsScreen.tsx          Semua event + search/filter
    DetailScreen.tsx          Detail event
    CalendarScreen.tsx        Kalender bulanan
    MoreScreen.tsx            Settings & about
  navigation/
    AppNavigator.tsx          Tab + Stack navigation
```

## Testing

```bash
npx tsc --noEmit
npx expo export --platform android
```

## License

MIT
