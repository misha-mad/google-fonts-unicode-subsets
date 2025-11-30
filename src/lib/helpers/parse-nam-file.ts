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
export function parseNamFile(content: string): number[] {
  const codepoints: number[] = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Extract hex value (format: 0xHEXVALUE)
    const match = trimmed.match(/^0x([0-9A-Fa-f]+)/);
    if (match) {
      codepoints.push(parseInt(match[1], 16));
    }
  }

  return codepoints;
}
