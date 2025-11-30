import { build } from "bun";

console.log("Building ESM...");

const esmBuild = await build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  target: "bun",
  naming: "[name].js",
  sourcemap: "external",
  minify: true,
});

if (!esmBuild.success) {
  console.error("ESM Build failed:", esmBuild.logs);
  process.exit(1);
}

console.log("Building CJS...");

const cjsBuild = await build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  target: "node",
  format: "cjs",
  naming: "[name].cjs",
  sourcemap: "external",
  minify: true,
});

if (!cjsBuild.success) {
  console.error("CJS Build failed:", cjsBuild.logs);
  process.exit(1);
}

console.log("Build complete.");
