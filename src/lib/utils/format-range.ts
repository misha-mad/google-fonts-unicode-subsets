import type { Range } from "../types/range";

/**
 * Format a numeric range or single codepoint into a string representation for TypeScript output.
 *
 * @param range - A single codepoint number or a [start, end] tuple.
 * @returns A formatted string (e.g., "0x0041" or "[0x0041, 0x005A]").
 *
 * @example
 * ```ts
 * formatRange(0x41); // "0x0041"
 * formatRange([0x41, 0x5A]); // "[0x0041, 0x005A]"
 * ```
 */
export function formatRange(range: Range): string {
  if (Array.isArray(range)) {
    const start = `'U+${range[0].toString(16).toUpperCase().padStart(4, "0")}'`;
    const end = `'U+${range[1].toString(16).toUpperCase().padStart(4, "0")}'`;
    return `[${start}, ${end}]`;
  }
  return `'U+${range.toString(16).toUpperCase().padStart(4, "0")}'`;
}
