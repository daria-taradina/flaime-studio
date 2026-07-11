import { useRef, useState } from 'react';
import { isColor } from '../../utils/media';
import PlayButton from '../ui/PlayButton';
import styles from './FeatureMedia.module.css';

/**
 * Full-bleed image or video block with a centered play button.
 * Now uses the shared PlayButton component instead of inline implementation.
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
        <PlayButton
          playing={playing}
          onClick={togglePlay}
          className={styles.playBtn}
        />
      )}
    </div>
  );
}
