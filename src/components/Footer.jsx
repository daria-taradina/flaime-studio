import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            fl<em>ai</em>me <span className={styles.logoStudio}>studio</span>
          </span>
          <p className={styles.tagline}>Based in Los Angeles. Working worldwide.</p>
        </div>

        <nav className={styles.links}>
          <div className={styles.col}>
            <span className={styles.colLabel}>Navigate</span>
            <Link to="/about">About</Link>
            <Link to="/work">Work</Link>
            <Link to="/contact">Services</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colLabel}>Connect</span>
            <a href="mailto:hello@flaimestudio.com">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} Flaime Studio</span>
      </div>
    </footer>
  );
}
