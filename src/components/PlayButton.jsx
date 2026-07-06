import styles from './PlayButton.module.css';

/**
 * The circular play/pause button, extracted out of FeatureMedia so any
 * clickable-video card (feature media, video slider, future lightbox
 * triggers) uses the exact same visual instead of each re-implementing it.
 */
export default function PlayButton({ playing = false, onClick, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      aria-label={playing ? 'Pause video' : 'Play video'}
      {...rest}
    >
      {playing ? <span className={styles.pauseIcon} /> : <span className={styles.playIcon} />}
    </button>
  );
}
