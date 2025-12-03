import subsets from "./google-fonts-subsets.json";
import { FontSubset } from "./lib/types/font-subsets";

export type GoogleFontsSubsets = Record<string, FontSubset>;
export const GOOGLE_FONTS_SUBSETS = subsets as GoogleFontsSubsets;
