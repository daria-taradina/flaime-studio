import { useRef, useState } from 'react';
import { isColor } from '../utils/media';
import styles from './FeatureMedia.module.css';

/**
 * Full-bleed image or video block with a centered play button.
 * For images, the play button is just decorative (matches the mockup);
 * for video, clicking it actually toggles playback.
 */
export default function FeatureMedia({ feature, className = '' }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (!feature) return null;
  const { type = 'image', src, poster, alt = '' } = feature;

  const togglePlay = () => {
    if (type !== 'video' || !videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const isPlaceholder = isColor(src);

  return (
    <div className={`${styles.media} ${className}`}>
      {isPlaceholder ? (
        <div
          className={styles.colorBlock}
          style={{ background: src }}
          role="img"
          aria-label={alt}
        />
      ) : type === 'video' ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          muted
          loop
          onClick={togglePlay}
        />
      ) : (
        <img src={src} alt={alt} />
      )}

      {type === 'video' && !isPlaceholder && (
        <button
          type="button"
          className={styles.playBtn}
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? (
            <span className={styles.pauseIcon} />
          ) : (
            <span className={styles.playIcon} />
          )}
        </button>
      )}
    </div>
  );
}