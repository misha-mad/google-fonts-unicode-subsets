export type NamFile = {
  name: string;
  url: string;
  content: string;
};

export type FetchOptions = {
  baseUrl?: string;
  signal?: AbortSignal;
};

/**
 * Placeholder fetcher for Google Fonts .nam files.
 * In future steps, this will retrieve the latest definitions from an official source.
 */
export async function fetchNamFiles(
  opts: FetchOptions = {},
): Promise<NamFile[]> {
  // Placeholder: return a tiny synthetic .nam file content for the scaffold.
  const content = `# Sample .nam file (placeholder)\n# Unicode ranges for Latin basic\n0000..007F\n`;
  return [
    {
      name: "latin.nam",
      url: (opts.baseUrl ?? "https://example.com/") + "latin.nam",
      content,
    },
  ];
}
