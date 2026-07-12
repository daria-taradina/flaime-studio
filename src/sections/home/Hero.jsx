import { useRef } from 'react';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section';
import Button from '../../components/ui/Button';
import { HERO } from '../../data/home';
import { cloudinaryUrl } from '../../utils/constants';
import styles from './Hero.module.css';

function HeroBg() {
  const videoRef = useRef(null);
  const videoSrc = cloudinaryUrl('video', HERO.videoPublicId, 'f_auto,q_auto:good');
  const posterSrc = cloudinaryUrl('image', HERO.posterPublicId, 'f_auto,q_auto,w_1800');
  
  return (
    <div className={styles.heroBg} aria-hidden="true">
      <video ref={videoRef} className={styles.heroBgVideo} src={videoSrc} poster={posterSrc} autoPlay muted playsInline preload="auto" />
      <div className={styles.heroBgOverlay} style={{ '--overlay-opacity': HERO.overlayOpacity }} />
    </div>
  );
}

export default function Hero() {
  return (
    <Section theme="dark" container={false} className={styles.hero}>
      <HeroBg />
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeadline}>
          {HERO.headline.split('\n').map((line, i) => (
            <span key={i} className={styles.headlineLine}>{line}</span>
          ))}
        </h1>

        <motion.div 
          className={styles.heroRight} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className={styles.heroDesc}>{HERO.description}</p>
          <div className={styles.scrollIndicator}>
            <span className="section-label">Scroll to Discover</span>
            <span className={styles.scrollArrow} aria-hidden="true">↓</span>
          </div>
        </motion.div>
        
      </div>
    </Section>
  );
}
