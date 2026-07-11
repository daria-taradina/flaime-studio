import FadeIn from '../components/ui/FadeIn';
import { ABOUT_HERO, ABOUT_INTRO, ABOUT_STATS } from '../data/about';
import styles from './About.module.css';

export default function About() {
  return (
    <main className={styles.page}>
      <div className="container">

        <FadeIn>
          <div className={styles.hero}>
            <span className="section-label">{ABOUT_HERO.label}</span>
            <h1 className={styles.headline}>
              {ABOUT_HERO.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {line.includes('brands that want to be seen.') ? <em>{line}</em> : line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
          </div>
        </FadeIn>

        {/* Full-width image placeholder */}
        <FadeIn delay={0.1}>
          <div className={styles.coverImage} aria-hidden="true" />
        </FadeIn>

        <div className={styles.body}>
          <FadeIn>
            <div className={styles.intro}>
              {ABOUT_INTRO.map((paragraph, i) => (
                <p key={i}>{i === 1 ? <em>{paragraph}</em> : paragraph}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={styles.stats}>
              {ABOUT_STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

      </div>
    </main>
  );
}
