/**
 * Case study data. Add a new object here for each client project and it
 * gets a full page for free via CaseStudyTemplate — no new page file needed
 * unless a project truly breaks the template's shape.
 */
export const projects = {
  'loam-blends': {
    slug: 'loam-blends',
    title: 'Loam Blends',
    tagline:
      "Loam Blends is a wellness supplement brand built around natural ingredients and everyday wellness. The project reimagined how the brand communicated its products, transforming complex health benefits into clear, engaging visual stories customers could easily connect with.",

    // Any value starting with '#' renders as a flat color block instead of
    // an <img> — swap these for real Cloudinary URLs whenever assets are ready.
    heroImage: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781227437/hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer.png',
    heroImageAlt: 'Loam Blends supplement packet',

    summaryHeading:
      'Increasing customer trust in a wellness supplement brand through benefit-driven visual storytelling',

    breakdown: [
      {
        label: 'Business Challenge',
        title: 'Winning Attention and Trust',
        body: "The supplement market was crowded with competing health claims, making it difficult to stand out. Customers were skeptical, and the existing content didn't clearly show how the products fit into everyday life.",
      },
      {
        label: 'Strategy',
        title: 'Connecting Benefits to Everyday Life',
        body: 'We built a content system that connected product benefits to real moments customers care about. Ingredients became part of the story, making the products easier to understand and more relevant.',
      },
      {
        label: 'Creative Direction',
        title: 'Making Wellness Feel Real',
        body: 'The creative direction combined educational storytelling with realistic lifestyle imagery to show wellness as something people experience, not simply something they buy.',
      },
      {
        label: 'Outcome',
        title: 'Creating Stronger Customer Confidence',
        body: 'The new visual direction increased engagement, improved product understanding, and gave customers clearer reasons to trust the brand and feel confident in their purchase decisions.',
      },
    ],

    gallery: [
      { src: '#e8e0d0', alt: 'Loam Blends lifestyle shot' },
      { src: '#3a4a2f', alt: 'Loam Blends product flat lay' },
      { src: '#c9b99a', alt: 'Loam Blends mushroom ingredient' },
      { src: '#d9d233', alt: 'Loam Blends brand moment' },
    ],

    feature: {
      type: 'image',
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781227437/hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer.png',
      alt: 'Loam Blends brand film',
    },
  },
};

export function getProject(slug) {
  return projects[slug];
}