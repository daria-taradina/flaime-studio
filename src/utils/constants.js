/**
 * Shared constants — animation, breakpoints, Cloudinary config.
 * Import from here instead of hardcoding magic values across components.
 */

// ── Cloudinary ──────────────────────────────────────────────
export const CLOUD_NAME = 'dgad4xyuc';
export const cloudinaryUrl = (type, publicId, transforms = '') =>
  `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload/${transforms ? transforms + '/' : ''}${publicId}`;

// ── Animation ───────────────────────────────────────────────
export const EASE_DEFAULT = [0.25, 0.46, 0.45, 0.94];
export const DURATION_DEFAULT = 0.6;
export const DURATION_SLOW = 0.8;
export const STAGGER_DELAY = 0.12;

// ── Breakpoints (matches globals.css media queries) ─────────
export const BP_MOBILE = 768;
export const MOBILE_QUERY = `(max-width: ${BP_MOBILE}px)`;
