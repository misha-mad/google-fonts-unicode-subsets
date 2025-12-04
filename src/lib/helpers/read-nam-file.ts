import {readFile} from 'fs/promises'
import {resolve} from 'path'
import {NAM_FILES_ROOT} from 'src/lib'

/**
 * Read a .nam file from the local submodule
 *
 * @param subset - The name of the subset (e.g., 'latin', 'cyrillic-ext')
 * @returns The content of the .nam file as a string
 * @throws Will throw an error if the file reading fails
 */
export const readNamFile = async (subset: string) => {
  const filePath = resolve(NAM_FILES_ROOT, `${subset}.nam`)

  try {
    return await readFile(filePath, 'utf-8')
  } catch (error) {
    throw new Error(`Failed to read ${subset} from ${filePath}: ${error}`)
  }
}
