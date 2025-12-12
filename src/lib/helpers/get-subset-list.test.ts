import {describe, expect, it, vi} from 'vitest'
import {getSubsetList} from './get-subset-list'
import {NAM_FILES_ROOT} from '../constants'
import {readdirSync} from 'node:fs'
vi.mock('node:fs', () => ({readdirSync: vi.fn()}))

describe('getSubsetList', () => {
  it('should fetch and parse subset list from local directory', () => {
    const mockFiles = ['latin.nam', 'cyrillic.nam', 'README.md', '.hidden']
    vi.mocked(readdirSync).mockReturnValue(mockFiles as any)
    const subsets = getSubsetList()
    expect(readdirSync).toHaveBeenCalledWith(NAM_FILES_ROOT)
    expect(subsets).toEqual(['cyrillic', 'latin'])
  })

  it('should throw error if read fails', () => {
    vi.mocked(readdirSync).mockImplementation(() => {
      throw new Error('Failed to read')
    })

    expect(() => getSubsetList()).toThrow('Failed to read')
  })
})
