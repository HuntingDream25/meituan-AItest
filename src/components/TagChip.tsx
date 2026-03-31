import styles from './TagChip.module.css'

export function TagChip({ children }: { children: React.ReactNode }) {
  return <span className={styles.chip}>{children}</span>
}
