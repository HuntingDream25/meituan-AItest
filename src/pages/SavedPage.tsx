import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { CLUBS } from '../data/clubs'
import { TAG_LABELS } from '../data/tagLabels'
import { useApp } from '../context/useApp'
import {
  explainMatch,
  getDecisionBullets,
  getFinalPicks,
  rankClubs,
} from '../lib/match'
import styles from './SavedPage.module.css'

export function SavedPage() {
  const navigate = useNavigate()
  const { profile, favorites, removeFavorite, moveFavorite } = useApp()

  const ranked = rankClubs(CLUBS, profile?.weights ?? {})
  const byId = new Map(ranked.map((r) => [r.club.id, r]))

  if (!profile) return <Navigate to="/quiz" replace />

  const rows = favorites
    .map((id) => {
      const r = byId.get(id)
      return r ? { ...r } : null
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  const top3 = getFinalPicks(favorites, ranked)
  const bullets = getDecisionBullets(top3)

  return (
    <Layout>
      <header className={styles.head}>
        <h1 className={styles.title}>心动池</h1>
        <p className={styles.sub}>可调整顺序；点进详情再决定要不要报名。</p>
      </header>

      {rows.length === 0 ? (
        <p className={styles.empty}>
          还没有心动的社团，先去{' '}
          <Link to="/swipe" className={styles.inlineLink}>
            滑卡逛逛
          </Link>
          吧。
        </p>
      ) : (
        <ul className={styles.list}>
          {rows.map((r, index) => (
            <li key={r.club.id} className={styles.item}>
              <button
                type="button"
                className={styles.mainHit}
                onClick={() => navigate(`/club/${r.club.id}`)}
              >
                <span className={styles.name}>{r.club.name}</span>
                <span className={styles.match}>匹配度 {r.percent}%</span>
                <span className={styles.reason}>{explainMatch(r.club, profile.weights)}</span>
              </button>
              <div className={styles.rowTools}>
                <span className={styles.tagMini}>
                  {r.club.tags.slice(0, 3).map((t) => TAG_LABELS[t]).join(' / ')}
                </span>
                <div className={styles.reorder}>
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveFavorite(index, -1)}
                  >
                    上移
                  </button>
                  <button
                    type="button"
                    disabled={index === rows.length - 1}
                    onClick={() => moveFavorite(index, 1)}
                  >
                    下移
                  </button>
                  <button type="button" onClick={() => removeFavorite(r.club.id)}>
                    移除
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <section className={styles.top3} aria-label="最终推荐">
        <h2 className={styles.top3Title}>最终推荐 Top 3</h2>
        <p className={styles.top3Hint}>
          优先从心动池排序；不足时会自动补充高分社团供你对照（标注「补充」）。
        </p>
        <ol className={styles.top3List}>
          {top3.map((p, i) => (
            <li key={p.club.id} className={styles.top3Item}>
              <div className={styles.top3Head}>
                <span className={styles.badge}>{i + 1}</span>
                <button
                  type="button"
                  className={styles.top3Name}
                  onClick={() => navigate(`/club/${p.club.id}`)}
                >
                  {p.club.name}
                </button>
                {p.source === 'filled' ? <span className={styles.pill}>补充</span> : null}
              </div>
              <p className={styles.top3Reason}>{explainMatch(p.club, profile.weights)}</p>
            </li>
          ))}
        </ol>
        {top3.length === 0 ? (
          <p className={styles.top3Empty}>暂无推荐，先完成画像并收藏至少一个社团。</p>
        ) : (
          <div className={styles.bullets}>
            <h3>决策建议</h3>
            <ul>
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </Layout>
  )
}
