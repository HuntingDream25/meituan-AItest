import { useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { SwipeDeck } from '../components/SwipeDeck'
import { CLUBS } from '../data/clubs'
import { useApp } from '../context/useApp'
import { rankClubs } from '../lib/match'
import styles from './SwipePage.module.css'

export function SwipePage() {
  const navigate = useNavigate()
  const { profile, favorites, skipped, addFavorite, addSkipped, clearSkipped } = useApp()

  const ranked = useMemo(() => {
    if (!profile) return []
    return rankClubs(CLUBS, profile.weights)
  }, [profile])

  const stack = useMemo(() => {
    const fav = new Set(favorites)
    const skip = new Set(skipped)
    return ranked.filter((r) => !fav.has(r.club.id) && !skip.has(r.club.id))
  }, [ranked, favorites, skipped])

  if (!profile) return <Navigate to="/quiz" replace />

  return (
    <Layout>
      <header className={styles.head}>
        <h1 className={styles.title}>社团滑卡</h1>
        <p className={styles.sub}>
          本轮还剩 <strong>{stack.length}</strong> 张；已心动 {favorites.length} 个
        </p>
      </header>

      <SwipeDeck
        stack={stack}
        weights={profile.weights}
        onSwipeLeft={(id) => addSkipped(id)}
        onSwipeRight={(id) => addFavorite(id)}
        onOpenDetail={(id) => navigate(`/club/${id}`)}
      />

      <div className={styles.tools}>
        <button type="button" className={styles.linkish} onClick={clearSkipped}>
          清空跳过记录（重新逛一轮）
        </button>
        <button
          type="button"
          className={styles.linkish}
          onClick={() => navigate('/saved')}
        >
          打开心动池
        </button>
      </div>
    </Layout>
  )
}
