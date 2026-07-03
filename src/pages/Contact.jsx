import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import styles from './Contact.module.css';

const SERVICES = [
  'Creative Concept','Visual Identity','AI Generated Content',
  'Social Media Content','Packaging Design','Web Design & Development','Other',
];

export default function Contact() {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = (s) =>
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Wire up Formspree: replace URL below with your Formspree endpoint
    // const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST', body: new FormData(e.target),
    //   headers: { Accept: 'application/json' },
    // });
    // if (res.ok) setSubmitted(true);
    // For now simulate success:
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <FadeIn>
          <div className={styles.header}>
            <span className="section-label">Get in Touch</span>
            <h1 className={styles.title}>Have a Project<br />in Mind? <em>Let's talk.</em></h1>
          </div>
        </FadeIn>

        <div className={styles.layout}>
          <FadeIn delay={0.1} className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>✦</span>
                <h2>Message received!</h2>
                <p>We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="services" value={selected.join(', ')} />

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Name</span>
                    <input type="text" name="name" placeholder="Your name" required className={styles.input} />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Email</span>
                    <input type="email" name="email" placeholder="your@email.com" required className={styles.input} />
                  </label>
                </div>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Brand / Company</span>
                  <input type="text" name="brand" placeholder="What's your brand?" className={styles.input} />
                </label>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Services you're interested in</span>
                  <div className={styles.chips}>
                    {SERVICES.map(s => (
                      <button key={s} type="button"
                        className={`${styles.chip} ${selected.includes(s) ? styles.chipActive : ''}`}
                        onClick={() => toggle(s)}>{s}</button>
                    ))}
                  </div>
                </div>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Tell us about your project</span>
                  <textarea name="message" rows={5} placeholder="What are you trying to achieve? Any timeline or budget in mind?" className={`${styles.input} ${styles.textarea}`} />
                </label>

                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </FadeIn>

          <FadeIn delay={0.2} className={styles.info}>
            <div className={styles.infoBlock}>
              <span className="section-label">Email</span>
              <a href="mailto:hello@flaimestudio.com" className={styles.infoLink}>hello@flaimestudio.com</a>
            </div>
            <div className={styles.infoBlock}>
              <span className="section-label">Instagram</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.infoLink}>@flaimestudio</a>
            </div>
            <div className={styles.infoBlock}>
              <span className="section-label">Based in</span>
              <p className={styles.infoText}>Los Angeles, CA<br />Working worldwide</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
