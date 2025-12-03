/**
 * Parse .nam file content and extract codepoints.
 *
 * @param content - The raw content of the .nam file.
 * @returns An array of unicode codepoints (as numbers).
 *
 * @example
 * ```ts
 * const codepoints = parseNamFile("# Latin\n0x0041");
 * // [65]
 * ```
 */
export const parseNamFile = (content: string) =>
  (content.match(/(?<=^0x)\p{Hex_Digit}+/gmu) ?? []).map((hexValue) =>
    parseInt(hexValue, 16)
  );
