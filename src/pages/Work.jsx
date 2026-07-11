import { Link } from 'react-router-dom';
import FadeIn from '../components/ui/FadeIn';
import DragGallery from '../components/media/DragGallery';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import { backgroundStyle } from '../utils/media';
import { WORK_HEADER, SELECTED_WORKS, CATEGORIES, PROJECTS } from '../data/work';
import { CTA } from '../data/home';
import styles from './Work.module.css';

function SelectedWorkCard({ work }) {
  return (
    <Link to={`/work/${work.slug}`} className={styles.selectedCard}>
      <div className={styles.selectedImg} style={backgroundStyle(work.bg)} />
      <div className={styles.selectedText}>
        <span className={styles.selectedCategory}>{work.category}</span>
        <h3 className={styles.selectedTitle}>{work.title}</h3>
      </div>
    </Link>
  );
}

function CategorySection({ label, items }) {
  if (!items.length) return null;
  return (
    <Section theme="dark" container={false} className={styles.categorySection}>
      <div className={`container ${styles.categoryHeader}`}>
        <FadeIn>
          <span className="section-label">{label}</span>
        </FadeIn>
      </div>
      <FadeIn>
        <DragGallery items={items} />
      </FadeIn>
    </Section>
  );
}

export default function Work() {
  return (
    <main>
      <Section theme="dark" className={styles.page}>
        <FadeIn>
          <div className={styles.header}>
            <h1 className={styles.title}>{WORK_HEADER.title}</h1>
            <p className={styles.desc}>{WORK_HEADER.description}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={styles.selectedGrid}>
            {SELECTED_WORKS.map((w) => <SelectedWorkCard key={w.id} work={w} />)}
          </div>
        </FadeIn>
      </Section>

      {CATEGORIES.map((cat) => (
        <CategorySection
          key={cat}
          label={cat}
          items={PROJECTS.filter((p) => p.category === cat)}
        />
      ))}

      {/* ── CTA (shared data with Home) ── */}
      <Section theme="dark" className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn className={styles.ctaText}>
            <h2 className={styles.ctaHeadline}>
              {CTA.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {line.includes('Get in Touch!') ? <em>{line}</em> : line}
                  {i < CTA.headline.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className={styles.ctaBody}>{CTA.body}</p>
            <Button to={CTA.button.to}>{CTA.button.label}</Button>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
