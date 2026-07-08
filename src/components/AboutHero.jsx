import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from '../pages/About.module.css';

gsap.registerPlugin(ScrollTrigger);

const HERO_CLOUD_NAME = 'dgad4xyuc';
const HERO_PUBLIC_ID  = 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg';
const HERO_POSTER_ID  = 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer';

export default function AboutHero() {
  const wrapRef = useRef(null);
  const headlineRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        gsap.set([headlineRef.current, p1Ref.current, p2Ref.current], {
          opacity: 0,
          y: 24,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 0.5,
            pin: true,
          },
        });

        tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.05)
          .to(p1Ref.current,       { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.4)
          .to(p2Ref.current,       { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.7);
      });

      mm.add('(max-width: 768px)', () => {
        gsap.set([headlineRef.current, p1Ref.current, p2Ref.current], { opacity: 1, y: 0 });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const base = `https://res.cloudinary.com/${HERO_CLOUD_NAME}`;
  const videoSrc = `${base}/video/upload/f_auto,q_auto:good/${HERO_PUBLIC_ID}`;
  const posterSrc = `${base}/image/upload/f_auto,q_auto,w_1800/${HERO_POSTER_ID}`;

  return (
    <div ref={wrapRef} className={styles.scrollHero}>
      <div className={styles.heroBg} aria-hidden="true">
        <video
          className={styles.heroBgVideo}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className={styles.heroBgOverlay} style={{ '--overlay-opacity': 0.5 }} />
      </div>

      <div className={styles.scrollHeroStage}>
        <div ref={headlineRef} className={`${styles.scrollHeroBlock} ${styles.headline} ${styles.left}`}>
          <span className="section-label">Who We Are</span>
          <h1 className={styles.headline}>
            A creative studio built for<br />
            <em>brands that want to be seen.</em>
          </h1>
        </div>

        <p ref={p1Ref} className={`${styles.scrollHeroBlock} ${styles.p1} ${styles.right} ${styles.scrollParagraph}`}>
          Flaime Studio was founded on the belief that visual identity is a brand's most
          powerful strategic asset. We work at the intersection of creative direction,
          AI-powered production, and marketing strategy.
        </p>

        <p ref={p2Ref} className={`${styles.scrollHeroBlock} ${styles.p2} ${styles.left} ${styles.scrollParagraph}`}>
          Every project starts with the same question: <em>what does this brand need to say,
          and to whom?</em> From there we build the visual language to say it clearly.
        </p>
      </div>
    </div>
  );
}