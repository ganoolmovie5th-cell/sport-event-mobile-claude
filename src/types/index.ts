export type Sport =
  | 'badminton'
  | 'football'
  | 'motogp'
  | 'running'
  | 'cycling'
  | 'surfing'
  | 'basketball'
  | 'volleyball'
  | 'swimming'
  | 'athletics'
  | 'tennis'
  | 'golf'
  | 'esports'
  | 'martial-arts'
  | 'multi-sport'
  | 'motorsport';

export type EventCategory = 'international' | 'national' | 'regional';
export type EventStatus = 'confirmed' | 'tentative' | 'completed';

export interface SportEvent {
  id: string;
  slug: string;
  title: string;
  sport: Sport;
  category: EventCategory;
  status: EventStatus;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  country: string;
  description: string;
  ticketUrl?: string;
  websiteUrl?: string;
  priceRange?: string;
  imageEmoji: string;
  tags: string[];
  athletes?: string;
  organizer?: string;
}

export interface SportMeta {
  label: string;
  emoji: string;
  color: string;
}

export type ThemeMode = 'dark' | 'light';

export interface AppState {
  wishlist: string[];
  theme: ThemeMode;
  sportFilter: Sport | null;
  yearFilter: number | null;
  statusFilter: EventStatus | null;
  searchQuery: string;
  toggleWishlist: (id: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setSportFilter: (sport: Sport | null) => void;
  setYearFilter: (year: number | null) => void;
  setStatusFilter: (status: EventStatus | null) => void;
  setSearchQuery: (query: string) => void;
}
