import FadeIn from '../../components/ui/FadeIn';
import Section from '../../components/layout/Section';
import { PROCESS } from '../../data/home';
import styles from './Process.module.css';

export default function Process() {
  return (
    <Section theme="light" className={styles.process}>
      <div className={styles.processInner}>
        <FadeIn>
          <p className={styles.processTagline}>
            {PROCESS.tagline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={styles.timeline}>
            <div className={styles.timelineLine} />
            {PROCESS.steps.map((step) => (
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
  );
}
