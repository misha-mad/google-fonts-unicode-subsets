/**
 * Convert a kebab-case string to SCREAMING_SNAKE_CASE.
 * Used for generating constant keys.
 *
 * @param subset - The kebab-case string (e.g., 'latin-ext').
 * @returns The converted string (e.g., 'LATIN_EXT').
 *
 * @example
 * ```ts
 * toConstName("latin-ext"); // "LATIN_EXT"
 * ```
 */
export function toConstName(subset: string): string {
  return subset.toUpperCase().replace(/-/g, "_");
}
