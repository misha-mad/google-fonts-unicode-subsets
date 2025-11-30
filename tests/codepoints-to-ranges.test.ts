import { describe, expect, it } from "bun:test";
import { codepointsToRanges } from "../src";

describe("codepointsToRanges", () => {
  it("should group consecutive codepoints", () => {
    const input = [1, 2, 3, 5, 7, 8, 9];
    const output = codepointsToRanges(input);

    expect(output).toEqual([[1, 3], 5, [7, 9]]);
  });

  it("should handle single items", () => {
    expect(codepointsToRanges([1])).toEqual([1]);
  });

  it("should handle empty array", () => {
    expect(codepointsToRanges([])).toEqual([]);
  });

  it("should handle unsorted input", () => {
    const input = [3, 1, 2];
    const output = codepointsToRanges(input);

    expect(output).toEqual([[1, 3]]);
  });
});
