import {describe, expect, it} from 'vitest'
import {toDisplayName} from '../src/lib'

describe('toDisplayName', () => {
  it('should convert kebab-case to Title Case', () => {
    expect(toDisplayName('latin-ext_unique-glyphs')).toBe('Latin Ext')
  })

  it('should handle single words', () => {
    expect(toDisplayName('latin_unique-glyphs')).toBe('Latin')
  })

  it('should handle multiple dashes', () => {
    expect(toDisplayName('long-subset-name_unique-glyphs')).toBe('Long Subset Name')
  })
})
