import { Link } from 'react-router-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import styles from './Footer.module.css';

const REFERENCE_FONT_SIZE = 200; // px — arbitrary large size used only for measuring, not displayed

export default function Footer() {
  const rowRef = useRef(null);
  const measureRef = useRef(null);
  const [fontSize, setFontSize] = useState(REFERENCE_FONT_SIZE);

  useLayoutEffect(() => {
    const fit = () => {
      const row = rowRef.current;
      const measure = measureRef.current;
      if (!row || !measure) return;
      const availableWidth = row.clientWidth;
      const textWidth = measure.scrollWidth; // natural width at REFERENCE_FONT_SIZE
      if (!textWidth) return;
      setFontSize(REFERENCE_FONT_SIZE * (availableWidth / textWidth));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(rowRef.current);
    window.addEventListener('resize', fit);
    // Refit once web fonts finish loading — initial measurement may use a fallback font
    document.fonts?.ready.then(fit);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <p className={styles.location}>Based in Los Angeles. Working worldwide.</p>

        <div className={styles.links}>
          <div className={styles.col}>
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
          </div>
          <div className={styles.col}>
            <Link to="/contact">Contact</Link>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        <span className={styles.copyright}>© {new Date().getFullYear()} Flaime Studio</span>
      </div>

      {/* Full-bleed wordmark — font-size is computed in JS to exactly span this row's width */}
      <div className={styles.bigLogoRow} ref={rowRef}>
        <span className={styles.bigLogo} style={{ fontSize: `${fontSize}px` }}>
          fl<em>ai</em>me studio
        </span>
        <span className={styles.bigLogoMark} aria-hidden="true"></span>
      </div>

      {/* Hidden measuring twin — same text/classes, fixed reference size, off-screen, never visible */}
      <span
        ref={measureRef}
        className={styles.bigLogo}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          top: '-9999px',
          left: '-9999px',
          display: 'inline-block',
          width: 'auto',
          whiteSpace: 'nowrap',
          fontSize: `${REFERENCE_FONT_SIZE}px`,
        }}
      >
        fl<em>ai</em>me studio
      </span>
    </footer>
  );
}