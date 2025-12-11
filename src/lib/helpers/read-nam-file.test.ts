import {describe, expect, it, vi} from 'vitest'
import {readNamFile} from './read-nam-file'
import {resolve} from 'node:path'
import {NAM_FILES_ROOT} from '../constants'
import {readFileSync} from 'node:fs'
vi.mock('node:fs', () => ({readFileSync: vi.fn()}))

describe('readNamFile', () => {
  it('should read nam file content successfully', () => {
    const mockContent = '# Latin\n0x0041'
    vi.mocked(readFileSync).mockReturnValue(mockContent)
    const content = readNamFile('latin')
    expect(readFileSync).toHaveBeenCalledWith(resolve(NAM_FILES_ROOT, 'latin.nam'), 'utf-8')
    expect(content).toBe(mockContent)
  })

  it('should throw error when read fails', () => {
    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error('Failed to read unknown')
    })

    expect(() => readNamFile('unknown')).toThrow('Failed to read unknown')
  })
})
