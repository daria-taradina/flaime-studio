import { useRef, useEffect } from 'react';
import styles from './CloudinaryVideo.module.css';

/**
 * Lazy-loads a Cloudinary video only when it enters the viewport.
 */
export default function CloudinaryVideo({
  cloudName,
  publicId,
  poster,
  className = '',
  autoplay = false,
}) {
  const videoRef = useRef(null);

  const base = `https://res.cloudinary.com/${cloudName}/video/upload`;
  const imgBase = `https://res.cloudinary.com/${cloudName}/image/upload`;

  const src = `${base}/f_auto,q_auto/${publicId}`;
  const posterSrc = poster ? `${imgBase}/f_auto,q_auto,w_1200/${poster}` : undefined;

  useEffect(() => {
    if (!videoRef.current || autoplay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.preload = 'auto';
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [autoplay]);

  return (
    <video
      ref={videoRef}
      className={`${styles.video} ${className}`}
      src={src}
      poster={posterSrc}
      preload="none"
      playsInline
      controls={!autoplay}
      autoPlay={autoplay}
      muted={autoplay}
      loop={autoplay}
    />
  );
}
