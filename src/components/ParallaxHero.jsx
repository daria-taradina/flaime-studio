import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from '../pages/About.module.css';

gsap.registerPlugin(ScrollTrigger);

const HERO_CLOUD_NAME = 'dgad4xyuc';
const HERO_PUBLIC_ID  = 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg';
const HERO_POSTER_ID  = 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer';

const PNG_BACK_SRC  = '../cave2.png';  // swap with your asset paths
const PNG_FRONT_SRC = '../cave.png';

export default function ParallaxHero() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const pngBackRef = useRef(null);
  const pngFrontRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.6,
          pin: true,
        },
      });

      // video (farthest) barely moves/scales
      tl.to(videoRef.current, { scale: 1.15, ease: 'none' }, 0)
        // mid PNG layer moves + scales more
        .to(pngBackRef.current, { scale: 1.4, y: -60, ease: 'none' }, 0)
        // front PNG layer — moves the most, sells the "stepping in" feel
        .to(pngFrontRef.current, { scale: 2, y: 120, ease: 'none' }, 0);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const base = `https://res.cloudinary.com/${HERO_CLOUD_NAME}`;
  const videoSrc = `${base}/video/upload/f_auto,q_auto:good/${HERO_PUBLIC_ID}`;
  const posterSrc = `${base}/image/upload/f_auto,q_auto,w_1800/${HERO_POSTER_ID}`;

  return (
    <div ref={wrapRef} className={styles.scrollHero}>
      <video
        ref={videoRef}
        className={styles.heroBgVideo}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />
      <img
        ref={pngBackRef}
        src={PNG_BACK_SRC}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, pointerEvents: 'none' }}
      />
      <img
        ref={pngFrontRef}
        src={PNG_FRONT_SRC}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2, pointerEvents: 'none' }}
      />
    </div>
  );
}