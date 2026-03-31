import { Link, Navigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useApp } from '../context/useApp'
import styles from './QuizResultPage.module.css'

export function QuizResultPage() {
  const { profile } = useApp()
  if (!profile) return <Navigate to="/quiz" replace />

  return (
    <Layout showNav={false}>
      <h1 className={styles.title}>你的新生画像</h1>
      <p className={styles.summary}>{profile.summary}</p>
      <p className={styles.note}>
        接下来进入滑卡：右滑进入心动池，左滑表示暂不感兴趣；需要细节可点「查看详情」。
      </p>
      <Link className={styles.cta} to="/swipe">
        进入社团滑卡
      </Link>
      <Link className={styles.back} to="/">
        返回首页
      </Link>
    </Layout>
  )
}
