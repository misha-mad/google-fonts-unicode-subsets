type Subsets = Array<Array<string | [string, string]>>;

export type FontSubsetUnicodeNotation = {
  name: string;
  subsets: Subsets;
};

export type FontSubsetHexadecimalNotation = {
  name: string;
  subsets: Subsets;
};

export type FontSubsetUnicodeRange = {
  name: string;
  "unicode-range": string;
};
