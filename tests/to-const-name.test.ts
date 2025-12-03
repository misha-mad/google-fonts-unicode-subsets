import { describe, expect, it } from "vitest";
import { toConstName } from "../src/lib";

describe("toConstName", () => {
  it("should convert kebab-case to SCREAMING_SNAKE_CASE", () => {
    expect(toConstName("latin-ext_unique-glyphs")).toBe("LATIN_EXT");
  });

  it("should handle single words", () => {
    expect(toConstName("latin_unique-glyphs")).toBe("LATIN");
  });

  it("should handle multiple dashes", () => {
    expect(toConstName("long-subset-name_unique-glyphs")).toBe(
      "LONG_SUBSET_NAME",
    );
  });
});
