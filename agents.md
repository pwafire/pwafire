# Agents Documentation & Style Guide

This file serves as both a changelog and style guide for PWAFire project.
Future LLM agents and contributors should follow these conventions.

---

## Style Guide

### Commit Message Format

**Pattern:**

```text
<type>(<scope>) - <description>
```

**Examples:**

```text
chore(cleanup) - standardize error handling across modules
fix(lazy-load) : #12345 - prevent CSS injection in background images
docs(readme) - update installation instructions
feat(notifications) - add support for notification actions
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `chore` - Maintenance, refactoring, cleanup
- `docs` - Documentation only
- `test` - Adding or fixing tests
- `ci` - CI/CD changes

**Scopes:**

- `cleanup` - Code quality, removing unused files
- `deps` - Dependency updates
- `github` - GitHub-specific changes
- Module names: `badging`, `clipboard`, `lazy-load`, etc.

### Code Style

#### Error Handling Pattern

**All PWA module functions MUST follow this pattern:**

```typescript
export const functionName = async (...args) => {
  try {
    // 1. Feature detection
    if (!featureAvailable) {
      return { ok: false, message: "API not supported" };
    }

    // 2. API call
    const result = await someAPI(...args);
    return { ok: true, message: "Success message", ...data };
  } catch (error) {
    // 3. Return error (never throw)
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Operation failed"
    };
  }
};
```

**Key Rules:**

- ✅ Always use try/catch
- ✅ Return `{ok: boolean, message: string}` format
- ✅ Never throw errors - catch and return them
- ✅ Use `error instanceof Error` for type safety
- ✅ Feature detection returns `{ok: false, message: "API not supported"}`
- ✅ Success returns `{ok: true, message: "...", ...optionalData}`

#### Type Safety Guidelines

**DO:**

- Use `unknown` for experimental browser APIs in types.d.ts
- Use `as any` casts only when necessary for untyped APIs
- Use `declare let` instead of `declare var`
- Keep type definitions minimal to avoid future conflicts

**DON'T:**

- Don't define comprehensive interfaces for browser APIs
- Don't use `any` in function parameters or return types
- Don't create custom interfaces that might conflict with future TS updates

**Example:**

```typescript
// ✅ Good - minimal typing
declare let BarcodeDetector: {
  new (options?: { formats: string[] }): unknown;
  getSupportedFormats(): Promise<string[]>;
};

// ❌ Bad - defining full interface
interface BarcodeDetectorFull {
  detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>;
  // ... many more properties
}
```

#### File Organization

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

### Code Formatting (Prettier)

**Configuration (`.prettierrc`):**

```json
{
  "printWidth": 120,
  "trailingComma": "all"
}
```

**Rules:**

- Line length: 120 characters max
- Trailing commas: Always add (ES5+ compatible)
- Other settings: Prettier defaults

**Format command:**

```bash
npm run format  # Formats all .ts files in src/
```

### Linting (ESLint)

**Configuration (`.eslintrc.json`):**

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ],
    "no-console": "off"
  }
}
```

**Key Rules:**

- `any` type: Warn (intentional uses are OK with justification)
- Explicit return types: Not required (inferred types are fine)
- Unused vars: Warn (except args starting with `_`)
- Console logs: Allowed (needed for PWA debugging)

**Lint command:**

```bash
npm run lint  # Check all .ts files in src/
```

### NPM Scripts

```bash
npm run build          # Build CJS, ESM, and type definitions
npm run dev            # Build in watch mode
npm test               # Run Jest tests
npm run test:coverage  # Run tests with coverage report
npm run lint           # Lint TypeScript files
npm run format         # Format code with Prettier
```

### Testing Requirements

**Before committing:**

```bash
cd packages/pwafire

# 1. Lint (should pass with 0 errors)
npm run lint

# 2. Build (should complete successfully)
npm run build

# 3. Test (all tests should pass)
npm test
```

**Expected results:**

- Lint: 0 errors (7 warnings for intentional `any` casts are OK)
- Build: CJS, ESM, and DTS files generated successfully
- Tests: All tests passing

---

## Maintenance Notes

### ESLint Warnings (Expected)

The 7 warnings about `any` types are **expected and safe**:

- `barcode/index.ts` - BarcodeDetector API
- `contacts/index.ts` - Contact Picker API
- `content-indexing/index.ts` - Content Index API
- `files/index.ts` - File System Access API
- `idle-detection/index.ts` - Idle Detection API
- `screen/index.ts` - Document Picture-in-Picture API

These are experimental browser APIs without TypeScript definitions.
**Do not "fix" these by defining custom interfaces.**

### Build Process

- Uses `tsup` for bundling (not TypeScript directly)
- Outputs: CJS (`lib/*.js`), ESM (`lib/*.mjs`), Types (`lib/*.d.ts`)
- Build time: ~8-9 seconds for type definitions

### For Future Agents

**When working on PWAFire:**

1. All PWA modules follow catch-and-return pattern - maintain consistency
2. Don't define new browser API interfaces - use `unknown` and `as any`
3. Error messages: `"Failed to {action}"` or `"{API} API not supported"`
4. All functions return `{ok: boolean, message: string, ...data?}`
5. Run lint, build, and test before committing
6. Commit format: `<type>(<scope>) - <description>`

**Verification:**

```bash
cd packages/pwafire
npm run lint    # 0 errors, 7 warnings OK
npm run build   # CJS, ESM, DTS generated
npm test        # All tests pass
```

---

## Future Improvements (Not Yet Implemented)

Identified but not implemented to keep changes focused:

1. **Add JSDoc comments** - Document error scenarios
2. **Expand test coverage** - Need 80%+ coverage (currently ~65%)
3. **Error codes/enums** - For programmatic error handling
4. **TypeDoc generation** - Auto-generate API docs
5. **Bundle size monitoring** - Track ESM chunk sizes
6. **Update CI/CD** - Test Node 18.x, 20.x, 22.x (currently 16.x EOL)
7. **Pre-commit hooks** - Enforce formatting/linting
8. **Coverage thresholds** - Add to Jest config

---

## Related Resources

- [PWAFire Documentation](https://docs.pwafire.org)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
