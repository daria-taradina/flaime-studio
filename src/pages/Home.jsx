import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import DragGallery from '../components/DragGallery';
import styles from './Home.module.css';

/* ─── Hero video ───────────────────────────────────────────── */
const HERO_CLOUD_NAME = 'dgad4xyuc';
const HERO_PUBLIC_ID  = 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg';
const HERO_POSTER_ID  = 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer';
const OVERLAY_OPACITY = 0.45;

function HeroBg() {
  const videoRef = useRef(null);
  if (!HERO_CLOUD_NAME || !HERO_PUBLIC_ID) {
    return (
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroBgOverlay} style={{ '--overlay-opacity': OVERLAY_OPACITY }} />
      </div>
    );
  }
  const base     = `https://res.cloudinary.com/${HERO_CLOUD_NAME}`;
  const videoSrc = `${base}/video/upload/f_auto,q_auto:good/${HERO_PUBLIC_ID}`;
  const posterSrc = HERO_POSTER_ID
    ? `${base}/image/upload/f_auto,q_auto,w_1800/${HERO_POSTER_ID}`
    : undefined;
  return (
    <div className={styles.heroBg} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.heroBgVideo}
        src={videoSrc}
        poster={posterSrc}
        autoPlay muted playsInline preload="auto"
      />
      <div className={styles.heroBgOverlay} style={{ '--overlay-opacity': OVERLAY_OPACITY }} />
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────── */
const WORDS = ['Transforming', 'brands', 'into', 'visual', 'experiences.'];

const SERVICES = [
  { title: 'Creative Concept',      desc: 'Brand strategy · creative direction · mood boards' },
  { title: 'Visual Identity',       desc: 'Logo systems · colour palettes · typography' },
  { title: 'AI Generated Content',  desc: 'AI video & photo · art direction · post-processing' },
  { title: 'Social Media Content',  desc: 'Content roadmaps · short-form video · campaigns' },
  { title: 'Packaging Design',      desc: 'Print · digital assets · marketing materials' },
  { title: 'Web Design & Development', desc: 'Portfolio sites · brand sites · landing pages' },
];

const GALLERY_ITEMS = [
  { id: 1, title: 'Campaign',         category: 'AI Generated Content', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228733/hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl.png' },
  { id: 2, title: 'Editorial Series', category: 'AI Generated Content', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228731/4f_feyshi.png' },
  { id: 3, title: 'Social Campaign',  category: 'Social Media Content', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/d-9_jrekkm.jpg' },
  { id: 4, title: 'Focus',            category: 'Marketing Materials',  bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228734/F-3_uunmgt.jpg' },
  { id: 5, title: 'Creative Direction', category: 'Creative Concept',  bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229102/d-10_geiek8.jpg' },
  { id: 6, title: 'Product Campaign', category: 'AI Generated Content', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/a06b97ea_nano_2K_xy3svv.jpg' },
  { id: 7, title: 'Visual Identity',  category: 'Visual Identity',      bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/6db9025c_nano_2K_f9vofx.jpg' },
];

const PROCESS = [
  { title: 'Define Your Goals',  body: 'We start by understanding your brand, audience, and the specific challenge we\'re solving.' },
  { title: 'Concept Creation',   body: 'Ideas shaped into visual directions — moodboards, references, and first creative proposals.' },
  { title: 'Review & Refine',    body: 'Collaborative feedback loops until every detail is aligned with your vision.' },
  { title: 'Work Delivered',     body: 'Final assets in all formats you need, ready to publish or hand off.' },
];

/* ─── Page ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <HeroBg />
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroHeadline} aria-label="Transforming brands into visual experiences.">
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                className={styles.heroWord}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className={styles.heroRight}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className={styles.heroDesc}>
              We shape how your brand is seen and perceived — helping people understand its
              value, connect with its story, and choose it with confidence.
            </p>
            <Link to="/contact" className={styles.heroBtn}>
              Let's Connect ↗
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className={styles.intro}>
        <div className={`container ${styles.introInner}`}>
          <FadeIn className={styles.introText}>
            <p>
              Flaime Studio is a creative studio helping product-based brands communicate
              their value through design and creative direction.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className={styles.introImg}>
            {/* Replace bg with Cloudinary image URL when ready */}
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES — simple list ── */}
      <section className={styles.services}>
        <div className={`container ${styles.servicesInner}`}>

          {/* Staggered display list — bigger/bolder in the middle */}
          <FadeIn>
            <ul className={styles.servicesList}>
              {SERVICES.map((s, i) => {
                // Middle two items are largest, edges smallest
                const distFromCenter = Math.abs(i - (SERVICES.length - 1) / 2);
                const sizeClass =
                  distFromCenter < 0.6 ? styles.sizeLg :
                  distFromCenter < 1.6 ? styles.sizeMd :
                  styles.sizeSm;
                return (
                  <li key={s.title} className={`${styles.serviceItem} ${sizeClass}`}>
                    <span className={styles.serviceTitle}>{s.title}</span>
                    <span className={styles.serviceDesc}>{s.desc}</span>
                  </li>
                );
              })}
            </ul>
          </FadeIn>

        </div>
      </section>

      {/* ── SELECTED WORKS ── */}
      <section className={styles.works}>
        <div className={`container ${styles.worksHeader}`}>
          <FadeIn className={styles.worksHeaderRow}>
            <span className="section-label">Selected Works</span>
            <Link to="/work" className={styles.seeAll}>See all work ↗</Link>
          </FadeIn>
        </div>

        <FadeIn>
          <DragGallery items={GALLERY_ITEMS} />
        </FadeIn>
      </section>

      {/* ── PROCESS ── */}
      <section className={styles.process}>
        <div className={`container ${styles.processInner}`}>
          <FadeIn>
            <p className={styles.processTagline}>
              Turning creative ideas into<br />memorable brand experiences.
            </p>
          </FadeIn>

          {/* Dot timeline — horizontal desktop, vertical mobile */}
          <FadeIn delay={0.1}>
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              {PROCESS.map((step, i) => (
                <div key={step.title} className={styles.timelineStep}>
                  <div className={styles.timelineDot} />
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <FadeIn className={styles.ctaImg}>
            {/* Replace with Cloudinary image */}
          </FadeIn>
          <FadeIn delay={0.1} className={styles.ctaText}>
            <h2 className={styles.ctaHeadline}>
              Have a Project<br />in Mind?<br />
              <em>Get in Touch!</em>
            </h2>
            <p className={styles.ctaBody}>
              Tell us about your brand and what you're looking to achieve.
              We'll come back with a direction that fits.
            </p>
            <Link to="/contact" className={styles.ctaBtn}>Let's Connect ↗</Link>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
