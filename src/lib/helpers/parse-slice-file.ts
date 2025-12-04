/**
 * Parses the content of a slice file and extracts codepoints.
 *
 * @param content - The string content of the slice file to parse.
 * @returns An array of number arrays, where each inner array contains the codepoints from a subset block.
 *
 * @example
 * const content = `
 * # 3 codepoints FreqRange target_len 100 actual_len 100
 * subsets {
 *   codepoints: 32 #  SPACE
 *   codepoints: 33 # ! EXCLAMATION MARK
 *   codepoints: 34 # " QUOTATION MARK
 * }
 * `;
 *
 * console.log(parseSliceFile(content));
 * // Output: [[32, 33, 34]]
 */
export const parseSliceFile = (content: string) =>
  (content.match(/(?<=^subsets \{$\n).+?(?=^}$)/gms) ?? []).map((m) =>
    (m.match(/(?<=^  codepoints: )\d+/gm) ?? []).map(Number),
  )
