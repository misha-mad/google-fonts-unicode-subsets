import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {FontSubsets, getSubsetList, parseNamFile, readNamFile, toConstName, toDisplayName} from './lib'

async function generateJson() {
  console.log('🚀 Starting subset generation (JSON)...\n')
  const subsets = await getSubsetList()

  const POPULARITY_ORDER = [
    'latin_unique-glyphs',
    'latin-ext_unique-glyphs',
    'cyrillic_unique-glyphs',
    'cyrillic-ext_unique-glyphs',
    'greek_unique-glyphs',
    'greek-ext_unique-glyphs',
    'vietnamese_unique-glyphs',
    'chinese-simplified_unique-glyphs',
    'chinese-traditional_unique-glyphs',
    'chinese-hongkong_unique-glyphs',
    'japanese_unique-glyphs',
    'korean_unique-glyphs',
    'arabic_unique-glyphs',
    'hebrew_unique-glyphs',
    'devanagari_unique-glyphs',
    'thai_unique-glyphs',
    'math_unique-glyphs',
  ]

  subsets.sort((a, b) => {
    const indexA = POPULARITY_ORDER.indexOf(a)
    const indexB = POPULARITY_ORDER.indexOf(b)

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }

    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return a.localeCompare(b)
  })

  const dataUnicodeNotation: FontSubsets = {}
  let totalCodepoints = 0

  for (const subset of subsets) {
    try {
      console.log(`📥 Reading ${subset}...`)
      const content = await readNamFile(subset)
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
}

generateJson().catch((error) => {
  console.error('❌ Generation failed:', error)
  process.exit(1)
})
