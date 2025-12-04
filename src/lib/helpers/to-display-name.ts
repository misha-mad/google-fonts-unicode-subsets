/**
 * Convert kebab-case string to Title Case string.
 *
 * @param subset - The kebab-case string (e.g., 'latin-ext_unique-glyphs').
 * @returns The Title Case string (e.g., 'Latin Ext').
 *
 * @example
 * ```ts
 * toDisplayName("latin-ext_unique-glyphs"); // "Latin Ext"
 * ```
 */
export const toDisplayName = (subset: string) =>
  subset
    .replace(/_unique-glyphs$/, '')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
