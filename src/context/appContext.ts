import { createContext } from 'react'
import type { UserProfile } from '../types/domain'

export type AppContextValue = {
  profile: UserProfile | null
  favorites: string[]
  skipped: string[]
  completeQuiz: (answers: Record<string, string>) => void
  clearProfile: () => void
  addFavorite: (id: string) => void
  addSkipped: (id: string) => void
  removeFavorite: (id: string) => void
  moveFavorite: (index: number, dir: -1 | 1) => void
  clearSkipped: () => void
  resetAll: () => void
}

export const AppContext = createContext<AppContextValue | null>(null)
