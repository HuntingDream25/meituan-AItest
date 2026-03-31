import styles from './AppDevice.module.css'

export function AppDevice({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.viewport}>
      <div className={styles.device}>
        <div className={styles.inner}>
          <div className={styles.statusBar} aria-hidden>
            <span className={styles.dynamicIsland} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}
