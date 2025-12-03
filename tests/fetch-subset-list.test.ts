import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchSubsetList } from "../src";
import { GITHUB_API_URL } from "../src/lib";

describe("fetchSubsetList", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should fetch and parse subset list", async () => {
    const mockResponse = [
      { name: "latin.nam", type: "file" },
      { name: "cyrillic.nam", type: "file" },
      { name: "README.md", type: "file" },
      { name: "ignored", type: "dir" },
    ];

    const mockFetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify(mockResponse), { status: 200 }),
      ),
    );

    global.fetch = mockFetch;

    const subsets = await fetchSubsetList();

    expect(mockFetch).toHaveBeenCalledWith(GITHUB_API_URL);
    expect(subsets).toEqual(["cyrillic", "latin"]);
  });

  it("should throw error if fetch fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response("Error", { status: 500, statusText: "Server Error" }),
      ),
    );

    await expect(fetchSubsetList()).rejects.toThrow(
      "Failed to fetch directory listing: Server Error",
    );
  });
});
