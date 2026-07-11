import { cloudinaryUrl } from '../utils/constants';

/**
 * Work page content — selected works, project grid, categories.
 */

export const WORK_HEADER = {
  title: 'Our Work',
  description:
    'We create complete visual systems where every element works together to support the same brand experience. From branding identity to social media content, every piece is designed to fit into the bigger picture.',
};

export const SELECTED_WORKS = [
  { id: 1, slug: 'loam-blends', title: 'Loam Blends', category: 'Wellness', bg: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto/f_auto') },
  { id: 2, slug: 'herbal-skin-solutions', title: 'Herbal Skin Solutions', category: 'Wellness', bg: '#0d1a14' },
  { id: 3, slug: 'milave', title: 'Milave', category: 'Beauty', bg: '#1a1410' },
  { id: 4, slug: 'ettika', title: 'Ettika', category: 'Fashion', bg: '#12091a' },
];

export const CATEGORIES = ['Wellness', 'Beauty', 'Fashion'];

export const PROJECTS = [
  { id: 1, title: 'Loam Blends', category: 'Wellness', bg: cloudinaryUrl('image', 'hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl', 'q_auto/f_auto') },
  { id: 2, title: 'Herbal Skin Solutions', category: 'Wellness', bg: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto/f_auto') },
  { id: 3, title: 'Root & Bloom', category: 'Wellness', bg: '#12181a' },
  { id: 4, title: 'Root & Bloom', category: 'Wellness', bg: '#12181a' },
  { id: 5, title: 'Root & Bloom', category: 'Wellness', bg: '#12181a' },
  { id: 6, title: 'Root & Bloom', category: 'Wellness', bg: '#12181a' },
  { id: 7, title: 'Root & Bloom', category: 'Wellness', bg: '#12181a' },
  { id: 8, title: 'Milave', category: 'Beauty', bg: '#1a1410' },
  { id: 9, title: 'Glass Skin Co.', category: 'Beauty', bg: '#181012' },
  { id: 10, title: 'Ettika', category: 'Fashion', bg: '#12091a' },
  { id: 11, title: 'Sable Studio', category: 'Fashion', bg: '#10181c' },
];
