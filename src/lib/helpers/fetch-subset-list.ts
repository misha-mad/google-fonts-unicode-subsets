import { GITHUB_API_URL } from "../constants";

/**
 * Fetch list of all .nam files from the repository
 * Returns an array of subset names (without .nam extension and _unique-glyphs suffix)
 */
export async function fetchSubsetList(): Promise<string[]> {
  console.log("📋 Fetching list of subsets from GitHub...");

  const response = await fetch(GITHUB_API_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch directory listing: ${response.statusText}`,
    );
  }

  const files = (await response.json()) as any[];
  const subsets: string[] = [];

  for (const file of files) {
    if (file.type === "file" && file.name.endsWith(".nam")) {
      // Remove .nam extension
      let subsetName = file.name.replace(/\.nam$/, "");

      if (!subsets.includes(subsetName)) {
        subsets.push(subsetName);
      }
    }
  }

  // Sort alphabetically for consistent output
  subsets.sort();

  console.log(`   ✅ Found ${subsets.length} subsets\n`);
  return subsets;
}
