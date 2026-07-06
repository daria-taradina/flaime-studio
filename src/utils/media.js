/** True if value looks like a hex color ('#12181a') rather than a URL/path. */
export function isColor(value) {
  return typeof value === 'string' && value.startsWith('#');
}