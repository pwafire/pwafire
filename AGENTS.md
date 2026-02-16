# PWAFire Development Guide

Quick reference for working on PWAFire. For detailed guidelines, see `/docs/*.md` files.

## Core Principles

- **No code comments** - code is self-documenting
- **Catch-and-return pattern** - all PWA functions follow this
- **Never throw errors** - catch and return them
- **Consistent response format**: `{ ok: boolean, message: string, ...data? }`
- **Minimal abstractions** - KISS, DRY, YAGNI

## Quick Links

- [Versioning & Release](./docs/versioning-and-release.md) - How to version and release packages
- [Commit Style](./docs/commit-style.md) - Commit messages, PR and release summaries
- [Naming Conventions](./docs/naming-conventions.md) - Functions, files, constants, types, APIs
- [Code Style](./docs/code-style.md) - Formatting, error handling, type safety, async/await
- [File Organization](./docs/file-organization.md) - Project structure, modules, imports/exports
- [Testing Style](./docs/testing-style.md) - Dynamic generation, test configuration
- [HTML/CSS Style](./docs/html-css-style.md) - Test console styling guidelines
- [Tooling](./docs/tooling.md) - Prettier, ESLint, NPM scripts, testing requirements
- [Console App](./docs/console.md) - Complete console app documentation

## Key Reminders

**Error Handling:**

```typescript
export const apiName = async (...args) => {
  try {
    if (!featureAvailable) return { ok: false, message: "API not supported" };
    const result = await someAPI(...args);
    return { ok: true, message: "Success", ...data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed"
    };
  }
};
```

**Naming:**

- Functions/variables: `camelCase` (`webShare`, `copyText`)
- Files/directories: `kebab-case` (`lazy-load`, `idle-detection`)
- Constants: `SCREAMING_SNAKE_CASE` (`MAX_RETRY_ATTEMPTS`)
- Types: `PascalCase` (`ResponseType`, `ConfigOptions`)

**Before Committing:**

```bash
cd packages/pwafire
npm run lint    # 0 errors (7 warnings OK)
npm run build   # CJS, ESM, DTS generated
npm test        # All tests pass
```

**Commit Format:**

```text
<type>(<scope>) - <description>

Examples:
feat(notifications) - add support for notification actions
fix(lazy-load) - prevent CSS injection in background images
chore(cleanup) - standardize error handling across modules
```

## Deployment

**Local vs Production:**

- **Local tests**: Use local `./lib/` files for real-time testing
- **Deployed version**: Use CDN imports from jsdelivr
- Deploy script handles transformation automatically
- Never commit built files

## Versioning & Releases

**Quick Reference:** See [Versioning & Release Guide](./docs/versioning-and-release.md) for complete details.

```bash
# Bump version and release
npm version patch   # 6.1.0 → 6.1.1 (fixes)
npm version minor   # 6.1.0 → 6.2.0 (new APIs)
npm version major   # 6.1.0 → 7.0.0 (breaking changes)

# Push to trigger auto-release
git push origin main --tags
```

Automated via GitHub Actions with OIDC trusted publisher (no secrets needed!).

## Best Practices

### API Design

1. **Consistency**: All APIs follow same patterns
2. **Simplicity**: No over-engineering, minimal abstractions
3. **Safety**: Built-in error handling, never throw
4. **Clarity**: Response format always `{ ok, message }`

### Code Quality

1. **DRY**: Don't repeat yourself
2. **YAGNI**: You aren't gonna need it - don't add unused features
3. **KISS**: Keep it simple - no complex abstractions
4. **Self-documenting**: Clear names over comments

## Anti-Patterns to Avoid

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

## Related Resources

- [PWAFire Documentation](https://docs.pwafire.org)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
