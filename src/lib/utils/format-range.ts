import type { Range } from "../types/range";

/**
 * Format range for TypeScript output
 */
export function formatRange(range: Range): string {
  if (Array.isArray(range)) {
    const start = `0x${range[0].toString(16).padStart(4, "0")}`;
    const end = `0x${range[1].toString(16).padStart(4, "0")}`;
    return `[${start}, ${end}]`;
  }
  return `0x${range.toString(16).padStart(4, "0")}`;
}
