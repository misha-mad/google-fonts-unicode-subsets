import { writeFileSync } from "fs";
import { resolve } from "path";
import {
  fetchSubsetList,
  readNamFile,
  parseNamFile,
  codepointsToRanges,
  formatRange,
  toConstName,
  toDisplayName,
  type Range,
} from "./lib";

/**
 * Main generation function
 */
async function generateTypeScript() {
  console.log("🚀 Starting subset generation...\n");

  // Fetch a dynamic list of subsets from GitHub
  const subsets = await fetchSubsetList();

  const subsetsData: Record<string, { name: string; ranges: Range[] }> = {};
  let totalCodepoints = 0;
  let totalRanges = 0;

  // Download and process each subset
  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`);
      const content = await readNamFile(subset);
      const codepoints = parseNamFile(content);
      const ranges = codepointsToRanges(codepoints);

      const constName = toConstName(subset);
      subsetsData[constName] = {
        name: toDisplayName(subset),
        ranges,
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

  // Generate TypeScript file content
  let output = `/**
 * Google Fonts Unicode Subsets
 * Auto-generated from Google Fonts nam-files repository
 * Source: https://github.com/googlefonts/nam-files
 *
 * @generated - Do not edit manually
 * Run 'npm run generate:subsets' to update this file
 */

export const GOOGLE_FONTS_SUBSETS = {
`;

  // Add each subset
  for (const [constName, data] of Object.entries(subsetsData)) {
    output += `  ${constName}: {\n`;
    output += `    range: [\n`;

    // Add ranges (max 5 per line for readability)
    const formattedRanges = data.ranges.map(formatRange);
    for (let i = 0; i < formattedRanges.length; i++) {
      const isLast = i === formattedRanges.length - 1;
      output += `      ${formattedRanges[i]}${isLast ? "" : ","}\n`;
    }

    output += `    ] as (string | [string, string])[],\n`;
    output += `    name: '${data.name}',\n`;
    output += `  },\n\n`;
  }

  output += `};\n\n`;

  // Add priority order
  output += `export const PRIORITY_ORDER = [\n`;
  for (const constName of Object.keys(subsetsData)) {
    output += `  '${constName}',\n`;
  }
  output += `];\n`;

  // Write to a file
  const outputPath = resolve(process.cwd(), "src/google-fonts-subsets.ts");
  writeFileSync(outputPath, output, "utf-8");

  console.log(`✅ File successfully generated: ${outputPath}`);
  console.log(`📦 Processed ${Object.keys(subsetsData).length} subsets`);
}

// Run the generator
generateTypeScript().catch((error) => {
  console.error("❌ Generation failed:", error);
  process.exit(1);
});
