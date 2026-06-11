import { motion } from 'framer-motion';

/**
 * Wraps children in a scroll-triggered fade + slide-up animation.
 * Uses framer-motion's whileInView so it only triggers once per mount.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 28,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
