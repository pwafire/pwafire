#!/usr/bin/env node
// Regenerate the "exports" map in package.json from src/pwa/*/index.ts.
// Run: node scripts/sync-exports.mjs            (writes package.json)
//      node scripts/sync-exports.mjs --check    (exits 1 on drift; used in CI)

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const pkgPath = join(pkgRoot, "package.json");
const pwaDir = join(pkgRoot, "src/pwa");

const apis = readdirSync(pwaDir)
  .filter((name) => {
    const full = join(pwaDir, name);
    return statSync(full).isDirectory() && existsSync(join(full, "index.ts"));
  })
  .sort();

// `browser` is listed before `import` so bundler/runtime resolvers that
// honor it (Vite, esbuild via tsup --platform=browser, Webpack) pick the
// browser build for SSR-aware consumers.
const apiEntry = (subpath) => ({
  types: `./lib/${subpath}/index.d.ts`,
  browser: `./lib/${subpath}/index.mjs`,
  import: `./lib/${subpath}/index.mjs`,
  require: `./lib/${subpath}/index.js`,
});

const exportsMap = {
  ".": apiEntry(""),
  "./check": apiEntry("check"),
  "./capability": apiEntry("capability"),
  ...Object.fromEntries(apis.map((name) => [`./${name}`, apiEntry(`pwa/${name}`)])),
  "./package.json": "./package.json",
  "./*": {
    types: "./lib/pwa/*/index.d.ts",
    browser: "./lib/pwa/*/index.mjs",
    import: "./lib/pwa/*/index.mjs",
    require: "./lib/pwa/*/index.js",
  },
};

// Root entry uses lib/index.* (no /pwa prefix); fix up after the helper.
exportsMap["."] = {
  types: "./lib/index.d.ts",
  browser: "./lib/index.mjs",
  import: "./lib/index.mjs",
  require: "./lib/index.js",
};

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const before = JSON.stringify(pkg.exports);
pkg.exports = exportsMap;
const after = JSON.stringify(pkg.exports);

const check = process.argv.includes("--check");
if (check) {
  if (before !== after) {
    console.error("✗ package.json exports out of sync with src/pwa/. Run: npm run -w pwafire sync:exports");
    process.exit(1);
  }
  console.log(`✓ exports in sync (${apis.length} APIs + check + capability)`);
} else {
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  console.log(`✓ wrote ${apis.length} API exports + ./check, ./capability, ./package.json, ./*`);
}
