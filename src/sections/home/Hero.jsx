import { useRef } from 'react';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section';
import Button from '../../components/ui/Button';
import { HERO } from '../../data/home';
import { cloudinaryUrl, EASE_DEFAULT, STAGGER_DELAY } from '../../utils/constants';
import styles from './Hero.module.css';

function HeroBg() {
  const videoRef = useRef(null);
  const videoSrc = cloudinaryUrl('video', HERO.videoPublicId, 'f_auto,q_auto:good');
  const posterSrc = cloudinaryUrl('image', HERO.posterPublicId, 'f_auto,q_auto,w_1800');

  return (
    <div className={styles.heroBg} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.heroBgVideo}
        src={videoSrc}
        poster={posterSrc}
        autoPlay muted playsInline preload="auto"
      />
      <div className={styles.heroBgOverlay} style={{ '--overlay-opacity': HERO.overlayOpacity }} />
    </div>
  );
}

export default function Hero() {
  return (
    <Section theme="dark" container={false} className={styles.hero}>
      <HeroBg />
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.heroHeadline} aria-label={HERO.headline.join(' ')}>
          {HERO.headline.map((word, i) => (
            <motion.span
              key={word}
              className={styles.heroWord}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * STAGGER_DELAY, ease: EASE_DEFAULT }}
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
          <p className={styles.heroDesc}>{HERO.description}</p>
          <Button to={HERO.cta.to} size="full">{HERO.cta.label}</Button>
        </motion.div>
      </div>
    </Section>
  );
}
