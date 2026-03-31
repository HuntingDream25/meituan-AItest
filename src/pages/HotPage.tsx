import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { CLUBS } from '../data/clubs'
import { TAG_LABELS } from '../data/tagLabels'
import styles from './HotPage.module.css'

export function HotPage() {
  const navigate = useNavigate()
  const list = CLUBS.filter((c) => c.popular)

  return (
    <Layout>
      <header className={styles.head}>
        <h1 className={styles.title}>热门社团</h1>
        <p className={styles.sub}>快速围观高讨论度社团，仍可回到滑卡做个性化筛选。</p>
      </header>

      <ul className={styles.list}>
        {list.map((c) => (
          <li key={c.id} className={styles.item}>
            <button
              type="button"
              className={styles.row}
              onClick={() => navigate(`/club/${c.id}`)}
            >
              <img src={c.cover} alt="" className={styles.thumb} />
              <div className={styles.body}>
                <span className={styles.name}>{c.name}</span>
                <span className={styles.meta}>
                  {c.tags.slice(0, 3).map((t) => TAG_LABELS[t]).join(' · ')}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <Link to="/swipe">去滑卡匹配</Link>
        <Link to="/">回首页</Link>
      </div>
    </Layout>
  )
}
