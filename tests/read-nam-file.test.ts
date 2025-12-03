import { describe, expect, it, vi } from "vitest";
import { readNamFile } from "../src";
import { resolve } from "path";
import { NAM_FILES_ROOT } from "../src/lib";

// Mock fs/promises
vi.mock("fs/promises", () => {
  return {
    readFile: vi.fn(),
  };
});

import { readFile } from "fs/promises";

describe("readNamFile", () => {
  it("should read nam file content successfully", async () => {
    const mockContent = "# Latin\n0x0041";
    vi.mocked(readFile).mockResolvedValue(mockContent);

    const content = await readNamFile("latin");

    expect(readFile).toHaveBeenCalledWith(
      resolve(NAM_FILES_ROOT, "latin.nam"),
      "utf-8",
    );
    expect(content).toBe(mockContent);
  });

  it("should throw error when read fails", async () => {
    vi.mocked(readFile).mockRejectedValue(new Error("ENOENT"));

    await expect(readNamFile("unknown")).rejects.toThrow(
      "Failed to read unknown",
    );
  });
});
