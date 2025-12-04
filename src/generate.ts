import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {FontSubsets, getSubsetList, parseNamFile, readNamFile, toConstName, toDisplayName} from './lib'

/**
 * Main generation function.
 */
async function generateJson() {
  console.log('🚀 Starting subset generation (JSON)...\n')

  // Fetch a dynamic list of subsets from GitHub.
  const subsets = await getSubsetList()

  const dataUnicodeNotation: FontSubsets = {}
  let totalCodepoints = 0
  let totalRanges = 0

  // Download and process each subset.
  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`)
      const content = await readNamFile(subset)
      const codepoints = parseNamFile(content)
      const constName = toConstName(subset)

      dataUnicodeNotation[constName] = {name: toDisplayName(subset), subsets: [codepoints]}
      totalCodepoints += codepoints.length
      totalRanges += codepoints.length

      console.log(`   ✅ ${codepoints.length} codepoints, ${codepoints.length} ranges`)
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
