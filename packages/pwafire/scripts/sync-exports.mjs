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

const apiEntry = (subpath) => ({
  types: `./lib/${subpath}/index.d.ts`,
  import: `./lib/${subpath}/index.mjs`,
  require: `./lib/${subpath}/index.js`,
});

const exportsMap = {
  ".": {
    types: "./lib/index.d.ts",
    import: "./lib/index.mjs",
    require: "./lib/index.js",
  },
  "./check": apiEntry("check"),
  ...Object.fromEntries(apis.map((name) => [`./${name}`, apiEntry(`pwa/${name}`)])),
  "./package.json": "./package.json",
  "./*": {
    types: "./lib/pwa/*/index.d.ts",
    import: "./lib/pwa/*/index.mjs",
    require: "./lib/pwa/*/index.js",
  },
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
  console.log(`✓ exports in sync (${apis.length} APIs)`);
} else {
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  console.log(`✓ wrote ${apis.length} API exports + ./check, ./package.json, ./*`);
}
