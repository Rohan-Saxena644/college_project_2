// ─── HOOKS & ROUTING ────────────────────────────────────────────
// useNavigate  → programmatically send user to a different page
// NavLink      → like <a> but knows if it's the active route
//                (used to highlight the current page in the nav)
// ────────────────────────────────────────────────────────────────
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';   // CSS Module – scoped styles

function NavBar() {
  const navigate = useNavigate();

  // Array of page links – rendered with .map() (JSX list rendering)
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '▦' },
    { to: '/projects',  label: 'Projects',  icon: '◫' },
    { to: '/profile',   label: 'Profile',   icon: '◉' },
  ];

  return (
    <nav className={styles.navbar}>
      {/* Brand – clicking it navigates to dashboard via useNavigate */}
      <div className={styles.brand} onClick={() => navigate('/dashboard')}>
        <span className={styles.logo}>⬡</span>
        <span className={styles.brandName}>TaskFlow</span>
      </div>

      <ul className={styles.navList}>
        {navItems.map(item => (
          <li key={item.to}>
            {/*
              NavLink automatically adds the "active" class when
              the current URL matches the "to" prop.
            */}
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : styles.navLink
              }
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
