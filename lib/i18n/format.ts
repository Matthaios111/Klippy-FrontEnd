export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
}

/**
 * Hours like "4h" or "4h 30m" — units kept simple for v1.
 * Locale-aware number for the numeric parts, but h/m suffixes stay consistent.
 * Future locales can override via dictionary if needed.
 */
export function formatHours(hours: number, locale: string): string {
  const totalMinutes = Math.round(hours * 60);
  const wholeHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const h = formatNumber(wholeHours, locale);
  const m = formatNumber(minutes, locale);
  return minutes ? `${h}h ${m}m` : `${h}h`;
}
