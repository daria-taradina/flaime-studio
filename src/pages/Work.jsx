import { useState, useRef, useEffect, useCallback } from 'react';
import FadeIn from '../components/FadeIn';
import styles from './Work.module.css';

/**
 * Project data shape:
 * {
 *   id, title, category, size ('large'|'medium'|'small'),
 *   type: 'image' | 'video',
 *   bg: '#hex'  (placeholder colour until real media is added)
 *   // for real media:
 *   // cloudName: 'your-cloud', publicId: 'folder/file', poster: 'folder/thumb'
 * }
 *
 * 'large'  → spans 2 cols, taller — used for featured/hero project
 * 'medium' → standard portrait card
 * 'small'  → landscape, shorter — good for variety
 */
const PROJECTS = [
  { id: 1,  title: 'Brand Identity — Linya',      category: 'Visual Identity',      size: 'large',  type: 'image', bg: '#1c1812' },
  { id: 2,  title: 'AI Campaign — Haze',           category: 'AI Generated Content', size: 'medium', type: 'video', bg: '#091a18' },
  { id: 3,  title: 'Social Series — Orbit',        category: 'Social Media Content', size: 'medium', type: 'image', bg: '#12091a' },
  { id: 4,  title: 'Packaging — Creme',            category: 'Marketing Materials',  size: 'small',  type: 'image', bg: '#1a1410' },
  { id: 5,  title: 'Creative Direction — Voix',    category: 'Creative Concept',     size: 'small',  type: 'image', bg: '#0a1a0a' },
  { id: 6,  title: 'AI Editorial Series',          category: 'AI Generated Content', size: 'medium', type: 'video', bg: '#1a0a12' },
  { id: 7,  title: 'Visual Identity — Sable',      category: 'Visual Identity',      size: 'medium', type: 'image', bg: '#10181c' },
  { id: 8,  title: 'Product Film — Aura',          category: 'AI Generated Content', size: 'large',  type: 'video', bg: '#180f0a' },
  { id: 9,  title: 'Social Campaign — Bloom',      category: 'Social Media Content', size: 'small',  type: 'image', bg: '#0f180f' },
  { id: 10, title: 'Brand Film — Noir',            category: 'Creative Concept',     size: 'medium', type: 'video', bg: '#12121a' },
];

const CATEGORIES = [
  'All',
  'Visual Identity',
  'AI Generated Content',
  'Social Media Content',
  'Marketing Materials',
  'Creative Concept',
];

/** Card with hover-autoplay for video type */
function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const hasMedia = project.cloudName && project.publicId;
  const isVideo  = project.type === 'video';

  const src = hasMedia
    ? isVideo
      ? `https://res.cloudinary.com/${project.cloudName}/video/upload/f_auto,q_auto/${project.publicId}`
      : `https://res.cloudinary.com/${project.cloudName}/image/upload/f_auto,q_auto,w_900/${project.publicId}`
    : null;

  const posterSrc = hasMedia && project.poster
    ? `https://res.cloudinary.com/${project.cloudName}/image/upload/f_auto,q_auto,w_900/${project.poster}`
    : undefined;

  const onEnter = useCallback(() => {
    setHovered(true);
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVideo]);

  const onLeave = useCallback(() => {
    setHovered(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isVideo]);

  return (
    <article
      className={`${styles.card} ${styles[`card--${project.size}`]}`}
      style={!hasMedia ? { backgroundColor: project.bg } : undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Media */}
      {hasMedia && isVideo && (
        <video
          ref={videoRef}
          className={styles.cardVideo}
          src={src}
          poster={posterSrc}
          muted playsInline loop preload="none"
        />
      )}
      {hasMedia && !isVideo && (
        <img
          className={styles.cardImg}
          src={src}
          alt={project.title}
          loading="lazy"
        />
      )}

      {/* Video badge */}
      {isVideo && (
        <div className={`${styles.videoBadge} ${hovered ? styles.videoBadgeHidden : ''}`}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <path d="M1 1l10 6-10 6V1z"/>
          </svg>
        </div>
      )}

      {/* Info overlay — slides up on hover */}
      <div className={`${styles.cardOverlay} ${hovered ? styles.cardOverlayVisible : ''}`}>
        <span className={styles.cardCategory}>{project.category}</span>
        <h2 className={styles.cardTitle}>{project.title}</h2>
      </div>
    </article>
  );
}

export default function Work() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active);

  // Featured = first large item in filtered set, rest go to grid
  const featured = filtered.find(p => p.size === 'large');
  const rest      = filtered.filter(p => p !== featured);

  return (
    <main className={styles.page}>
      <div className="container">

        {/* ── Header ── */}
        <FadeIn>
          <div className={styles.header}>
            <span className="section-label">Portfolio</span>
            <h1 className={styles.title}>Our Work</h1>
          </div>
        </FadeIn>

        {/* ── Filter tabs ── */}
        <FadeIn delay={0.1}>
          <div className={styles.filters} role="tablist" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── Featured hero card ── */}
        {featured && (
          <FadeIn className={styles.featuredWrap}>
            <ProjectCard project={featured} />
          </FadeIn>
        )}

        {/* ── Masonry grid ── */}
        {rest.length > 0 && (
          <div className={styles.grid}>
            {rest.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.05}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <FadeIn>
            <p className={styles.empty}>No projects in this category yet.</p>
          </FadeIn>
        )}

      </div>
    </main>
  );
}
