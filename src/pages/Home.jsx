import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import MarqueeGallery from '../components/MarqueeGallery';
import VideoSlider from '../components/VideoSlider';
import styles from './Home.module.css';

const HERO_CLOUD_NAME = 'dgad4xyuc';
const HERO_PUBLIC_ID  = 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg';
const HERO_POSTER_ID  = 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer';

/**
 * ── HERO BACKGROUND VIDEO ────────────────────────────────────
 * Swap these two values when the video is ready in Cloudinary:
 *
 *   HERO_CLOUD_NAME  → your Cloudinary cloud name
 *   HERO_PUBLIC_ID   → public ID of the video (e.g. "hero/walk-in")
 *   HERO_POSTER_ID   → public ID of a still frame image for the fallback
 *
 * Leave as null to show the dark gradient placeholder.
 */
// const HERO_CLOUD_NAME = null;   // e.g. 'your-cloud-name'
// const HERO_PUBLIC_ID  = null;   // e.g. 'hero/studio-walk'
// const HERO_POSTER_ID  = null;   // e.g. 'hero/studio-walk-poster'

/**
 * Overlay opacity — tune this once the real video is in.
 * 0 = fully transparent (video fully visible)
 * 1 = fully black (video invisible)
 * 0.45 is a good starting point for dark video + white text.
 */
const OVERLAY_OPACITY = 0.45;

function HeroBg() {
  const videoRef = useRef(null);

  if (!HERO_CLOUD_NAME || !HERO_PUBLIC_ID) {
    // Placeholder gradient until video is added
    return (
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroBgOverlay} style={{ '--overlay-opacity': OVERLAY_OPACITY }} />
      </div>
    );
  }

  const base      = `https://res.cloudinary.com/${HERO_CLOUD_NAME}`;
  // f_auto lets Cloudinary serve WebM to Chrome/Firefox, MP4 to Safari
  const videoSrc  = `${base}/video/upload/f_auto,q_auto:good/${HERO_PUBLIC_ID}`;
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
        autoPlay
        muted
        playsInline
        /* loop={false} is the default — plays once then holds last frame */
        preload="auto"
      />
      <div className={styles.heroBgOverlay} style={{ '--overlay-opacity': OVERLAY_OPACITY }} />
    </div>
  );
}

/* ── Image marquee items — swap bg with Cloudinary image URLs ── */
const GALLERY_ITEMS = [
  { id: 1, title: 'Brand Identity — Linya',    category: 'Visual Identity',       bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228733/hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl.png' },
  { id: 2, title: 'AI Editorial Series',        category: 'AI Generated Content',  bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228731/4f_feyshi.png' },
  { id: 3, title: 'Social Campaign',            category: 'Social Media Content',  bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/d-9_jrekkm.jpg' },
  { id: 4, title: 'Packaging Design',           category: 'Marketing Materials',   bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228734/F-3_uunmgt.jpg' },
  { id: 5, title: 'Creative Direction',         category: 'Creative Concept',      bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229102/d-10_geiek8.jpg' },
  { id: 6, title: 'Product Campaign',           category: 'AI Generated Content',  bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/a06b97ea_nano_2K_xy3svv.jpg' },
  { id: 7, title: 'Visual Identity System',     category: 'Visual Identity',       bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/6db9025c_nano_2K_f9vofx.jpg' },
];

/**
 * Video slider items.
 * To use real Cloudinary videos, add cloudName + publicId + optional poster:
 *   { id: 1, title: '...', category: '...', cloudName: 'your-cloud', publicId: 'folder/video', poster: 'folder/thumb' }
 * Until then, bg colour is shown as placeholder.
 */
const VIDEO_ITEMS = [
  { id: 1, title: 'AI Campaign — Linya',        category: 'AI Generated Content',  bg: '#1a1209' },
  { id: 2, title: 'Brand Film — Haze',          category: 'Creative Direction',    bg: '#091a18' },
  { id: 3, title: 'Social Series — Orbit',      category: 'Social Media Content',  bg: '#12091a' },
  { id: 4, title: 'Product Launch — Creme',     category: 'AI Generated Content',  bg: '#1a1209' },
  { id: 5, title: 'Visual Identity — Voix',     category: 'Visual Identity',       bg: '#0a1a0a' },
];

/* ── Placeholder data — swap with real Cloudinary URLs later ── */
const SERVICES = [
  { title: 'Creative Concept', desc: 'Brand strategy · creative direction · mood boards · visual research' },
  { title: 'Visual Identity', desc: 'Logo systems · colour palettes · typography · concept development' },
  { title: 'AI Generated Content', desc: 'AI video & photo art direction, production and post-processing' },
  { title: 'Social Media Content', desc: 'Content roadmaps · short-form video · static campaigns' },
  { title: 'Marketing Materials', desc: 'Packaging · print · digital assets tailored to each brand' },
];

const PROCESS = [
  { title: 'Define Your Goals', body: 'We start by understanding your brand, audience, and the specific challenge we\'re solving.' },
  { title: 'Concept Creation', body: 'Ideas are shaped into visual directions — moodboards, references, and first creative proposals.' },
  { title: 'Review & Refine', body: 'Collaborative feedback loops until every detail is aligned with your vision.' },
  { title: 'Content Delivered', body: 'Final assets delivered in all formats you need, ready to publish or hand off.' },
];

/* Word-by-word hero headline animation */
const words = ['Transforming', 'brands', 'into', 'visual', 'experiences.'];

export default function Home() {
  return (
    <main>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <HeroBg />

        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroHeadline} aria-label="Transforming brands into visual experiences.">
            {words.map((word, i) => (
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
              At Flaime Studio, we help product-based brands stand out through strategic visuals
              that communicate their value and create a stronger connection with customers.
            </p>
            <Link to="/work" className={styles.heroBtn}>View Work</Link>
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE ARE ──────────────────────────────────────── */}
      <section className={styles.who}>
        <div className={`container ${styles.whoInner}`}>
          <FadeIn>
            <span className="section-label">Who We Are</span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={styles.whoBody}>
              <p className={styles.whoText}>
                Flaime Studio is a creative studio helping product-based brands communicate
                their value through design and creative direction. Every project is built on
                a deep understanding of the brand, allowing us to create solutions that address
                specific business challenges.
              </p>

              {/* Image grid — replace srcs with Cloudinary URLs */}
              <div className={styles.whoGrid}>
                <div className={styles.whoImg} />
                <div className={`${styles.whoImg} ${styles.whoImgTall}`} />
                <div className={styles.whoImg} />
              </div>

              <Link to="/about" className={styles.learnMore}>
                <span>★</span> learn more
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT WE DO ──────────────────────────────────────── */}
      <section className={styles.services}>
        <div className={`container ${styles.servicesInner}`}>
          <FadeIn>
            <span className="section-label">What We Do</span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className={styles.servicesIntro}>
              We offer a range of creative services designed to help brands strengthen
              their presence and communicate their value more effectively.
            </p>
          </FadeIn>

          <ul className={styles.servicesList}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.06}>
                <li className={styles.serviceItem}>
                  <span className={styles.serviceTitle}>{s.title}</span>
                  <span className={styles.serviceDesc}>{s.desc}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* ── LATEST WORKS ────────────────────────────────────── */}
      <section className={styles.works}>
        <div className={`container ${styles.worksHeader}`}>
          <FadeIn>
            <span className="section-label">Latest Works</span>
          </FadeIn>
        </div>

        {/* Full-bleed marquee — intentionally breaks out of container */}
        <FadeIn>
          <div className={styles.marqueeWrapper}>
            <MarqueeGallery items={GALLERY_ITEMS} speed={55} gap={14} />
          </div>
        </FadeIn>

        <div className={`container ${styles.worksSeeMore}`}>
          <FadeIn>
            <Link to="/work" className={styles.seeMore}>
              <span>★</span> see more works
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── VIDEO REEL ───────────────────────────────────────── */}
      <section className={styles.reel}>
        <div className={`container ${styles.reelHeader}`}>
          <FadeIn>
            <span className="section-label">In Motion</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className={styles.reelIntro}>
              Drag to explore video work — campaigns, brand films, AI-generated content.
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <VideoSlider videos={VIDEO_ITEMS} />
        </FadeIn>
      </section>

      {/* ── THE PROCESS ─────────────────────────────────────── */}
      <section className={styles.process}>
        <div className={`container ${styles.processInner}`}>
          <FadeIn>
            <span className="section-label">The Process</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className={styles.processIntro}>
              A clear process designed to turn ideas into meaningful creative solutions.
            </p>
          </FadeIn>

          <div className={styles.processGrid}>
            {PROCESS.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <div className={styles.processStep}>
                  <h3 className={styles.processStepTitle}>{step.title}</h3>
                  <p className={styles.processStepBody}>{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <FadeIn className={styles.ctaText}>
            <h2 className={styles.ctaHeadline}>
              Got Ideas?<br />Get in Touch!
            </h2>
            <p className={styles.ctaBody}>
              Tell us about your brand and what you're looking to achieve.
              We'll come back with a direction that fits.
            </p>
            <Link to="/contact" className={styles.ctaBtn}>Contact Us</Link>
          </FadeIn>

          {/* Decorative image — replace with Cloudinary */}
          <FadeIn delay={0.15} className={styles.ctaImage} />
        </div>
      </section>

    </main>
  );
}
