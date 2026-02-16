# File Organization

## Project Structure

```text
packages/pwafire/
├── src/
│   ├── pwa/              # PWA modules (one per feature)
│   │   ├── badging/
│   │   │   └── index.ts  # Export pattern
│   │   └── ...
│   ├── check/            # Feature detection utilities
│   ├── index.ts          # Main entry point
│   └── types.d.ts        # Minimal type definitions
├── lib/                  # Build output (gitignored)
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
└── tsconfig.json         # TypeScript configuration
```

## Module Organization
- One primary export per file
- Helper functions in same file if small
- Extract to separate file if reusable
- Named exports preferred over default exports

## Export Pattern: Object vs Flat

**Use an object when:** Methods belong to one cohesive flow and are typically used together.

**Use flat exports when:** Methods are independent use cases and are typically used one at a time.

| Criterion | Object (`passkey.create`) | Flat (`pickFile`, `copyText`) |
|-----------|---------------------------|------------------------------|
| Flow | Single flow; methods are steps in one lifecycle | Multiple flows; methods are different tools |
| Usage | Need multiple methods together | Use one method at a time |
| Example | passkey: create → get → signalUnknown | files: pickFile, createFile, readFiles (independent) |

**Examples:**
- `passkey` → object: registration and authentication are both required for passkey auth
- `files` → flat: pickFile, createFile, writeFile are separate use cases

## Exports & Imports
- Export at declaration:
  ```typescript
  export const apiName = async () => {};
  export const passkey = { create: async () => {}, get: async () => {} };
  ```
- Import order: external, internal, relative
- Group by type:
  ```typescript
  // External dependencies
  import { something } from "external-package";

  // Internal modules
  import { helper } from "./utils";

  // Relative imports
  import { config } from "../config";
  ```
