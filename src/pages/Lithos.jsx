import { useEffect, useRef, useState } from 'react';
import styles from './Lithos.module.css';

const BG_IMAGE_1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';
const SPOTLIGHT_R = 260;

function RevealLayer({ image, cursorX, cursorY }) {
  const canvasRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const dataUrl = canvas.toDataURL();
    reveal.style.maskImage = `url(${dataUrl})`;
    reveal.style.webkitMaskImage = `url(${dataUrl})`;
    reveal.style.maskSize = '100% 100%';
    reveal.style.webkitMaskSize = '100% 100%';
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.hiddenCanvas} />
      <div
        ref={revealRef}
        className={styles.revealDiv}
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

const NAV_LINKS = ['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour'];

export default function Lithos() {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={styles.root} style={{ fontFamily: "'Inter', sans-serif" }}>
      <section className={styles.hero} style={{ height: '100dvh' }}>
        {/* Base image */}
        <div
          className={`${styles.baseImage} ${styles.heroZoom}`}
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Reveal layer */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Heading */}
        <div className={styles.headingWrap}>
          <h1 className={styles.heading}>
            <span
              className={`${styles.line1} ${styles.heroAnim} ${styles.heroReveal}`}
              style={{ animationDelay: '0.25s', letterSpacing: '-0.05em' }}
            >
              Layers hold
            </span>
            <span
              className={`${styles.line2} ${styles.heroAnim} ${styles.heroReveal}`}
              style={{ animationDelay: '0.42s', letterSpacing: '-0.08em' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        {/* Bottom-left paragraph */}
        <div className={`${styles.bottomLeft} ${styles.heroAnim} ${styles.heroFade}`} style={{ animationDelay: '0.7s' }}>
          <p>
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        {/* Bottom-right block */}
        <div className={`${styles.bottomRight} ${styles.heroAnim} ${styles.heroFade}`} style={{ animationDelay: '0.85s' }}>
          <p>
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          <button className={styles.digButton}>Start Digging</button>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className={styles.wordmark}>Lithos</span>
        </div>

        <div className={styles.navPill}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              className={i === 0 ? styles.navLinkActive : styles.navLink}
            >
              {link}
            </button>
          ))}
        </div>

        <button className={styles.signUp}>Sign Up</button>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
    </div>
  );
}
