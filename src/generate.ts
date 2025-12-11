import {writeFileSync} from 'fs'
import {resolve} from 'path'

import {
  FontSubsets,
  getSubsetList,
  parseNamFile,
  POPULARITY_ORDER,
  readNamFile,
  toConstName,
  toDisplayName,
} from './lib'

try {
  console.log('🚀 Starting subset generation (JSON)...\n')
  const subsets = getSubsetList()

  // Sort sets according to POPULARITY_ORDER.
  subsets.sort(
    ((orderMap) => (a, b) => {
      const indexA = orderMap[a] ?? Infinity
      const indexB = orderMap[b] ?? Infinity
      return indexA === indexB ? a.localeCompare(b) : indexA - indexB
    })(Object.fromEntries(POPULARITY_ORDER.map((name, i) => [name, i]))),
  )

  const dataUnicodeNotation: FontSubsets = {}
  let totalCodepoints = 0

  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`)
      const content = readNamFile(subset)
      const codepoints = parseNamFile(content)
      const constName = toConstName(subset)
      let finalSubsets: number[][] = [codepoints]
      dataUnicodeNotation[constName] = {name: toDisplayName(subset), subsets: finalSubsets}
      const currentCodepointsCount = finalSubsets.reduce((sum, s) => sum + s.length, 0)
      totalCodepoints += currentCodepointsCount
      console.log(`   ✅ ${currentCodepointsCount} codepoints, ${finalSubsets.length} subsets`)
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`)
    }
  }

  const pathUnicodeNotation = resolve(process.cwd(), 'src/google-fonts-subsets.json')
  writeFileSync(pathUnicodeNotation, JSON.stringify(dataUnicodeNotation), 'utf-8')
  console.log(`📊 Total: ${totalCodepoints} codepoints`)
  console.log(`✅ File successfully generated: ${pathUnicodeNotation}`)
  console.log(`📦 Processed ${Object.keys(dataUnicodeNotation).length} subsets`)
} catch (error) {
  console.error('❌ Generation failed:', error)
  process.exit(1)
}
