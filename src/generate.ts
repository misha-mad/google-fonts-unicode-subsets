import {readFile} from 'fs/promises'
import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {
  FontSubset,
  getSubsetList,
  parseNamFile,
  parseSliceFile,
  readNamFile,
  SLICE_MAP,
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

  // Download and process each subset.
  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`)
      const content = await readNamFile(subset)
      const codepoints = parseNamFile(content)
      const constName = toConstName(subset)
      let finalSubsets: number[][] = [codepoints]

      if (SLICE_MAP[subset]) {
        console.log(`   🔪 Processing slice file for ${subset}...`)

        try {
          const slicePath = resolve(process.cwd(), 'nam-files/slices', SLICE_MAP[subset])
          const sliceContent = await readFile(slicePath, 'utf-8')
          const slices = parseSliceFile(sliceContent)

          if (slices.length > 0) {
            // Reverse slices so subsets go from highest to lowest priority.
            // https://github.com/googlefonts/nam-files/blob/80f8e537a43ff6754810666709740dc18de8a17f/slices/hongkong-chinese_default.txt#L126
            finalSubsets = slices.reverse()
            console.log(`   ✅ Applied ${slices.length} slices from ${SLICE_MAP[subset]}`)
          } else {
            console.warn(`   ⚠️ Slice file found but no subsets parsed for ${subset}`)
          }
        } catch (e: any) {
          console.error(`   ❌ Failed to load slices for ${subset}: ${e.message}`)
        }
      }

      dataUnicodeNotation[constName] = {name: toDisplayName(subset), subsets: finalSubsets}
      const currentCodepointsCount = finalSubsets.reduce((sum, s) => sum + s.length, 0)
      totalCodepoints += currentCodepointsCount
      console.log(`   ✅ ${currentCodepointsCount} codepoints, ${finalSubsets.length} subsets`)
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`)
    }
  }

  console.log(`\n📊 Total: ${totalCodepoints} codepoints\n`)

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
