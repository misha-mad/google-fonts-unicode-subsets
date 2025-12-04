import {describe, expect, it} from 'vitest'
import {squashCodepoints} from './squash-codepoints'

describe('squashCodepoints', () => {
  it('should group consecutive codepoints', () => {
    const input = [1, 2, 3, 5, 7, 8, 9]
    const output = squashCodepoints(input)

    expect(output).toEqual([[1, 3], 5, [7, 9]])
  })

  it('should handle single items', () => {
    expect(squashCodepoints([1])).toEqual([1])
  })

  it('should handle empty array', () => {
    expect(squashCodepoints([])).toEqual([])
  })

  it('should handle unsorted input', () => {
    const input = [3, 1, 2]
    const output = squashCodepoints(input)

    expect(output).toEqual([[1, 3]])
  })
})
