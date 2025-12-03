import { writeFileSync } from "fs";
import { resolve } from "path";
import {
  fetchSubsetList,
  readNamFile,
  parseNamFile,
  squashCodepoints,
  toConstName,
  toDisplayName,
} from "./lib";

/**
 * Main generation function
 */
async function generateJson() {
  console.log("🚀 Starting subset generation (JSON)...\n");

  // Fetch a dynamic list of subsets from GitHub
  const subsets = await fetchSubsetList();

  const finalData: Record<
    string,
    { name: string; subsets: (string | [string, string])[][] }
  > = {};

  let totalCodepoints = 0;
  let totalRanges = 0;

  // Download and process each subset
  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`);
      const content = await readNamFile(subset);
      const codepoints = parseNamFile(content);
      const ranges = squashCodepoints(codepoints);

      const constName = toConstName(subset);

      // Format ranges for JSON output
      const formattedRanges = ranges.map((r) => {
        if (Array.isArray(r)) {
          const start = "U+" + r[0].toString(16).toUpperCase().padStart(4, "0");
          const end = "U+" + r[1].toString(16).toUpperCase().padStart(4, "0");
          return [start, end] as [string, string];
        }
        return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
      });

      finalData[constName] = {
        name: toDisplayName(subset),
        subsets: [formattedRanges], // Nested array as requested
      };

      totalCodepoints += codepoints.length;
      totalRanges += ranges.length;

      console.log(
        `   ✅ ${codepoints.length} codepoints, ${ranges.length} ranges`,
      );
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  console.log(
    `\n📊 Total: ${totalCodepoints} codepoints in ${totalRanges} ranges\n`,
  );

  // Write to a file
  const outputPath = resolve(process.cwd(), "src/google-fonts-subsets.json");
  writeFileSync(outputPath, JSON.stringify(finalData, null, 2), "utf-8");

  console.log(`✅ File successfully generated: ${outputPath}`);
  console.log(`📦 Processed ${Object.keys(finalData).length} subsets`);
}

// Run the generator
generateJson().catch((error) => {
  console.error("❌ Generation failed:", error);
  process.exit(1);
});
