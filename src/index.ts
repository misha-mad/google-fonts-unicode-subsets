import subsetsUnicodeNotation from "./google-fonts-subsets-unicode-notation.json";
import subsetsHexadecimalNotation from "./google-fonts-subsets-hexadecimal-notation.json";
import subsetsUnicodeRange from "./google-fonts-subsets-unicode-range.json";
import {
  FontSubsetUnicodeNotation,
  FontSubsetHexadecimalNotation,
  FontSubsetUnicodeRange,
} from "./lib/types/font-subsets";

export type GoogleFontsSubsetsUnicodeNotation = Record<
  string,
  FontSubsetUnicodeNotation
>;

export const GOOGLE_FONTS_SUBSETS_UNICODE_NOTATION =
  subsetsUnicodeNotation as GoogleFontsSubsetsUnicodeNotation;

export type GoogleFontsSubsetsHexadecimalNotation = Record<
  string,
  FontSubsetHexadecimalNotation
>;

export const GOOGLE_FONTS_SUBSETS_HEXADECIMAL_NOTATION =
  subsetsHexadecimalNotation as GoogleFontsSubsetsHexadecimalNotation;

export type GoogleFontsSubsetsUnicodeRange = Record<
  string,
  FontSubsetUnicodeRange
>;

export const GOOGLE_FONTS_SUBSETS_UNICODE_RANGE =
  subsetsUnicodeRange as GoogleFontsSubsetsUnicodeRange;
