import { useRef, useEffect } from 'react';
import styles from './CloudinaryVideo.module.css';

/**
 * Lazy-loads a Cloudinary video only when it enters the viewport.
 * Accepts a Cloudinary public_id and your cloud_name.
 *
 * Usage:
 *   <CloudinaryVideo
 *     cloudName="your-cloud-name"
 *     publicId="folder/video-name"
 *     poster="folder/poster-image"   // optional Cloudinary image public_id
 *   />
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

  // Build optimised URL: f_auto, q_auto, streaming-friendly
  const src = `${base}/f_auto,q_auto/${publicId}`;
  const posterSrc = poster ? `${imgBase}/f_auto,q_auto,w_1200/${poster}` : undefined;

  useEffect(() => {
    if (!videoRef.current || autoplay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Kick off buffering once in view
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
