/**
 * Convert a kebab-case string to SCREAMING_SNAKE_CASE.
 * Used for generating constant keys.
 *
 * @param subset - The kebab-case string (e.g., 'latin-ext_unique-glyphs').
 * @returns The converted string (e.g., 'LATIN_EXT').
 *
 * @example
 * ```ts
 * toConstName("latin-ext_unique-glyphs"); // "LATIN_EXT"
 * ```
 */
export const toConstName = (subset: string) =>
  subset
    .replace(/_unique-glyphs$/, "")
    .toUpperCase()
    .replaceAll("-", "_");
