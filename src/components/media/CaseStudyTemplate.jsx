import Section from '../layout/Section';
import FadeIn from '../ui/FadeIn';
import FeatureMedia from './FeatureMedia';
import { isColor } from '../../utils/media';
import styles from './CaseStudyTemplate.module.css';

/**
 * Renders a full case study page from a project data object.
 * One template, any number of projects — just add to data/projects.js.
 */
export default function CaseStudyTemplate({ project }) {
  if (!project) return null;

  const { title, tagline, heroImage, heroImageAlt, summaryHeading, breakdown, gallery, feature } = project;

  return (
    <main>
      {/* ── HEADER ── */}
      <Section theme="dark" className={styles.header}>
        <div className={styles.headerRow}>
          <FadeIn>
            <h1 className={styles.title}>{title}</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className={styles.tagline}>{tagline}</p>
          </FadeIn>
        </div>
      </Section>

      {/* ── HERO IMAGE (full-bleed) ── */}
      <Section theme="dark" container={false}>
        <FadeIn>
          {isColor(heroImage) ? (
            <div
              className={styles.heroImage}
              style={{ background: heroImage }}
              role="img"
              aria-label={heroImageAlt}
            />
          ) : (
            <img className={styles.heroImage} src={heroImage} alt={heroImageAlt} />
          )}
        </FadeIn>
      </Section>

      {/* ── SUMMARY + BREAKDOWN ── */}
      <Section theme="dark" className={styles.summary}>
        <FadeIn>
          <h2 className={styles.summaryHeading}>{summaryHeading}</h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={styles.breakdownTimeline}>
            <div className={styles.breakdownLine} />
            {breakdown.map((b) => (
              <div key={b.label} className={styles.breakdownStep}>
                <div className={styles.breakdownDot} />
                <span className={`section-label ${styles.breakdownLabel}`}>{b.label}</span>
                <div className={styles.breakdownCard}>
                  <h3 className={styles.breakdownCardTitle}>{b.title}</h3>
                  <p className={styles.breakdownCardBody}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ── GALLERY (full-bleed) ── */}
      {gallery?.length > 0 && (
        <Section theme="dark" container={false} className={styles.gallerySection}>
          <div className={styles.galleryGrid}>
            {gallery.map((img, i) => (
              <div key={i} className={styles.galleryItem}>
                {isColor(img.src) ? (
                  <div
                    className={styles.galleryColor}
                    style={{ background: img.src }}
                    role="img"
                    aria-label={img.alt}
                  />
                ) : (
                  <img src={img.src} alt={img.alt} />
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── FEATURE MEDIA (full-bleed) ── */}
      {feature && (
        <Section theme="dark" container={false}>
          <FadeIn>
            <FeatureMedia feature={feature} />
          </FadeIn>
        </Section>
      )}
    </main>
  );
}
