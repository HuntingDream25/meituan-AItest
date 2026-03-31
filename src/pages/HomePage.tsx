import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useApp } from '../context/useApp'
import styles from './HomePage.module.css'

export function HomePage() {
  const { profile, resetAll } = useApp()
  const startPath = profile ? '/swipe' : '/quiz'

  return (
    <Layout>
      <header className={styles.hero}>
        <p className={styles.kicker}>新生社团智能匹配</p>
        <h1 className={styles.title}>社团心动局</h1>
        <p className={styles.lead}>
          先用 30 秒画像，再用滑卡快速逛社团：匹配度、理由与时间投入一次看清，把报名从「随缘」变成「有数」。
        </p>
      </header>

      <section className={styles.highlights} aria-label="亮点">
        <article className={styles.card}>
          <h2>30 秒画像</h2>
          <p>单题单屏轻问答，生成可解释的兴趣偏好，而不是冷冰冰的随机推荐。</p>
        </article>
        <article className={styles.card}>
          <h2>滑卡筛选</h2>
          <p>像刷卡片一样完成低成本判断：心动进池，跳过不打扰，详情随时展开。</p>
        </article>
        <article className={styles.card}>
          <h2>决策辅助</h2>
          <p>心动池 + Top3 建议，把「社交 / 技能 / 时间」三条线路讲清楚。</p>
        </article>
      </section>

      <div className={styles.cta}>
        <Link className={styles.primary} to={startPath}>
          {profile ? '继续滑卡匹配' : '立即开始匹配'}
        </Link>
        <Link className={styles.secondary} to="/hot">
          先看看热门社团
        </Link>
      </div>

      {profile ? (
        <p className={styles.resumeHint}>
          已保存你的画像，可直接进入滑卡。
          <Link className={styles.requiz} to="/quiz">
            重新画像测评
          </Link>
        </p>
      ) : null}

      <button type="button" className={styles.ghost} onClick={resetAll}>
        重置本地体验数据
      </button>
    </Layout>
  )
}
