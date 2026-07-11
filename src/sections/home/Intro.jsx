import FadeIn from '../../components/ui/FadeIn';
import Section from '../../components/layout/Section';
import { INTRO } from '../../data/home';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <Section theme="light" className={styles.intro}>
      <div className={styles.introInner}>
        <FadeIn className={styles.introLabel}>
          <span className="section-label">{INTRO.label}</span>
        </FadeIn>

        <FadeIn delay={0.05} className={styles.introText}>
          <p>{INTRO.text}</p>
        </FadeIn>

        <FadeIn delay={0.1} className={styles.introImages}>
          {INTRO.images.map((img) => (
            <div key={img.src} className={styles.introImg}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </FadeIn>
      </div>
    </Section>
  );
}
