/**
 * Section — the one place that decides a block's background/text theme.
 *
 * <Section theme="dark">...</Section>
 * <Section theme="light">...</Section>
 * <Section theme="dark" container={false}>  -> full-bleed, no side padding
 * <Section theme="dark" bg="#171310">       -> one-off custom color
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
