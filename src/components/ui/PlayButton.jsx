import styles from './PlayButton.module.css';

/**
 * Circular play/pause button — shared across any clickable video card.
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
