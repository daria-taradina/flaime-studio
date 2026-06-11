import FadeIn from '../components/FadeIn';
import styles from './About.module.css';

export default function About() {
  return (
    <main className={styles.page}>
      <div className="container">

        <FadeIn>
          <div className={styles.hero}>
            <span className="section-label">Who We Are</span>
            <h1 className={styles.headline}>
              A creative studio built for<br />
              <em>brands that want to be seen.</em>
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
              <p>
                Flaime Studio was founded on the belief that visual identity is a brand's most
                powerful strategic asset. We work at the intersection of creative direction,
                AI-powered production, and marketing strategy — helping emerging and established
                product brands communicate what makes them worth choosing.
              </p>
              <p>
                Every project starts with the same question: <em>what does this brand need to say,
                and to whom?</em> From there we build the visual language to say it clearly.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={styles.stats}>
              {[
                { value: '50+', label: 'Brands worked with' },
                { value: '3', label: 'Years in creative direction' },
                { value: '100%', label: 'Custom, no templates' },
              ].map(s => (
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
