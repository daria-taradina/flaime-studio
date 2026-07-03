import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Logo() {
  return (
    <>
      <img
        src="/logo.svg"
        alt="Flaime Studio"
        className={styles.logoImg}
        height="28"
        onError={e => {
          e.currentTarget.style.display = 'none';
          const fb = document.getElementById('logo-fallback');
          if (fb) fb.style.display = 'block';
        }}
      />
      <span id="logo-fallback" className={styles.logoFallback} style={{ display: 'none' }}>
        Flaime Studio
      </span>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="Flaime Studio home">
          <Logo />
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/work"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Work
          </NavLink>
        </nav>

        <Link to="/contact" className={styles.cta}>Get a Quote</Link>
      </div>
    </header>
  );
}
