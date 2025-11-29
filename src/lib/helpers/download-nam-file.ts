import { NAM_FILES_URL } from "../constants";

/**
 * Download a .nam file from the Google Fonts repository
 */
export async function downloadNamFile(subset: string): Promise<string> {
  const url = `${NAM_FILES_URL}/${subset}.nam`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${subset}: ${response.statusText}`);
  }

  return response.text();
}
