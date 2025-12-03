import { describe, expect, it } from "vitest";
import { parseNamFile } from "../src/lib";

describe("parseNamFile", () => {
  it("should parse hex codepoints and ignore comments", () => {
    const content = `# Comment\n0x0041\n0x0042  # B\n\n0x0043\n`;

    const codepoints = parseNamFile(content);

    expect(codepoints).toEqual([0x41, 0x42, 0x43]);
  });

  it("should handle empty file", () => {
    const codepoints = parseNamFile("");

    expect(codepoints).toEqual([]);
  });

  it("should handle malformed lines gracefully (or ignore them)", () => {
    const content = "invalid\n0x0041";

    // implementation checks if startsWith 0x
    const codepoints = parseNamFile(content);

    expect(codepoints).toEqual([0x41]);
  });
});
