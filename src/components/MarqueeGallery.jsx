import { useRef, useEffect, useState } from 'react';
import styles from './MarqueeGallery.module.css';

/**
 * Auto-scrolling horizontal marquee gallery.
 *
 * Props:
 *   items  — array of { id, title, category, bg (css color or cloudinary URL) }
 *   speed  — pixels per second (default 60)
 *   gap    — gap between cards in px (default 16)
 *
 * How it works:
 * - Renders the items list twice side-by-side (seamless loop)
 * - Uses requestAnimationFrame for buttery 60fps scroll
 * - Pauses on hover / touch so users can look
 * - On mobile, also allows touch-drag
 */
export default function MarqueeGallery({ items = [], speed = 60, gap = 16 }) {
  const trackRef = useRef(null);
  const posRef   = useRef(0);
  const rafRef   = useRef(null);
  const pausedRef = useRef(false);
  const lastTsRef = useRef(null);
  const dragRef  = useRef({ active: false, startX: 0, startPos: 0 });
  const [halfWidth, setHalfWidth] = useState(0);

  // Measure the width of one set of items after render
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // half = one full copy
    setHalfWidth(track.scrollWidth / 2);
  }, [items, gap]);

  // Animation loop
  useEffect(() => {
    if (!halfWidth) return;

    const animate = (ts) => {
      if (!pausedRef.current) {
        const delta = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
        lastTsRef.current = ts;
        posRef.current -= speed * delta;
        // Seamless reset: when we've scrolled one full copy, jump back
        if (posRef.current <= -halfWidth) {
          posRef.current += halfWidth;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
      } else {
        lastTsRef.current = ts; // keep ts fresh so no jump on resume
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [halfWidth, speed]);

  // Pause on hover
  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  // Touch drag
  const onTouchStart = (e) => {
    dragRef.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current };
    pausedRef.current = true;
  };
  const onTouchMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.touches[0].clientX - dragRef.current.startX;
    posRef.current = dragRef.current.startPos + dx;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  };
  const onTouchEnd = () => {
    dragRef.current.active = false;
    pausedRef.current = false;
  };

  const doubled = [...items, ...items];

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Fade edges */}
      <div className={styles.fadeLeft}  aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />

      <div
        ref={trackRef}
        className={styles.track}
        style={{ gap: `${gap}px` }}
        aria-label="Work gallery"
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className={styles.card}
            style={
              item.bg?.startsWith('http')
                ? { backgroundImage: `url(${item.bg})` }
                : { backgroundColor: item.bg || '#1e1e1e' }
            }
            aria-hidden={i >= items.length} /* duplicates are decorative */
          >
            <div className={styles.overlay}>
              <span className={styles.cardCategory}>{item.category}</span>
              <span className={styles.cardTitle}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
