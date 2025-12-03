import { readdir } from "fs/promises";
import { NAM_FILES_ROOT } from "../constants";

/**
 * Fetch list of all .nam files from the local submodule.
 *
 * @returns An array of subset names (without .nam extension) sorted alphabetically.
 */
export const getSubsetList = async () => {
  console.log("📋 Fetching list of subsets from local submodule...");

  try {
    const files = await readdir(NAM_FILES_ROOT);
    const subsets: string[] = [];

    for (const file of files) {
      if (file.endsWith(".nam")) {
        // Remove .nam extension
        const subsetName = file.replace(/\.nam$/, "");

        if (!subsets.includes(subsetName)) {
          subsets.push(subsetName);
        }
      }
    }

    // Sort alphabetically for consistent output
    subsets.sort();

    console.log(`   ✅ Found ${subsets.length} subsets\n`);
    return subsets;
  } catch (error) {
    throw new Error(`Failed to read directory: ${error}`);
  }
};
