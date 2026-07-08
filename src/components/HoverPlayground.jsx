import { useRef } from 'react';
import styles from './HoverPlayground.module.css';

function MagneticShape({ color, label }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  function handleLeave() {
    ref.current.style.transform = 'translate(0, 0)';
  }

  return (
    <div className={styles.cell}>
      <div
        ref={ref}
        className={styles.magnetic}
        style={{ background: color }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      />
      <span className={styles.cellLabel}>{label}</span>
    </div>
  );
}

export default function HoverPlayground() {
  return (
    <section className={styles.playground}>
      <span className="section-label">Hover Interaction Ideas</span>

      <div className={styles.grid}>
        <div className={styles.cell}>
          <div className={`${styles.shape} ${styles.scaleRotate}`} style={{ background: '#d85a30' }} />
          <span className={styles.cellLabel}>Scale + rotate</span>
        </div>

        <div className={styles.cell}>
          <div className={styles.tiltWrap}>
            <div className={`${styles.shape} ${styles.tilt}`} style={{ background: '#378add' }} />
          </div>
          <span className={styles.cellLabel}>3D tilt</span>
        </div>

        <div className={styles.cell}>
          <div className={`${styles.shape} ${styles.revealWrap}`}>
            <div className={styles.revealBase} style={{ background: '#639922' }} />
            <div className={styles.revealTop} style={{ background: '#faeeda' }} />
          </div>
          <span className={styles.cellLabel}>Reveal second layer</span>
        </div>

        <MagneticShape color="#d4537e" label="Magnetic follow" />

        <div className={styles.cell}>
          <div className={`${styles.shape} ${styles.colorShift}`} />
          <span className={styles.cellLabel}>Color shift</span>
        </div>

        <div className={styles.cell}>
          <div className={`${styles.shape} ${styles.expandLine}`} style={{ background: '#7f77dd' }} />
          <span className={styles.cellLabel}>Expand from edge</span>
        </div>
      </div>
    </section>
  );
}