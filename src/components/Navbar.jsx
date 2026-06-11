import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

/**
 * Logo — drop logo.svg into /public/ to use it.
 * Text fallback shows if file isn't there yet.
 */
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
          document.getElementById('logo-fallback').style.display = 'block';
        }}
      />
      <span id="logo-fallback" className={styles.logoFallback} style={{ display: 'none' }}>
        Flaime Studio
      </span>
    </>
  );
}

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/work', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed header bar ── */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuIsOpen : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} aria-label="Flaime Studio home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_ITEMS.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className={styles.cta}>Get Quote</Link>

          {/* Hamburger — mobile only */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer — outside header so inset:0 = full viewport ── */}
      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className={styles.drawerCta}
            onClick={() => setMenuOpen(false)}
          >
            Get Quote
          </Link>
        </nav>
      </div>
    </>
  );
}
