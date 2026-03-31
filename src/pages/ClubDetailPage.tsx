import { Link, useNavigate, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { getClubById } from '../data/clubs'
import { TAG_LABELS, TIME_LEVEL_LABEL } from '../data/tagLabels'
import { TagChip } from '../components/TagChip'
import { useApp } from '../context/useApp'
import { explainMatch } from '../lib/match'
import styles from './ClubDetailPage.module.css'

export function ClubDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { profile } = useApp()
  const club = id ? getClubById(id) : undefined

  if (!club) {
    return (
      <Layout showNav={false}>
        <p>未找到该社团。</p>
        <Link to="/swipe">返回滑卡</Link>
      </Layout>
    )
  }

  const ai = explainMatch(club, profile?.weights ?? {})

  return (
    <Layout showNav={false}>
      <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
        返回
      </button>

      <div className={styles.cover}>
        <img src={club.cover} alt="" className={styles.coverImg} />
        <div className={styles.coverShade} />
        <h1 className={styles.h1}>{club.name}</h1>
      </div>

      <section className={styles.section}>
        <h2>社团简介</h2>
        <p>{club.summary}</p>
      </section>

      <section className={styles.section}>
        <h2>标签</h2>
        <div className={styles.tags}>
          {club.tags.map((t) => (
            <TagChip key={t}>{TAG_LABELS[t]}</TagChip>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>适合什么样的人</h2>
        <p>{club.suitableFor}</p>
      </section>

      <section className={styles.section}>
        <h2>时间投入</h2>
        <p>{TIME_LEVEL_LABEL[club.timeLevel]}</p>
      </section>

      <section className={styles.section}>
        <h2>招新 / 门槛</h2>
        <p>{club.requirements}</p>
      </section>

      <section className={styles.section}>
        <h2>近期活动</h2>
        <ul className={styles.list}>
          {club.recentActivities.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>学长学姐评价</h2>
        <ul className={styles.reviews}>
          {club.reviews.map((r) => (
            <li key={r.author}>
              <span className={styles.author}>{r.author}</span>
              <span>{r.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.ai}>
        <h2>AI 解释：为什么推荐给你</h2>
        <p>{ai}</p>
      </section>

      <div className={styles.footerLinks}>
        <Link to="/swipe">继续滑卡</Link>
        <Link to="/saved">查看心动池</Link>
      </div>
    </Layout>
  )
}
