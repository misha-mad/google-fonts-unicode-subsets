export type UnicodeRange = {
  start: number; // inclusive
  end: number; // inclusive
};

export type Subset = {
  id: string;
  label: string;
  ranges: UnicodeRange[];
  source: string; // URL or descriptor
};

/**
 * Very small placeholder parser for a tiny subset of .nam-like content.
 * Recognizes lines like `0000..007F` and converts them to numeric ranges.
 */
export function convertNamToRanges(
  name: string,
  url: string,
  namContent: string,
): Subset {
  const ranges: UnicodeRange[] = [];
  for (const raw of namContent.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([0-9A-Fa-f]{4,6})\.\.([0-9A-Fa-f]{4,6})$/);
    if (m) {
      const start = parseInt(m[1], 16);
      const end = parseInt(m[2], 16);
      if (!Number.isNaN(start) && !Number.isNaN(end) && start <= end) {
        ranges.push({ start, end });
      }
    }
  }
  return {
    id: name.replace(/\.nam$/i, ""),
    label: name,
    ranges,
    source: url,
  };
}
