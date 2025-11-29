import { describe, expect, it } from "bun:test";
import { fetchNamFiles, convertNamToRanges } from "../src";

describe("scaffold", () => {
  it("fetchNamFiles returns at least one file", async () => {
    const files = await fetchNamFiles();
    expect(files.length).toBeGreaterThan(0);
    expect(files[0].name.endsWith(".nam")).toBeTrue();
  });

  it("convertNamToRanges parses simple range", () => {
    const subset = convertNamToRanges(
      "latin.nam",
      "https://example/latin.nam",
      "0000..007F\n",
    );
    expect(subset.ranges.length).toBe(1);
    expect(subset.ranges[0]).toEqual({ start: 0x0000, end: 0x007f });
  });
});
