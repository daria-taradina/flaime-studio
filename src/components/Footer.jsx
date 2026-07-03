import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.links}>
          <div className={styles.col}>
            <Link to="/work">Work</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className={styles.col}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="mailto:hello@flaimestudio.com">hello@flaimestudio.com</a>
          </div>
        </div>
        <p className={styles.location}>Based in Los Angeles. Working worldwide.</p>
      </div>

      {/* Big footer logo */}
      <div className={styles.bigLogo} aria-hidden="true">
        fla<em>ime</em> studio
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} Flaime Studio</span>
      </div>
    </footer>
  );
}
