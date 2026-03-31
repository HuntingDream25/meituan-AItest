import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="主导航">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        首页
      </NavLink>
      <NavLink
        to="/swipe"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        滑卡
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        心动池
      </NavLink>
    </nav>
  )
}
