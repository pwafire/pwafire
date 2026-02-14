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

### Naming Conventions

#### Functions & Variables
- Use camelCase for all function and variable names
- Examples: `webShare`, `copyText`, `screenShare`, `accessFonts`
- Check API functions match main API names: `check.webShare()` for `webShare()`
- Boolean prefix: `isValid`, `hasPermission`, `canEdit`

#### Files & Directories
- Use kebab-case for directories: `web-share`, `idle-detection`
- Use camelCase for TypeScript files when exporting single function
- Index files: Always use `index.ts` for module exports

#### API Naming
- Keep names concise and descriptive
- Avoid verbose names: `screenShare` not `screenSharingControls`
- Be consistent: if main API is `webShare`, check is `webShare()`
- Verb-noun pattern: what it does, not what it is

#### Constants
- SCREAMING_SNAKE_CASE for true constants: `const MAX_RETRY_ATTEMPTS = 3`
- Use uppercase sparingly - only for values that never change

#### Types/Interfaces
- PascalCase: `ResponseType`, `ConfigOptions`
- Descriptive suffixes: `UserConfig`, `ApiResponse`, `ErrorMessage`

### Code Style

#### Code Formatting
- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Soft limit 100 chars, hard limit 120 chars
- **Semicolons**: Always use semicolons
- **Quotes**: Double quotes for strings: `"hello"`, backticks for templates
- **Trailing Commas**: Use in multi-line objects/arrays

#### Comments Policy
- **DO NOT add code comments** - removed on purpose
- Code should be self-documenting
- Use clear variable and function names instead
- Extract complex logic into named functions
- JSDoc only for public APIs when needed for IDE hints

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

#### Function Style

**Arrow Functions:**
- Use arrow functions for consistency
- Example:
  ```typescript
  export const functionName = async (params: Type) => {
    // implementation
  };
  ```

**Function Length:**
- Keep functions short and focused (under 30 lines)
- Extract complex logic into helper functions
- One responsibility per function

**Parameters:**
- Maximum 3 parameters
- Use object parameter for more than 3
- Example:
  ```typescript
  // Good
  export const apiName = async (config: { prop1: string; prop2: number }) => {};

  // Avoid
  export const apiName = async (p1: string, p2: number, p3: boolean, p4: string) => {};
  ```

#### Async/Await
- Prefer async/await over promises
- Always handle errors internally
- Example:
  ```typescript
  export const apiName = async (params: Type) => {
    try {
      const result = await someOperation();
      return { ok: true, message: "Success", data: result };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Failed"
      };
    }
  };
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

#### Module Organization
- One primary export per file
- Helper functions in same file if small
- Extract to separate file if reusable
- Named exports preferred over default exports

#### Exports & Imports
- Export at declaration:
  ```typescript
  export const apiName = async () => {};
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

### Testing Style

#### Dynamic Generation
- Generate tests from exports, don't hardcode
- Example:
  ```javascript
  Object.keys(pwafire).forEach(apiName => {
    if (typeof pwafire[apiName] === 'function') {
      // Generate test dynamically
    }
  });
  ```

#### Test Configuration
- Store test configs in objects
- Make tests data-driven
- Example:
  ```javascript
  const apiConfigs = {
    webShare: {
      title: 'Web Share',
      params: () => [{ title: 'Test', url: location.href }]
    }
  };
  ```

#### Feature Detection
- Dynamic feature scanning from check API
- Match check names to main API names
- Pattern: `check.apiName()` corresponds to `pwafire.apiName()`

### HTML/CSS Style (Test Console)

#### HTML
- Semantic HTML5 elements
- Minimal structure, maximum JS
- No inline styles
- Example:
  ```html
  <div class="test-grid" id="test-grid">
    <!-- Populated by JS -->
  </div>
  ```

#### CSS
- **No box-shadow** (user preference)
- **Monochrome palette**: black (#000), grays (#111-#888), white (#fff)
- **BEM-like naming**: `.test-card`, `.feature-item`
- **Mobile-first** responsive design

#### JavaScript (Browser)
- ES6+ features
- Module pattern
- Dynamic DOM generation
- No jQuery or heavy frameworks

### Deployment

#### Local vs Production
- **Local tests**: Use local `./lib/` files for real-time testing
- **Deployed version**: Use CDN imports from jsdelivr
- Deploy script handles transformation automatically
- Never commit built files

### Best Practices

#### API Design
1. **Consistency**: All APIs follow same patterns
2. **Simplicity**: No over-engineering, minimal abstractions
3. **Safety**: Built-in error handling, never throw
4. **Clarity**: Response format always `{ ok, message }`

#### Code Quality
1. **DRY**: Don't repeat yourself
2. **YAGNI**: You aren't gonna need it - don't add unused features
3. **KISS**: Keep it simple - no complex abstractions
4. **Self-documenting**: Clear names over comments

### Anti-Patterns to Avoid

❌ **DO NOT:**
- Add code comments (removed on purpose)
- Add try/catch in examples (error handling is built-in)
- Use verbose function names
- Hardcode test lists or feature lists
- Over-engineer with unnecessary abstractions
- Add features "just in case"
- Throw errors to consumers
- Use inconsistent naming between main and check APIs

✅ **DO:**
- Keep code clean and self-documenting
- Use dynamic generation for tests and features
- Follow consistent naming conventions
- Handle all errors internally
- Return consistent response format
- Make APIs safe to use without try/catch
- Keep main and check API names aligned

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
