import { CLOUD_NAME, cloudinaryUrl } from '../utils/constants';

/**
 * Home page content — all copy, media refs, and structured data.
 */

// ── Hero ────────────────────────────────────────────────────
export const HERO = {
  videoPublicId: 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg',
  posterPublicId: 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer',
  overlayOpacity: 0.45,
  headline: 'Transforming\nbrands into visual\nexperiences.',    
  description:
    'We shape how your brand is seen and perceived, helping people understand its value, connect with its story, and choose it with confidence.',
  cta: { label: "Let's Connect ↗", to: '/contact' },
};

// ── Intro ───────────────────────────────────────────────────
export const INTRO = {
  text: 'Flaime Studio is a creative agency helping product-based brands communicate their value through design and creative direction. Every project is built on a deep understanding of the brand, allowing us to create solutions that address specific business challenges.',
  cta: { label: 'See More Work', to: '/work' },
  cards: [
    { id: 1, title: 'Loam Blends', subtitle: 'Social Media Experience' },
    { id: 2, title: 'Milave Haircare', subtitle: 'Social Media & Website Experience' },
    { id: 3, title: 'JLux Label', subtitle: 'Fashion AI Photography' },
  ],
};

// ── Gallery (Selected Works slider) ─────────────────────────
export const GALLERY_ITEMS = [
  { id: 1, type: 'video', src: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/v1781227448/hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg.mp4` },
  { id: 2, type: 'image', bg: cloudinaryUrl('image', '4f_feyshi', 'q_auto/f_auto') },
  { id: 3, type: 'image', bg: cloudinaryUrl('image', 'd-9_jrekkm', 'q_auto/f_auto') },
  { id: 4, type: 'image', bg: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto/f_auto') },
  { id: 5, type: 'image', bg: cloudinaryUrl('image', 'd-10_geiek8', 'q_auto/f_auto') },
  { id: 6, type: 'image', bg: cloudinaryUrl('image', 'a06b97ea_nano_2K_xy3svv', 'q_auto/f_auto') },
  { id: 7, type: 'image', bg: cloudinaryUrl('image', '6db9025c_nano_2K_f9vofx', 'q_auto/f_auto') },
];

export const WORKS_BLURB =
  "We're not here to follow trends—we're here to build something timeless. " +
  "With a blend of creativity, strategy, and heart, we help ideas come to life. " +
  "Every project we take on is an opportunity to learn, grow, and do something meaningful. " +
  "We treat our clients like partners and our work like craft.";

// ── Process ─────────────────────────────────────────────────
export const PROCESS = {
  tagline: 'Turning creative ideas into\nmemorable brand experiences.',
  steps: [
    { title: 'Define Your Goals', body: "We start by understanding your brand, audience, and the specific challenge we're solving." },
    { title: 'Concept Creation', body: 'Ideas shaped into visual directions — moodboards, references, and first creative proposals.' },
    { title: 'Review & Refine', body: 'Collaborative feedback loops until every detail is aligned with your vision.' },
    { title: 'Work Delivered', body: 'Final assets in all formats you need, ready to publish or hand off.' },
  ],
};

// ── CTA (reused on Work page too) ───────────────────────────
export const CTA = {
  image: cloudinaryUrl('image', '6db9025c_nano_2K_f9vofx'),
  headline: 'Have a Project\nin Mind?\nGet in Touch!',
  body: "Tell us about your brand and what you're looking to achieve. We'll come back with a direction that fits.",
  button: { label: "Let's Connect ↗", to: '/contact' },
};
