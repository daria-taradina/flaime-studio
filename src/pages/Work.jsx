import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import DragGallery from '../components/DragGallery';
import Section from '../components/Section';
import Button from '../components/Button';
import { backgroundStyle } from '../utils/media';
import styles from './Work.module.css';

/* ─── Selected Works (hardcoded, hand-picked) ──────────────── */
const SELECTED_WORKS = [
  { id: 1, slug: 'loam-blends',            title: 'Loam Blends',            category: 'Wellness', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228734/F-3_uunmgt.jpg' },
  { id: 2, slug: 'herbal-skin-solutions',  title: 'Herbal Skin Solutions',  category: 'Wellness', bg: '#0d1a14' },
  { id: 3, slug: 'milave',                 title: 'Milave',                 category: 'Beauty',   bg: '#1a1410' },
  { id: 4, slug: 'ettika',                 title: 'Ettika',                 category: 'Fashion',  bg: '#12091a' },
];

/* ─── Category rows (real categories going forward) ────────── */
const CATEGORIES = ['Wellness', 'Beauty', 'Fashion'];

const PROJECTS = [
  { id: 1, title: 'Loam Blends',           category: 'Wellness', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228733/hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl.png' },
  { id: 2, title: 'Herbal Skin Solutions', category: 'Wellness', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228734/F-3_uunmgt.jpg' },
  { id: 3, title: 'Root & Bloom',          category: 'Wellness', bg: '#12181a' },
  { id: 4, title: 'Root & Bloom',          category: 'Wellness', bg: '#12181a' },
  { id: 5, title: 'Root & Bloom',          category: 'Wellness', bg: '#12181a' },
  { id: 6, title: 'Root & Bloom',          category: 'Wellness', bg: '#12181a' },
  { id: 7, title: 'Root & Bloom',          category: 'Wellness', bg: '#12181a' },
  { id: 8, title: 'Milave',                category: 'Beauty',   bg: '#1a1410' },
  { id: 9, title: 'Glass Skin Co.',        category: 'Beauty',   bg: '#181012' },
  { id: 10, title: 'Ettika',                category: 'Fashion',  bg: '#12091a' },
  { id: 11, title: 'Sable Studio',          category: 'Fashion',  bg: '#10181c' },
];

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
            <h1 className={styles.title}>Our Work</h1>
            <p className={styles.desc}>
              We create complete visual systems where every element works together to support
              the same brand experience. From branding identity to social media content, every
              piece is designed to fit into the bigger picture.
            </p>
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

      {/* ── CTA ── */}
      <Section theme="dark" className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn className={styles.ctaText}>
            <h2 className={styles.ctaHeadline}>
              Have a Project<br />in Mind?<br />
              <em>Get in Touch!</em>
            </h2>
            <p className={styles.ctaBody}>
              Tell us about your brand and what you're looking to achieve.
              We'll come back with a direction that fits.
            </p>
            <Button to="/contact">Let's Connect ↗</Button>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
