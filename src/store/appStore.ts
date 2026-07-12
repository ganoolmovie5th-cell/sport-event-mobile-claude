import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Sport, EventStatus, ThemeMode } from '../types';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      wishlist: [],
      theme: 'dark' as ThemeMode,
      sportFilter: null,
      yearFilter: null,
      statusFilter: null,
      searchQuery: '',
      toggleWishlist: (id: string) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((item) => item !== id)
            : [...state.wishlist, id],
        })),
      setTheme: (theme: ThemeMode) => set({ theme }),
      setSportFilter: (sport: Sport | null) => set({ sportFilter: sport }),
      setYearFilter: (year: number | null) => set({ yearFilter: year }),
      setStatusFilter: (status: EventStatus | null) =>
        set({ statusFilter: status }),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: 'sport-event-app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        wishlist: state.wishlist,
        theme: state.theme,
      }),
    }
  )
);
