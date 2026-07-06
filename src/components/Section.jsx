/**
 * Section — the one place that decides a block's background/text theme.
 *
 * <Section theme="dark">...</Section>          -> dark bg, white text
 * <Section theme="light">...</Section>         -> cream bg, dark text
 * <Section theme="dark" container={false}>     -> full-bleed, no side padding
 * <Section theme="dark" bg="#171310">          -> one-off custom color,
 *                                                  escapes the two presets
 *
 * Uses the plain global "section" class (same pattern as your existing
 * global "container" class) rather than a CSS module - it has to match
 * the plain `.section[data-theme]` selector in styles/section-theme.css,
 * and CSS Modules would hash the name so it no longer matched.
 *
 * `className` is still your page's CSS module class, for layout only
 * (padding, grid, etc). Colors should come from the theme, not from here.
 */
export default function Section({
  as: Tag = 'section',
  theme = 'dark',
  bg,
  container = true,
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
      className={`section ${className}`}
      style={mergedStyle}
      {...rest}
    >
      {container ? (
        <div className={`container ${containerClassName}`}>{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}
