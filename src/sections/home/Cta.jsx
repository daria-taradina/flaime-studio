import FadeIn from '../../components/ui/FadeIn';
import Section from '../../components/layout/Section';
import Button from '../../components/ui/Button';
import { CTA } from '../../data/home';
import styles from './Cta.module.css';

export default function Cta() {
  return (
    <Section theme="dark" container={false} className={styles.cta}>
      <div className={styles.ctaInner}>
        <FadeIn className={styles.ctaImg}>
          <img src={CTA.image} alt="Get in touch with Flaime Studio" />
        </FadeIn>
        <FadeIn delay={0.1} className={styles.ctaText}>
          <h2 className={styles.ctaHeadline}>
            {CTA.headline.split('\n').map((line, i) => (
              <span key={i}>
                {line.includes('Get in Touch!') ? <em>{line}</em> : line}
                {i < CTA.headline.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.ctaBody}>{CTA.body}</p>
          <Button to={CTA.button.to}>{CTA.button.label}</Button>
        </FadeIn>
      </div>
    </Section>
  );
}
