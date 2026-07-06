import { useEffect } from 'react';
import styles from './VideoLightbox.module.css';

/**
 * Full-screen modal video player, for videos that should play WITH sound
 * (unlike the muted ambient previews in VideoSlider/DragGallery).
 *
 * Browsers only allow unmuted autoplay right after a genuine user gesture -
 * this only ever mounts as a direct result of a click handler, so that
 * condition is satisfied. `controls` is also on, so if a browser blocks it
 * anyway, the person can just hit play themselves.
 *
 * Usage: keep the "currently open" video in state on the parent, e.g.
 *   const [openVideo, setOpenVideo] = useState(null);
 *   <VideoLightbox video={openVideo} onClose={() => setOpenVideo(null)} />
 * Render nothing (null) when no video is open.
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
