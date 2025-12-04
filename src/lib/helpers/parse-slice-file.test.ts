import {describe, expect, it} from 'vitest'
import {parseSliceFile} from './parse-slice-file'

describe('parseSliceFile', () => {
  it('should parse a single subset block correctly', () => {
    const content = `
# 3 codepoints FreqRange target_len 100 actual_len 100
subsets {
  codepoints: 65368 # ｘ FULLWIDTH LATIN SMALL LETTER X
  codepoints: 65369 # ｙ FULLWIDTH LATIN SMALL LETTER Y
  codepoints: 65370 # ｚ FULLWIDTH LATIN SMALL LETTER Z
  codepoints: 65371 # ｛ FULLWIDTH LEFT CURLY BRACKET
  codepoints: 65373 # ｝ FULLWIDTH RIGHT CURLY BRACKET
  codepoints: 65504 # ￠ FULLWIDTH CENT SIGN
}
`

    expect(parseSliceFile(content)).toEqual([[65368, 65369, 65370, 65371, 65373, 65504]])
  })

  it('should parse multiple subset blocks', () => {
    const content = `
# 3 codepoints FreqRange target_len 100 actual_len 100
subsets {
  codepoints: 65368 # ｘ FULLWIDTH LATIN SMALL LETTER X
  codepoints: 65369 # ｙ FULLWIDTH LATIN SMALL LETTER Y
  codepoints: 65370 # ｚ FULLWIDTH LATIN SMALL LETTER Z
}
subsets {
  codepoints: 65371 # ｛ FULLWIDTH LEFT CURLY BRACKET
  codepoints: 65373 # ｝ FULLWIDTH RIGHT CURLY BRACKET
  codepoints: 65504 # ￠ FULLWIDTH CENT SIGN
}
`

    expect(parseSliceFile(content)).toEqual([
      [65368, 65369, 65370],
      [65371, 65373, 65504],
    ])
  })
})
