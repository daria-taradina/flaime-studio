import { useEffect } from 'react';
import styles from './VideoLightbox.module.css';

/**
 * Full-screen modal video player with sound.
 * Only mounts from a click handler so unmuted autoplay is permitted.
 */
export default function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    if (!video) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close video">
          ✕
        </button>

        <video
          className={styles.video}
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
        />

        {video.title && <p className={styles.caption}>{video.title}</p>}
      </div>
    </div>
  );
}
