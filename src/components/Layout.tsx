import { BottomNav } from './BottomNav'
import styles from './Layout.module.css'

export function Layout({
  children,
  showNav = true,
}: {
  children: React.ReactNode
  showNav?: boolean
}) {
  return (
    <div className={styles.shell}>
      <main className={showNav ? styles.mainWithNav : styles.main}>{children}</main>
      {showNav ? <BottomNav /> : null}
    </div>
  )
}
