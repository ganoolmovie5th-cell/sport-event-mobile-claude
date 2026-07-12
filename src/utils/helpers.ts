import { SportEvent, Sport, EventStatus } from '../types';

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateRange(start: string, end: string): string {
  if (start === end) return formatDate(start);
  const s = new Date(start);
  const e = new Date(end);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()} - ${e.getDate()} ${s.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`;
  }
  return `${formatDateShort(start)} - ${formatDateShort(end)}`;
}

export function getYear(dateStr: string): number {
  return new Date(dateStr).getFullYear();
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function filterEvents(
  events: SportEvent[],
  options: {
    sport?: Sport | null;
    year?: number | null;
    status?: EventStatus | null;
    search?: string;
  }
): SportEvent[] {
  let filtered = [...events];

  if (options.sport) {
    filtered = filtered.filter((e) => e.sport === options.sport);
  }
  if (options.year) {
    filtered = filtered.filter((e) => getYear(e.startDate) === options.year);
  }
  if (options.status) {
    filtered = filtered.filter((e) => e.status === options.status);
  }
  if (options.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.sport.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered;
}

export function sortEventsByDate(events: SportEvent[]): SportEvent[] {
  return [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function getUpcomingEvents(events: SportEvent[]): SportEvent[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return events
    .filter((e) => new Date(e.startDate) >= now)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
}

export function getUniqueYears(events: SportEvent[]): number[] {
  const years = new Set(events.map((e) => getYear(e.startDate)));
  return Array.from(years).sort();
}

export function getUniqueCities(events: SportEvent[]): string[] {
  const cities = new Set(events.map((e) => e.city));
  return Array.from(cities).sort();
}

export function getEventsByMonth(
  events: SportEvent[],
  year: number,
  month: number
): SportEvent[] {
  return events.filter((e) => {
    const d = new Date(e.startDate);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

export function getStatusLabel(status: EventStatus): string {
  switch (status) {
    case 'confirmed':
      return 'Dikonfirmasi';
    case 'tentative':
      return 'Tentatif';
    case 'completed':
      return 'Selesai';
  }
}

export function getCategoryLabel(cat: string): string {
  switch (cat) {
    case 'international':
      return 'Internasional';
    case 'national':
      return 'Nasional';
    case 'regional':
      return 'Regional';
    default:
      return cat;
  }
}
