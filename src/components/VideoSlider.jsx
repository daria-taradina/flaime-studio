import { useRef, useState, useCallback, useEffect } from 'react';
import { backgroundStyle } from '../utils/media';
import PlayButton from './PlayButton';
import VideoLightbox from './VideoLightbox';
import styles from './VideoSlider.module.css';

/**
 * Manual drag/swipe horizontal video slider.
 *
 * Two modes per item, picked with `sound`:
 *
 *  - Ambient (default, `sound` omitted/false): muted autoplay-on-scroll
 *    preview, like before. Needs { cloudName, publicId, poster? }.
 *    Browsers never allow this kind of autoplay to have sound - that's
 *    a platform rule, not something to work around.
 *
 *  - Sound-on (`sound: true`): shows a static thumbnail only (bg color
 *    or image, or a video `poster`) with a play button. Clicking opens
 *    a full lightbox player with real controls and audio - unmuted
 *    playback is only allowed right after a genuine click, which this
 *    satisfies since the lightbox only ever mounts from that handler.
 *    Needs { src (playable video url), poster?, bg? }.
 *
 * Before real assets exist, either mode can use a `bg` placeholder
 * (color or image) via the shared backgroundStyle helper.
 */

function VideoCard({ item, isActive, onOpenLightbox }) {
  const videoRef = useRef(null);
  const isSoundCard = !!item.sound;

  const hasAmbientVideo = !isSoundCard && item.cloudName && item.publicId;
  const ambientSrc = hasAmbientVideo
    ? `https://res.cloudinary.com/${item.cloudName}/video/upload/f_auto,q_auto/${item.publicId}`
    : null;
  const ambientPoster = hasAmbientVideo && item.poster
    ? `https://res.cloudinary.com/${item.cloudName}/image/upload/f_auto,q_auto,w_900/${item.poster}`
    : undefined;

  // Ambient videos play/pause themselves based on scroll position.
  useEffect(() => {
    if (!hasAmbientVideo) return;
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive, hasAmbientVideo]);

  // Sound cards (and ambient cards with no video yet) show a static
  // thumbnail - color placeholder, image, or the video's own poster frame.
  const thumbnail = isSoundCard || !hasAmbientVideo
    ? backgroundStyle(item.bg || item.poster)
    : undefined;

  const canOpen = isSoundCard && item.src;

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      style={thumbnail}
      onClick={canOpen ? () => onOpenLightbox({ src: item.src, poster: item.poster, title: item.title }) : undefined}
      role={canOpen ? 'button' : undefined}
      aria-label={canOpen ? `Play ${item.title}` : undefined}
    >
      {hasAmbientVideo && (
        <video
          ref={videoRef}
          className={styles.video}
          src={ambientSrc}
          poster={ambientPoster}
          muted
          playsInline
          loop
          preload="none"
        />
      )}

      {canOpen && <PlayButton className={styles.playBtn} />}

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
  const [openVideo, setOpenVideo] = useState(null);
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
          <VideoCard
            key={item.id}
            item={item}
            isActive={i === activeIdx}
            onOpenLightbox={setOpenVideo}
          />
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

      <VideoLightbox video={openVideo} onClose={() => setOpenVideo(null)} />
    </div>
  );
}
