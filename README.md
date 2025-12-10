# google-fonts-unicode-subsets

A generator and dataset of Unicode subsets for Google Fonts, built from the official `.nam` files.

This package converts the raw `.nam` definitions used by Google Fonts into a structured, machine-readable JSON dataset. It provides optimized Unicode ranges for various scripts (Latin, Cyrillic, Greek, etc.), making it easy to use these subsets in your own tools, font subsetting pipelines, or web performance optimizations.

## Features

- **Comprehensive**: Covers dozens of scripts including Latin, Cyrillic, Greek, Arabic, Hebrew, Thai, Chinese, Japanese, Korean, and more.
- **Ready-to-use**: Exports a pre-generated, type-safe JSON object containing all subsets.
- **Up-to-date**: Generated directly from the official Google Fonts source files.
- **Zero Runtime Dependencies**: The package only contains data and type definitions.

## Installation

```bash
# npm
npm install google-fonts-unicode-subsets

# yarn
yarn add google-fonts-unicode-subsets

# pnpm
pnpm add google-fonts-unicode-subsets
```

## Usage

Import `GOOGLE_FONTS_SUBSETS` to access the data. The keys are constant-cased names of the subsets (e.g., `LATIN_UNIQUE_GLYPHS`).

```typescript
import { GOOGLE_FONTS_SUBSETS } from 'google-fonts-unicode-subsets'

// Example: Accessing the Latin subset
const latinSubset = GOOGLE_FONTS_SUBSETS['LATIN']

console.log(latinSubset.name)
// Output: "Latin"

console.log(latinSubset.subsets)
// Output: [[32, 33, ...], [65, 66, ...]]
// Returns an array of number arrays, where each inner array represents a set of codepoints.
```

### TypeScript Support

The package includes TypeScript definitions. The data follows this structure:

```typescript
export type FontSubsets = {
  [key: string]: {
    name: string
    subsets: number[][]
  }
}
```

## Development

To generate the dataset locally or contribute to the project:

1. **Clone the repository:**
   This project uses git submodules. Make sure to clone recursively:
   ```bash
   git clone --recursive https://github.com/misha-mad/google-fonts-unicode-subsets.git
   cd google-fonts-unicode-subsets
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate the dataset:**
   This script parses the `.nam` files in `nam-files/` and updates `src/google-fonts-subsets.json`.
   ```bash
   npm run generate
   ```

4. **Build:**
   Compiles the TypeScript source into `dist/`.
   ```bash
   npm run build
   ```

5. **Test:**
   ```bash
   npm test
   ```

## Scripts

- `npm run generate`: Generates the JSON dataset from source `.nam` files.
- `npm run build`: Builds the project for distribution (ESM and CJS).
- `npm run typecheck`: Runs TypeScript type checking.
- `npm run format`: Formats code with Prettier.
- `npm test`: Runs unit tests.

## License

MIT
