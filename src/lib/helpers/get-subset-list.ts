import {readdir} from 'fs/promises'
import {NAM_FILES_ROOT} from 'src/lib'

/**
 * Fetch list of all .nam files from the local submodule.
 *
 * @returns An array of subset names (without .nam extension) sorted alphabetically.
 */
export const getSubsetList = async () => {
  console.log('📋 Fetching list of subsets from local submodule...')

  try {
    const subsets = (await readdir(NAM_FILES_ROOT))
      .filter((file) => file.endsWith('.nam'))
      .map((file) => file.replace(/\.nam$/, ''))
      .sort()

    console.log(`   ✅ Found ${subsets.length} subsets\n`)

    return subsets
  } catch (error) {
    throw new Error(`Failed to read directory: ${error}`)
  }
}
