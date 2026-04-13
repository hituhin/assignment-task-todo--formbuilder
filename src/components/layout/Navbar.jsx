import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `${styles.link}${isActive ? ` ${styles.active}` : ''}`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <span className={styles.brand}>QuestionPro</span>
        <NavLink to="/todos" className={linkClass}>
          Todos
        </NavLink>
        <NavLink to="/form-builder" className={linkClass}>
          Form Builder
        </NavLink>
        <NavLink to="/form-preview" className={linkClass}>
          Form Preview
        </NavLink>
      </div>
    </nav>
  );
}
