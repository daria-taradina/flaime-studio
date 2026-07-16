/**
 * Section — the one place that decides a block's background/text theme
 * and its vertical spacing.
 *
 * <Section theme="dark">...</Section>
 * <Section theme="light">...</Section>
 * <Section theme="dark" container={false}>   -> full-bleed, no side padding
 * <Section theme="dark" padY={false}>         -> section handles its own top/bottom spacing
 * <Section theme="dark" bg="#171310">         -> one-off custom background color
 */
import GrainOverlay from './GrainOverlay';

export default function Section({
  as: Tag = 'section',
  theme = 'dark',
  grain = false,
  bg,
  container = true,
  padY = true,
  containerClassName = '',
  className = '',
  style,
  children,
  ...rest
}) {
  const mergedStyle = bg ? { '--section-bg': bg, ...style } : style;

  return (
    <Tag
      data-theme={theme}
      data-pad-y={padY}
      className={`section ${className}`}
      style={mergedStyle}
      {...rest}
    >
      {grain && <GrainOverlay />}
      {container ? (
        <div className={`container ${containerClassName}`}>{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}