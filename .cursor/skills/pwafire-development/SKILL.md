---
name: pwafire-development
description: Develop and maintain the PWAFire PWA utilities library. Use when working on pwafire package, adding PWA APIs, fixing modules, writing tests, or contributing to the PWAFire codebase.
---

# PWAFire Development

## When to Apply

Use this skill when working on:
- `packages/pwafire/` source code
- PWA API modules (badging, clipboard, notifications, etc.)
- Tests, console app, or build configuration
- Any PWAFire contribution or maintenance

## Core Principles

- **No code comments** - code is self-documenting
- **Catch-and-return pattern** - all PWA functions follow this
- **Never throw errors** - catch and return them
- **Consistent response format**: `{ ok: boolean, message: string, ...data? }`
- **Minimal abstractions** - KISS, DRY, YAGNI

## Error Handling (Required Pattern)

Every PWA module function must use this structure:

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

- Feature detection → `{ ok: false, message: "API not supported" }`
- Success → `{ ok: true, message: "...", ...optionalData }`
- Error messages: `"Failed to {action}"` or `"{API} API not supported"`

## Naming Conventions

| Kind | Style | Examples |
|------|-------|----------|
| Functions/variables | camelCase | `webShare`, `copyText` |
| Files/directories | kebab-case | `lazy-load`, `idle-detection` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| Types | PascalCase | `ResponseType`, `ConfigOptions` |

- Check API names match main API: `check.webShare()` for `webShare()`
- Verb-noun pattern: `screenShare` not `screenSharingControls`

## Experimental Browser APIs

The 7 ESLint `any` warnings are **expected**. Do not fix by defining custom interfaces.

Affected modules: barcode, contacts, content-indexing, files, idle-detection, screen.

Use `unknown` and `as any` for experimental APIs without TypeScript definitions.

## Anti-Patterns

**Do NOT:**
- Add code comments
- Add try/catch in user-facing examples (built-in)
- Throw errors to consumers
- Hardcode test or feature lists (use dynamic generation)
- Define custom interfaces for browser APIs
- Use inconsistent naming between main and check APIs

**Do:**
- Handle all errors internally
- Use dynamic generation for tests and features
- Keep main and check API names aligned

## Before Committing

```bash
cd packages/pwafire
npm run lint   # 0 errors (7 warnings OK)
npm run build  # CJS, ESM, DTS generated
npm test       # All tests pass
```

## Commit and PR Title Format

```text
<type>(<scope>) - <description>
```

PR titles use the same format as commit messages.

Examples: `feat(notifications) - add support for notification actions`, `fix(lazy-load) - prevent CSS injection`

## Project Structure

```
packages/pwafire/src/
├── pwa/        # One module per feature (e.g. badging/, clipboard/)
├── check/      # Feature detection utilities
├── index.ts    # Main entry
└── types.d.ts  # Minimal type definitions
```

- One primary export per file
- Named exports preferred
- Never commit `lib/` (build output)

## Detailed Docs

For full guidelines, see project docs:
- `AGENTS.md` / `agents.md` - Quick reference
- `docs/code-style.md` - Formatting, type safety
- `docs/naming-conventions.md` - Naming rules
- `docs/file-organization.md` - Module structure
- `docs/commit-style.md` - Commit and PR format
- `docs/testing-style.md` - Test patterns
- `docs/console.md` - Console app
