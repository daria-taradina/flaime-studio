import { motion } from 'framer-motion';
import { EASE_DEFAULT, DURATION_DEFAULT } from '../../utils/constants';

export default function FadeIn({ children, delay = 0, duration = DURATION_DEFAULT, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: EASE_DEFAULT }}
    >
      {children}
    </motion.div>
  );
}
