import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {
  FontSubset,
  formatRange,
  getSubsetList,
  parseNamFile,
  readNamFile,
  squashCodepoints,
  toConstName,
  toDisplayName,
} from './lib'

/**
 * Main generation function.
 */
async function generateJson() {
  console.log('🚀 Starting subset generation (JSON)...\n')

  // Fetch a dynamic list of subsets from GitHub.
  const subsets = await getSubsetList()

  const dataUnicodeNotation: Record<string, FontSubset> = {}
  let totalCodepoints = 0
  let totalRanges = 0

  // Download and process each subset.
  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`)
      const content = await readNamFile(subset)
      const codepoints = parseNamFile(content)
      const ranges = squashCodepoints(codepoints)
      const constName = toConstName(subset)
      const formattedRanges = ranges.map((range) => formatRange(range))

      dataUnicodeNotation[constName] = {name: toDisplayName(subset), subsets: [formattedRanges]}
      totalCodepoints += codepoints.length
      totalRanges += ranges.length

      console.log(`   ✅ ${codepoints.length} codepoints, ${ranges.length} ranges`)
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`)
    }
  }

  console.log(`\n📊 Total: ${totalCodepoints} codepoints in ${totalRanges} ranges\n`)

  // Write to files.
  const pathUnicodeNotation = resolve(process.cwd(), 'src/google-fonts-subsets.json')

  writeFileSync(pathUnicodeNotation, JSON.stringify(dataUnicodeNotation), 'utf-8')

  console.log(`✅ File successfully generated: ${pathUnicodeNotation}`)

  console.log(`📦 Processed ${Object.keys(dataUnicodeNotation).length} subsets`)
}

// Run the generator.
generateJson().catch((error) => {
  console.error('❌ Generation failed:', error)
  process.exit(1)
})
