import { useRef, useState, useCallback, useEffect } from 'react';
import styles from './DragGallery.module.css';

/**
 * Manual drag/swipe horizontal gallery.
 * Desktop: shows prev/next arrow buttons + drag.
 * Mobile: swipe only (arrows hidden).
 *
 * items: array of { id, bg (css color or full cloudinary URL), title, category }
 */
export default function DragGallery({ items = [] }) {
  const trackRef    = useRef(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const hasMoved    = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 8);
    setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
    return () => t.removeEventListener('scroll', updateArrows);
  }, [updateArrows]);

  /* ── Mouse drag ── */
  const onMouseDown = (e) => {
    isDragging.current = true;
    hasMoved.current   = false;
    startX.current     = e.pageX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) hasMoved.current = true;
    trackRef.current.scrollLeft = scrollStart.current - dx * 1.1;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  /* ── Arrow navigation — scroll by ~80% of track width ── */
  const scrollBy = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const amount = t.clientWidth * 0.8;
    t.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrapper}>
      {/* Arrows — desktop only via CSS */}
      <button
        className={`${styles.arrow} ${styles.arrowPrev} ${!canPrev ? styles.arrowHidden : ''}`}
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowNext} ${!canNext ? styles.arrowHidden : ''}`}
        onClick={() => scrollBy(1)}
        aria-label="Next"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className={styles.track}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className={styles.spacer} aria-hidden="true" />

        {items.map((item) => {
          const isUrl = typeof item.bg === 'string' && item.bg.startsWith('http');
          return (
            <div
              key={item.id}
              className={styles.card}
              style={
                isUrl
                  ? { backgroundImage: `url(${item.bg})` }
                  : { backgroundColor: item.bg || '#1a1a1a' }
              }
            >
              <div className={styles.cardOverlay}>
                <span className={styles.cardCategory}>{item.category}</span>
                <span className={styles.cardTitle}>{item.title}</span>
              </div>
            </div>
          );
        })}

        <div className={styles.spacer} aria-hidden="true" />
      </div>
    </div>
  );
}
