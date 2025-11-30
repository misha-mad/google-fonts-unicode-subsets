import { describe, expect, it } from "bun:test";
import { toConstName } from "../src/lib";

describe("toConstName", () => {
  it("should convert kebab-case to SCREAMING_SNAKE_CASE", () => {
    expect(toConstName("latin-ext")).toBe("LATIN_EXT");
  });

  it("should handle single words", () => {
    expect(toConstName("latin")).toBe("LATIN");
  });

  it("should handle multiple dashes", () => {
    expect(toConstName("long-subset-name")).toBe("LONG_SUBSET_NAME");
  });
});
