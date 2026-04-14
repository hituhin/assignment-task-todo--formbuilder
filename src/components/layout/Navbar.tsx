import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.brand}>QuestionPro</span>
        <NavLink
          to="/todos"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`}
        >
          Todos
        </NavLink>
        <NavLink
          to="/form-builder"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`}
        >
          Form Builder
        </NavLink>
        <NavLink
          to="/form-preview"
          className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`}
        >
          Form Preview
        </NavLink>
      </div>
    </nav>
  );
}
