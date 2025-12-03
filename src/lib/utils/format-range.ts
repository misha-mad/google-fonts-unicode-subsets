/**
 * Format a numeric range or single codepoint into a string representation for TypeScript output.
 *
 * @param range - A single codepoint number or a [start, end] tuple.
 * @returns A formatted string (e.g., "U+0041" or "[0x0041, U+005A]").
 *
 * @example
 * ```ts
 * formatRange(0x41); // "U+0041"
 * formatRange([0x41, 0x5A]); // "[U+0041, U+005A]"
 * ```
 */
export const formatRange = (range: number | [number, number]) =>
  Array.isArray(range)
    ? ([
        `U+${range[0].toString(16).toUpperCase().padStart(4, "0")}`,
        `U+${range[1].toString(16).toUpperCase().padStart(4, "0")}`,
      ] as [string, string])
    : `U+${range.toString(16).toUpperCase().padStart(4, "0")}`;
