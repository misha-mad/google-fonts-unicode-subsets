import subsetsUnicodeNotation from "./google-fonts-subsets.json";
import { FontSubset } from "./lib";

export type GoogleFontsSubsetsUnicodeNotation = Record<string, FontSubset>;

export const GOOGLE_FONTS_SUBSETS =
  subsetsUnicodeNotation as GoogleFontsSubsetsUnicodeNotation;
