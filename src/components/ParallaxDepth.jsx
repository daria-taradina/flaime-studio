import { useRef, useState, useCallback } from 'react';
import styles from './ParallaxDepth.module.css';

const LAYERS = [
  { key: 'sky',      depth: 0.05 },
  { key: 'mountains',depth: 0.15 },
  { key: 'rock',     depth: 0.45 },
  { key: 'door',     depth: 0.85 },
  { key: 'frameL',   depth: 1.8 },
  { key: 'frameR',   depth: 1.8 },
];

export default function ParallaxDepth() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x, y });
  }, []);

  const handleLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return (
    <section className={styles.playground}>
      <span className="section-label">Parallax depth idea</span>

      <div
        ref={containerRef}
        className={styles.stage}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {LAYERS.map((layer) => (
          <div
            key={layer.key}
            className={`${styles.layer} ${styles[layer.key]}`}
            style={{
              transform: `translate(${offset.x * layer.depth * -110}px, ${offset.y * layer.depth * -70}px) scale(1.15)`,
            }}
          />
        ))}
      </div>
    </section>
  );
}