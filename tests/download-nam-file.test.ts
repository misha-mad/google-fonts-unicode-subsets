import { afterEach, describe, expect, it, mock } from "bun:test";
import { downloadNamFile } from "../src";
import { NAM_FILES_URL } from "../src/lib";

describe("downloadNamFile", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should download nam file content successfully", async () => {
    const mockContent = "# Latin\n0x0041";

    const mockFetch = mock(() =>
      Promise.resolve(new Response(mockContent, { status: 200 })),
    );

    // @ts-expect-error - fetch is mocked
    global.fetch = mockFetch;

    const content = await downloadNamFile("latin");

    expect(mockFetch).toHaveBeenCalledWith(`${NAM_FILES_URL}/latin.nam`);
    expect(content).toBe(mockContent);
  });

  it("should throw error when download fails", async () => {
    // @ts-expect-error - fetch is mocked
    global.fetch = mock(() =>
      Promise.resolve(
        new Response("Not Found", { status: 404, statusText: "Not Found" }),
      ),
    );

    await expect(downloadNamFile("unknown")).rejects.toThrow(
      "Failed to download unknown: Not Found",
    );
  });
});
