import { useRef, useState, useCallback, useEffect } from 'react';
import styles from './VideoSlider.module.css';

/**
 * Manual drag/swipe horizontal video slider.
 *
 * Props:
 *   videos — array of:
 *     { id, title, category, cloudName, publicId, poster }
 *     OR for placeholders: { id, title, category, bg }
 *
 * Videos autoplay muted while visible, pause when off-screen.
 * User drags/swipes to scroll — no auto-advance.
 */

function VideoCard({ item, isActive }) {
  const videoRef = useRef(null);

  // Play/pause based on whether this card is the "active" visible one
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {}); // catch autoplay policy rejections silently
    } else {
      v.pause();
    }
  }, [isActive]);

  const hasVideo = item.cloudName && item.publicId;
  const src = hasVideo
    ? `https://res.cloudinary.com/${item.cloudName}/video/upload/f_auto,q_auto/${item.publicId}`
    : null;
  const posterSrc = hasVideo && item.poster
    ? `https://res.cloudinary.com/${item.cloudName}/image/upload/f_auto,q_auto,w_900/${item.poster}`
    : undefined;

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      style={!hasVideo ? { backgroundColor: item.bg || '#1a1a1a' } : undefined}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={src}
          poster={posterSrc}
          muted
          playsInline
          loop
          preload="none"
        />
      ) : (
        /* Placeholder — remove once real Cloudinary IDs are added */
        <div className={styles.placeholder} aria-hidden="true" />
      )}

      <div className={styles.cardOverlay}>
        <span className={styles.cardCategory}>{item.category}</span>
        <h3 className={styles.cardTitle}>{item.title}</h3>
      </div>
    </div>
  );
}

export default function VideoSlider({ videos = [] }) {
  const trackRef   = useRef(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const hasMoved   = useRef(false);

  /* Update active index as user scrolls */
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.querySelector(`.${styles.card}`)?.offsetWidth || 1;
    const gap   = 24; // matches CSS gap
    const idx   = Math.round(track.scrollLeft / (cardW + gap));
    setActiveIdx(Math.min(idx, videos.length - 1));
  }, [videos.length]);

  /* ── Mouse drag ── */
  const onMouseDown = (e) => {
    isDragging.current = true;
    hasMoved.current   = false;
    startX.current     = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
    trackRef.current.style.userSelect = 'none';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x    = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 4) hasMoved.current = true;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      trackRef.current.style.userSelect = '';
    }
  };

  /* Snap to nearest card on mouse-up */
  const onMouseUpSnap = () => {
    onMouseUp();
    snapNearest();
  };

  const snapNearest = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.querySelector(`.${styles.card}`)?.offsetWidth || 1;
    const gap   = 24;
    const idx   = Math.round(track.scrollLeft / (cardW + gap));
    const clamped = Math.max(0, Math.min(idx, videos.length - 1));
    track.scrollTo({ left: clamped * (cardW + gap), behavior: 'smooth' });
    setActiveIdx(clamped);
  }, [videos.length]);

  /* Dot navigation */
  const goTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.querySelector(`.${styles.card}`)?.offsetWidth || 1;
    const gap   = 24;
    track.scrollTo({ left: idx * (cardW + gap), behavior: 'smooth' });
    setActiveIdx(idx);
  };

  return (
    <div className={styles.wrapper}>
      {/* Track */}
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpSnap}
        onMouseLeave={onMouseUp}
      >
        {/* Left padding spacer so first card is inset */}
        <div className={styles.spacer} aria-hidden="true" />

        {videos.map((item, i) => (
          <VideoCard key={item.id} item={item} isActive={i === activeIdx} />
        ))}

        {/* Right padding spacer */}
        <div className={styles.spacer} aria-hidden="true" />
      </div>

      {/* Dot indicators */}
      <div className={styles.dots} role="tablist" aria-label="Video slides">
        {videos.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIdx}
            aria-label={`Slide ${i + 1}`}
            className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
