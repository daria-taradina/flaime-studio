import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import DragGallery from '../components/DragGallery';
import Section from '../components/Section';
import Button from '../components/Button';
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

// Reused for the two intro images (placeholders — swap for final picks anytime)
const INTRO_IMG_1 = 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228733/hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl.png';
const INTRO_IMG_2 = 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228734/F-3_uunmgt.jpg';

// Services — plain list, no images, no descriptions (per updated spec)
const SERVICES = [
  'Web Design',
  'Visual Identity',
  'Packaging Design',
  'Social Media Assets',
  'AI-Generated Content',
  'Motion Design',
];

// Selected Works — 9:16 media items. `type: 'video'` ready for real footage;
// using existing images as placeholders until video assets land.
const GALLERY_ITEMS = [
  { id: 1, type: 'video', src: 'https://res.cloudinary.com/dgad4xyuc/video/upload/v1781227448/hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg.mp4' },
  { id: 2, type: 'image', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228731/4f_feyshi.png' },
  { id: 3, type: 'image', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/d-9_jrekkm.jpg' },
  { id: 4, type: 'image', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781228734/F-3_uunmgt.jpg' },
  { id: 5, type: 'image', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229102/d-10_geiek8.jpg' },
  { id: 6, type: 'image', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/a06b97ea_nano_2K_xy3svv.jpg' },
  { id: 7, type: 'image', bg: 'https://res.cloudinary.com/dgad4xyuc/image/upload/q_auto/f_auto/v1781229106/6db9025c_nano_2K_f9vofx.jpg' },
  // Example of how a real video item will look once footage is ready:
  // { id: 8, type: 'video', src: 'https://res.cloudinary.com/dgad4xyuc/video/upload/f_auto,q_auto/your_clip_id', poster: 'optional_poster_id' },
];

const WORKS_BLURB =
  "We're not here to follow trends—we're here to build something timeless. " +
  "With a blend of creativity, strategy, and heart, we help ideas come to life. " +
  "Every project we take on is an opportunity to learn, grow, and do something meaningful. " +
  "We treat our clients like partners and our work like craft.";

const PROCESS = [
  { title: 'Define Your Goals',  body: 'We start by understanding your brand, audience, and the specific challenge we\'re solving.' },
  { title: 'Concept Creation',   body: 'Ideas shaped into visual directions — moodboards, references, and first creative proposals.' },
  { title: 'Review & Refine',    body: 'Collaborative feedback loops until every detail is aligned with your vision.' },
  { title: 'Work Delivered',     body: 'Final assets in all formats you need, ready to publish or hand off.' },
];

const CTA_IMG = 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/6db9025c_nano_2K_f9vofx.jpg';

/* ─── Services section ──────────────────────────────────────
   Desktop: hover enlarges the name (not clickable, no image swap).
   Mobile: whichever item is centered in the viewport enlarges;
   others shrink back — driven by IntersectionObserver, not tap.
──────────────────────────────────────────────────────────── */
function ServicesSection() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia('(max-width: 768px)').matches
  );
  const itemRefs = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handleChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Section theme="dark" className={styles.services}>
      <FadeIn className={styles.servicesList}>
        <span className={`section-label ${styles.servicesLabel}`}>What We Do</span>
        <ul>
          {SERVICES.map((title, i) => {
            const distance = active === null ? undefined : Math.abs(i - active);
            return (
              <li
                key={title}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                className={styles.serviceItem}
                style={distance !== undefined ? { '--distance': distance } : undefined}
                onMouseEnter={() => { if (!isMobile) setActive(i); }}
                onMouseLeave={() => { if (!isMobile) setActive(null); }}
              >
                <span className={styles.serviceTitle}>{title}</span>
              </li>
            );
          })}
        </ul>
      </FadeIn>
    </Section>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>

      {/* ── HERO ── */}
      <Section theme="dark" container={false} className={styles.hero}>
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
            <Button to="/contact">Let's Connect ↗</Button>
          </motion.div>
        </div>
      </Section>

      {/* ── INTRO ── */}
      <Section theme="light" className={styles.intro}>
        <div className={styles.introInner}>
          <FadeIn className={styles.introText}>
            <p>
              Flaime Studio is a creative studio helping product-based brands communicate
              their value through design and creative direction.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className={styles.introImages}>
            <div className={styles.introImg}>
              <img src={INTRO_IMG_1} alt="Flaime Studio work sample" />
            </div>
            <div className={styles.introImg}>
              <img src={INTRO_IMG_2} alt="Flaime Studio work sample" />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── SERVICES ── */}
      <ServicesSection />

      {/* ── SELECTED WORKS ── */}
      <Section theme="dark" container={false} className={styles.works}>
        <FadeIn>
          <DragGallery items={GALLERY_ITEMS} ratio="9 / 16" showOverlay={false} />
        </FadeIn>

        <div className={`container ${styles.worksFooter}`}>
          <FadeIn className={styles.worksBlurb}>
            <p>{WORKS_BLURB}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Button to="/work" size="sm">See More Work ↗</Button>
          </FadeIn>
        </div>
      </Section>



      {/* ── PROCESS ── */}
      <Section theme="light" className={styles.process}>
        <div className={styles.processInner}>
          <FadeIn>
            <p className={styles.processTagline}>
              Turning creative ideas into<br />memorable brand experiences.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              {PROCESS.map((step) => (
                <div key={step.title} className={styles.timelineStep}>
                  <div className={styles.timelineDot} />
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section theme="dark" className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn className={styles.ctaImg}>
              <img src={CTA_IMG} alt="Get in touch with Flaime Studio" />
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
            <Button to="/contact">Let's Connect ↗</Button>
          </FadeIn>
        </div>
      </Section>

    </main>
  );
}