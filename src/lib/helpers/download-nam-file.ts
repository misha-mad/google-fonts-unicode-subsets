import { NAM_FILES_URL } from "../constants";

/**
 * Download a .nam file from the Google Fonts repository
 *
 * @param subset - The name of the subset (e.g., 'latin', 'cyrillic-ext')
 * @returns The content of the .nam file as a string
 * @throws Will throw an error if the download fails or the response is not OK
 */
export async function downloadNamFile(subset: string): Promise<string> {
  const url = `${NAM_FILES_URL}/${subset}.nam`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${subset}: ${response.statusText}`);
  }

  return response.text();
}
