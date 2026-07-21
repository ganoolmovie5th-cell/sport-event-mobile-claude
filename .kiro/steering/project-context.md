# Sport Event Mobile — Project Context

## Overview
Aplikasi React Native (Expo) untuk jadwal event olahraga Indonesia 2026-2030.
- **Repo:** ganoolmovie5th-cell/sport-event-mobile-claude
- **Branch:** `main` (push langsung)
- **Stack:** React Native + Expo SDK 54 (managed, Expo Go compatible) + TypeScript strict

---

## Aturan Penting

- **Harus jalan di Expo Go SDK 54** — jangan native module yang butuh prebuild
- Tambah paket selalu via `npx expo install <paket>`
- Push langsung ke `main`, tanpa PR
- UI dalam Bahasa Indonesia

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Bahasa | TypeScript (strict) |
| Navigasi | React Navigation 7 (bottom tabs + native stack) |
| State | Zustand 5 + persist (AsyncStorage) |
| Icons | @expo/vector-icons (Ionicons) |

---

## Design System

| Token | Dark | Light |
|---|---|---|
| background | #0f0a1e | #f8fafc |
| surface | #1a1230 | #ffffff |
| primary | #7c3aed | #7c3aed |
| accent | #06b6d4 | #0891b2 |
| text | #f8fafc | #0f172a |
| textSecondary | #94a3b8 | #475569 |

---

## Data

~50 event olahraga 2026-2030 di `src/data/events.ts`:
- MotoGP Mandalika (annual)
- Indonesia Open/Masters Badminton
- Asian Games 2026 & 2030
- FIFA World Cup 2026
- Olimpiade 2028
- SEA Games 2027
- Marathon: Jakarta, Bali, Borobudur
- Tour de Flores, Surfing, Liga domestik, dll.

---

## Fitur

1. **Beranda** — Featured upcoming, stats, filter chips
2. **Event** — FlatList + search + filter (sport/year/status)
3. **Detail** — Full info, wishlist, share, beli tiket (Linking.openURL)
4. **Kalender** — Grid bulan, navigasi tahun, tap untuk event
5. **Lainnya** — Dark/Light toggle, venue list, about

---

## Verifikasi (WAJIB)

```bash
npx tsc --noEmit                    # 0 error
npx expo export --platform android  # bundle sukses
```

---

## Commit Convention

```
<type>: <deskripsi>
```
Type: `feat` `fix` `refactor` `chore` `docs`

---

## Data Accuracy (Juli 2026)

13 past sport events (dates < 2026-07-21) updated from `status: 'confirmed'` to `status: 'completed'`:
- Indonesia Masters 2026 (01-21)
- IBL Indonesia 2026 (01-10)
- Proliga Voli 2026 (02-14)
- Kejuaraan Renang Indonesia (04-10)
- Krui Pro WSL (04-14)
- Indonesia Surfing Championship (05-05)
- Bali Marathon (05-17)
- Kejuaraan Atletik Nasional (05-20)
- Indonesia Open (06-10)
- Bintan Triathlon (06-21)
- Tour de Flores (07-14)
- FIFA World Cup (07-19)

Timestamp: 2026-07-21 (sync dengan current date). Sebelumnya 13 event ini masih marked 'confirmed' padahal dates sudah lewat.

**Commit:** `Update event statuses to completed for all past events`
