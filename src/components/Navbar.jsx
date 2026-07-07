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
        fl<em>ai</em>me studio
      </span>
    </>
  );
}

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.active : ''}`;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="Flaime Studio home" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className={styles.cta}>Get a Quote</Link>

        <button
          type="button"
          className={styles.burger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav className={styles.mobileNav} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <Link to="/contact" className={styles.cta} onClick={() => setMenuOpen(false)}>
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}