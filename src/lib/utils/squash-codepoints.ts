/**
 * Convert array of codepoints to optimized ranges.
 * Consecutive codepoints are grouped into [start, end] ranges.
 * Single codepoints remain as numbers.
 *
 * @param codepoints - An array of unicode codepoint numbers.
 * @returns An array of optimized ranges (numbers or tuples).
 *
 * @example
 * ```ts
 * squashCodepoints([1, 2, 3, 5]); // [[1, 3], 5]
 * ```
 */
export const squashCodepoints = (codepoints: number[]) => {
  if (codepoints.length === 0) return [];

  const sorted = [...codepoints].sort((a, b) => a - b);
  const ranges: Array<number | [number, number]> = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      // Continue the range.
      end = sorted[i];
    } else {
      // Save the current range and start a new one.
      ranges.push(start === end ? start : [start, end]);
      start = end = sorted[i];
    }
  }

  // Add the last range.
  ranges.push(start === end ? start : [start, end]);
  return ranges;
};
