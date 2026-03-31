import type { UserProfile } from '../types/domain'

export const STORAGE = {
  profile: 'club-crush:profile',
  favorites: 'club-crush:favorites',
  skipped: 'club-crush:skipped',
} as const

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function loadProfile(): UserProfile | null {
  return readJson<UserProfile | null>(STORAGE.profile, null)
}

export function saveProfile(profile: UserProfile | null) {
  if (!profile) localStorage.removeItem(STORAGE.profile)
  else localStorage.setItem(STORAGE.profile, JSON.stringify(profile))
}

export function loadFavoriteIds(): string[] {
  return readJson<string[]>(STORAGE.favorites, [])
}

export function saveFavoriteIds(ids: string[]) {
  localStorage.setItem(STORAGE.favorites, JSON.stringify(ids))
}

export function loadSkippedIds(): string[] {
  return readJson<string[]>(STORAGE.skipped, [])
}

export function saveSkippedIds(ids: string[]) {
  localStorage.setItem(STORAGE.skipped, JSON.stringify(ids))
}

export function clearAllProgress() {
  localStorage.removeItem(STORAGE.profile)
  localStorage.removeItem(STORAGE.favorites)
  localStorage.removeItem(STORAGE.skipped)
}
