import { Link } from 'react-router-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import { NAV_ITEMS, SOCIAL_LINKS } from '../../data/navigation';
import { CONTACT_INFO } from '../../data/contact';
import styles from './Footer.module.css';

const REFERENCE_FONT_SIZE = 200;

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
      const textWidth = measure.scrollWidth;
      if (!textWidth) return;
      setFontSize(REFERENCE_FONT_SIZE * (availableWidth / textWidth));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(rowRef.current);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <p className={styles.location}>Based in {CONTACT_INFO.location}. {CONTACT_INFO.locationNote}.</p>

        <div className={styles.links}>
          <div className={styles.col}>
            {NAV_ITEMS.filter(i => i.to !== '/').map(item => (
              <Link key={item.to} to={item.to}>{item.label}</Link>
            ))}
          </div>
          <div className={styles.col}>
            {SOCIAL_LINKS.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            ))}
          </div>
        </div>

        <span className={styles.copyright}>© {new Date().getFullYear()} Flaime Studio</span>
      </div>

      <div className={styles.bigLogoRow} ref={rowRef}>
        <span className={styles.bigLogo} style={{ fontSize: `${fontSize}px` }}>
          fl<em>ai</em>me studio
        </span>
        <span className={styles.bigLogoMark} aria-hidden="true"></span>
      </div>

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
