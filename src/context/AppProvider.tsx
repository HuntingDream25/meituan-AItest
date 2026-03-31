import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  clearAllProgress,
  loadFavoriteIds,
  loadProfile,
  loadSkippedIds,
  saveFavoriteIds,
  saveProfile,
  saveSkippedIds,
} from '../lib/storage'
import { buildProfileSummary, mergeWeightsFromAnswers } from '../lib/match'
import { QUIZ_QUESTIONS } from '../data/quiz'
import { AppContext } from './appContext'
import type { UserProfile } from '../types/domain'

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(() => loadProfile())
  const [favorites, setFavorites] = useState<string[]>(() => loadFavoriteIds())
  const [skipped, setSkipped] = useState<string[]>(() => loadSkippedIds())

  useEffect(() => {
    saveProfile(profile)
  }, [profile])

  useEffect(() => {
    saveFavoriteIds(favorites)
  }, [favorites])

  useEffect(() => {
    saveSkippedIds(skipped)
  }, [skipped])

  const completeQuiz = useCallback((answers: Record<string, string>) => {
    const weights = mergeWeightsFromAnswers(answers, QUIZ_QUESTIONS)
    const summary = buildProfileSummary(weights)
    setProfile({ answers, weights, summary })
  }, [])

  const clearProfile = useCallback(() => {
    setProfile(null)
    saveProfile(null)
  }, [])

  const addFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const addSkipped = useCallback((id: string) => {
    setSkipped((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((x) => x !== id))
  }, [])

  const moveFavorite = useCallback((index: number, dir: -1 | 1) => {
    setFavorites((prev) => {
      const j = index + dir
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[index], next[j]] = [next[j], next[index]]
      return next
    })
  }, [])

  const clearSkipped = useCallback(() => {
    setSkipped([])
  }, [])

  const resetAll = useCallback(() => {
    clearAllProgress()
    setProfile(null)
    setFavorites([])
    setSkipped([])
  }, [])

  const value = useMemo(
    () => ({
      profile,
      favorites,
      skipped,
      completeQuiz,
      clearProfile,
      addFavorite,
      addSkipped,
      removeFavorite,
      moveFavorite,
      clearSkipped,
      resetAll,
    }),
    [
      profile,
      favorites,
      skipped,
      completeQuiz,
      clearProfile,
      addFavorite,
      addSkipped,
      removeFavorite,
      moveFavorite,
      clearSkipped,
      resetAll,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
