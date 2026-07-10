import AboutHero from '../components/AboutHero';
import FadeIn from '../components/FadeIn';
import styles from './About.module.css';
import HoverPlayground from '../components/HoverPlayground';
import ParallaxDepth from '../components/ParallaxDepth';
import ParallaxHero from '../components/ParallaxHero';

const STATS = [
  { value: '50+', label: 'Brands worked with' },
  { value: '3', label: 'Years in creative direction' },
  { value: '100%', label: 'Custom, no templates' },
];

export default function About() {
  return (
    <main className={styles.page}>
      <AboutHero />

      <div className="container">
        <FadeIn>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          
        </FadeIn>

        <HoverPlayground />
        <ParallaxDepth />
        
        
           
      </div>
      <ParallaxHero />
    </main>
  );
}