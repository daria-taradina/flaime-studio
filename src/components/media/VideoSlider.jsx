import { useRef, useState, useCallback, useEffect } from 'react';
import { backgroundStyle } from '../../utils/media';
import PlayButton from '../ui/PlayButton';
import VideoLightbox from './VideoLightbox';
import styles from './VideoSlider.module.css';

/**
 * Manual drag/swipe horizontal video slider.
 * Two modes: ambient (muted autoplay) and sound-on (lightbox on click).
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

  useEffect(() => {
    if (!hasAmbientVideo) return;
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive, hasAmbientVideo]);

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

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.querySelector(`.${styles.card}`)?.offsetWidth || 1;
    const gap   = 24;
    const idx   = Math.round(track.scrollLeft / (cardW + gap));
    setActiveIdx(Math.min(idx, videos.length - 1));
  }, [videos.length]);

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
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpSnap}
        onMouseLeave={onMouseUp}
      >
        <div className={styles.spacer} aria-hidden="true" />
        {videos.map((item, i) => (
          <VideoCard
            key={item.id}
            item={item}
            isActive={i === activeIdx}
            onOpenLightbox={setOpenVideo}
          />
        ))}
        <div className={styles.spacer} aria-hidden="true" />
      </div>

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
