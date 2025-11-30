/**
 * Convert kebab-case string to Title Case string.
 *
 * @param subset - The kebab-case string (e.g., 'latin-ext').
 * @returns The Title Case string (e.g., 'Latin Ext').
 *
 * @example
 * ```ts
 * toDisplayName("latin-ext"); // "Latin Ext"
 * ```
 */
export function toDisplayName(subset: string): string {
  return subset
    .replace(/[_-]unique-glyphs$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
