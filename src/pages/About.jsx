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
        <ParallaxDepth />    
        <HoverPlayground />
        <ParallaxHero />
        
        
      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testN}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
        - Neue Haas Grotesk Display Pro
        </p>
      </section>
      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testG}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
          - Geist
        </p>
      </section>

      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testJ}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
          - Plus Jakarta Sans
        </p>
      </section>

      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testM}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
          - Manrope
        </p>
      </section>

      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testR}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
          - Roboto Flex
        </p>
      </section>

      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testD}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
          - DM Sans
        </p>
      </section>

      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testI}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
          - Inter Tight
        </p>
      </section>

      <section className={styles.fontTest} data-theme="light">
        <p className={styles.testB}>Flaime Studio is a creative studio helping product-based brands communicate their value through design and creative direction.
          - Barlow
        </p>
      </section>
                
      </div>
      
    </main>
  );
}