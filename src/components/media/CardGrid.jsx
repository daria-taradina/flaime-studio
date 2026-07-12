import styles from './CardGrid.module.css';

/**
 * CardGrid — a row of image/placeholder cards with labels underneath.
 *
 * Each item: { id, title, subtitle, src?, alt? }
 * If `src` is missing the card renders as a plain background placeholder.
 */
export default function CardGrid({ items = [], className = '' }) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.thumb}>
            {item.src ? (
              <img src={item.src} alt={item.alt || item.title} />
            ) : null}
          </div>
          <div className={styles.label}>
            <span className={styles.title}>{item.title}</span>
            {item.subtitle && (
              <span className={styles.subtitle}>{item.subtitle}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
