# google-fonts-unicode-subsets

A generator and dataset of Unicode subsets for Google Fonts, built from the official `.nam` files. The tool fetches the latest definitions, converts them into optimized Unicode ranges, and exports them in a build‑tool‑friendly format.

Status: repository initialized with Bun only (no extra tooling yet). Implementation is a minimal scaffold; real fetching/parsing will be added next.

Quick start (Bun)

1. Install Bun if you don’t have it yet (macOS / Linux):

```
curl -fsSL https://bun.com/install | bash
```

2. Install dependencies:

```
bun install
```

3. Build bundled outputs (dist/):

```
bun run build
```

4. Run tests:

```
bun test
```

5. Type-check and format

```
bun run typecheck
bun run format
```

Notes

- Bun is used as the package manager/runtime. TypeScript and Prettier are added as dev dependencies.
- The library currently produces a placeholder dataset. Real fetching/parsing will be added in subsequent steps.
