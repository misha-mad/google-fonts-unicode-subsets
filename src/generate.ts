import { writeFileSync } from "fs";
import { resolve } from "path";
import {
  getSubsetList,
  readNamFile,
  parseNamFile,
  squashCodepoints,
  toConstName,
  toDisplayName,
} from "./lib";
import { FontSubset } from "./lib/types/font-subsets";

/**
 * Main generation function.
 */
async function generateJson() {
  console.log("🚀 Starting subset generation (JSON)...\n");

  // Fetch a dynamic list of subsets from GitHub.
  const subsets = await getSubsetList();

  const dataUnicodeNotation: Record<string, FontSubset> = {};
  let totalCodepoints = 0;
  let totalRanges = 0;

  // Download and process each subset.
  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`);
      const content = await readNamFile(subset);
      const codepoints = parseNamFile(content);
      const ranges = squashCodepoints(codepoints);
      const constName = toConstName(subset);

      // Format ranges for JSON output.
      const formattedRanges = ranges.map((r) => {
        if (Array.isArray(r)) {
          const start = "U+" + r[0].toString(16).toUpperCase().padStart(4, "0");
          const end = "U+" + r[1].toString(16).toUpperCase().padStart(4, "0");
          return [start, end] as [string, string];
        }

        return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
      });

      dataUnicodeNotation[constName] = {
        name: toDisplayName(subset),
        subsets: [formattedRanges],
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

  // Write to files.
  const pathUnicodeNotation = resolve(
    process.cwd(),
    "src/google-fonts-subsets.json",
  );

  writeFileSync(
    pathUnicodeNotation,
    JSON.stringify(dataUnicodeNotation, null, 2),
    "utf-8",
  );

  console.log(`✅ File successfully generated: ${pathUnicodeNotation}`);

  console.log(
    `📦 Processed ${Object.keys(dataUnicodeNotation).length} subsets`,
  );
}

// Run the generator.
generateJson().catch((error) => {
  console.error("❌ Generation failed:", error);
  process.exit(1);
});
