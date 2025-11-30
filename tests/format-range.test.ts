import { describe, expect, it } from "bun:test";
import { formatRange } from "../src/lib";

describe("formatRange", () => {
  it("should format a single number range", () => {
    expect(formatRange(0x0020)).toBe("'U+0020'");
  });

  it("should format a tuple range", () => {
    expect(formatRange([0x0020, 0x007f])).toBe("['U+0020', 'U+007F']");
  });

  it("should pad with zeros", () => {
    expect(formatRange(0xa)).toBe("'U+000A'");
    expect(formatRange([0xa, 0xf])).toBe("['U+000A', 'U+000F']");
  });
});
