import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/**
 * Button — one pill-button component instead of .heroBtn / .seeAll / .ctaBtn
 * (which were all the same border+radius+hover-invert pattern, copy-pasted
 * with slightly different values in Home.module.css).
 *
 * Colors are NOT hardcoded here — it uses currentColor + the --section-fg/
 * --section-bg variables from whatever <Section> it's rendered inside, so
 * the same button automatically looks right on both dark and light blocks.
 *
 * <Button to="/contact">Let's Connect</Button>          -> internal route
 * <Button href="https://instagram.com/...">Instagram</Button>  -> external
 * <Button onClick={...}>Send Message</Button>            -> plain action
 * <Button size="sm">See all work</Button>
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
