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

/**
 * Main generation function.
 */
async function generateJson() {
  console.log("🚀 Starting subset generation (JSON)...\n");

  // Fetch a dynamic list of subsets from GitHub.
  const subsets = await getSubsetList();

  const dataUnicodeNotation: Record<
    string,
    { name: string; subsets: Array<Array<string | [string, string]>> }
  > = {};

  const dataHexadecimalNotation: Record<
    string,
    { name: string; subsets: Array<Array<string | [string, string]>> }
  > = {};

  const dataUnicodeRange: Record<string, { name: string; css: string }> = {};

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

      // Format ranges for U+ JSON output.
      const rangesU = ranges.map((r) => {
        if (Array.isArray(r)) {
          const start = "U+" + r[0].toString(16).toUpperCase().padStart(4, "0");
          const end = "U+" + r[1].toString(16).toUpperCase().padStart(4, "0");
          return [start, end] as [string, string];
        }

        return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
      });

      // Format ranges for 0x JSON output
      const ranges0x = ranges.map((r) => {
        if (Array.isArray(r)) {
          const start = "0x" + r[0].toString(16).toUpperCase().padStart(4, "0");
          const end = "0x" + r[1].toString(16).toUpperCase().padStart(4, "0");
          return [start, end] as [string, string];
        }

        return "0x" + r.toString(16).toUpperCase().padStart(4, "0");
      });

      // Format ranges for CSS output
      const cssParts = ranges.map((r) => {
        if (Array.isArray(r)) {
          const start = r[0].toString(16).toUpperCase().padStart(4, "0");
          const end = r[1].toString(16).toUpperCase().padStart(4, "0");
          return `U+${start}-${end}`;
        }

        return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
      });

      const cssString = cssParts.join(", ");

      dataUnicodeNotation[constName] = {
        name: toDisplayName(subset),
        subsets: [rangesU],
      };

      dataHexadecimalNotation[constName] = {
        name: toDisplayName(subset),
        subsets: [ranges0x],
      };

      dataUnicodeRange[constName] = {
        name: toDisplayName(subset),
        css: cssString,
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
    "src/google-fonts-subsets-unicode-notation.json",
  );

  writeFileSync(
    pathUnicodeNotation,
    JSON.stringify(dataUnicodeNotation, null, 2),
    "utf-8",
  );

  console.log(`✅ File successfully generated: ${pathUnicodeNotation}`);

  const pathHexadecimalNotation = resolve(
    process.cwd(),
    "src/google-fonts-subsets-hexadecimal-notation.json",
  );

  writeFileSync(
    pathHexadecimalNotation,
    JSON.stringify(dataHexadecimalNotation, null, 2),
    "utf-8",
  );

  console.log(`✅ File successfully generated: ${pathHexadecimalNotation}`);

  const pathUnicodeRange = resolve(
    process.cwd(),
    "src/google-fonts-subsets-unicode-range.json",
  );

  writeFileSync(
    pathUnicodeRange,
    JSON.stringify(dataUnicodeRange, null, 2),
    "utf-8",
  );

  console.log(`✅ File successfully generated: ${pathUnicodeRange}`);

  console.log(
    `📦 Processed ${Object.keys(dataUnicodeNotation).length} subsets`,
  );
}

// Run the generator.
generateJson().catch((error) => {
  console.error("❌ Generation failed:", error);
  process.exit(1);
});
