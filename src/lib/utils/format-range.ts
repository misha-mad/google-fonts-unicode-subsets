/**
 * Format a numeric codepoint into a string representation for TypeScript output.
 *
 * @param range - A codepoint number.
 * @returns A formatted string (e.g., "U+0041").
 *
 * @example
 * ```ts
 * formatCodepoint(0x41); // "U+0041"
 * ```
 */
const formatCodepoint = (codepoint: number) => `U+${codepoint.toString(16).toUpperCase().padStart(4, '0')}`

/**
 * Format a numeric range or single codepoint into a string representation for TypeScript output.
 *
 * @param rangeOrCodepoint - A single codepoint number or a [start, end] tuple.
 * @returns A formatted string (e.g., "U+0041" or "[0x0041, U+005A]").
 *
 * @example
 * ```ts
 * formatRange(0x41); // "U+0041"
 * formatRange([0x41, 0x5A]); // "[U+0041, U+005A]"
 * ```
 */
export const formatRange = (rangeOrCodepoint: number | [number, number]) =>
  Array.isArray(rangeOrCodepoint)
    ? ([formatCodepoint(rangeOrCodepoint[0]), formatCodepoint(rangeOrCodepoint[1])] as [string, string])
    : formatCodepoint(rangeOrCodepoint)
