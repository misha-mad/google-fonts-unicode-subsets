import { describe, expect, it, vi } from "vitest";
import { fetchSubsetList } from "../src/lib";
import { NAM_FILES_ROOT } from "../src/lib";

// Mock fs/promises
vi.mock("fs/promises", () => {
  return {
    readdir: vi.fn(),
  };
});

import { readdir } from "fs/promises";

describe("fetchSubsetList", () => {
  it("should fetch and parse subset list from local directory", async () => {
    const mockFiles = ["latin.nam", "cyrillic.nam", "README.md", ".hidden"];

    vi.mocked(readdir).mockResolvedValue(mockFiles as any);

    const subsets = await fetchSubsetList();

    expect(readdir).toHaveBeenCalledWith(NAM_FILES_ROOT);
    expect(subsets).toEqual(["cyrillic", "latin"]);
  });

  it("should throw error if readdir fails", async () => {
    vi.mocked(readdir).mockRejectedValue(new Error("EACCES"));

    await expect(fetchSubsetList()).rejects.toThrow(
      "Failed to read directory: Error: EACCES",
    );
  });
});
