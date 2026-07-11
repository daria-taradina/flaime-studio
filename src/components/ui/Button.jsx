import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/**
 * Button — polymorphic pill button (Link / a / button).
 * Colors come from CSS vars (--section-fg / --section-bg) so it adapts
 * to whatever Section theme it's inside.
 */
export default function Button({
  to,
  href,
  onClick,
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const cls = `${styles.btn} ${styles[size] || ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
