# Tooling & Configuration

## Code Formatting (Prettier)

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

## Linting (ESLint)

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

## NPM Scripts

```bash
npm run build          # Build CJS, ESM, and type definitions
npm run dev            # Build in watch mode
npm test               # Run Jest tests
npm run test:coverage  # Run tests with coverage report
npm run lint           # Lint TypeScript files
npm run format         # Format code with Prettier
```

## Testing Requirements

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
