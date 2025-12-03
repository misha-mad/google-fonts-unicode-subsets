export type FontSubsetUnicodeNotation = {
  name: string;
  subsets: Array<Array<string | [string, string]>>;
};

export type FontSubsetHexadecimalNotation = {
  name: string;
  subsets: Array<Array<string | [string, string]>>;
};

export type FontSubsetUnicodeRange = {
  name: string;
  css: string;
};
