import { describe, expect, it } from "bun:test";
import { formatRange } from "../src/lib";

describe("formatRange", () => {
  it("should format a single number range", () => {
    expect(formatRange(0x0020)).toBe("0x0020");
  });

  it("should format a tuple range", () => {
    expect(formatRange([0x0020, 0x007f])).toBe("[0x0020, 0x007f]");
  });

  it("should pad with zeros", () => {
    expect(formatRange(0xa)).toBe("0x000a");
    expect(formatRange([0xa, 0xf])).toBe("[0x000a, 0x000f]");
  });
});
