# Versioning & Release Guide

Complete guide to versioning and releasing PWAFire packages.

## Semantic Versioning (SemVer)

PWAFire follows **Semantic Versioning**: `MAJOR.MINOR.PATCH`

Using current version `6.1.0` as example:

### MAJOR Version (6.x.x → 7.0.0) - Breaking Changes

```bash
npm version major
git push origin main --tags
```

**When to use:**
- Change API function signatures
- Remove deprecated APIs
- Rename exports
- Change response formats
- Any change requiring users to update their code

**Example:**
```typescript
// Before (v6.x.x)
export const copyText = async (text: string) => {...}

// After (v7.0.0) - Breaking!
export const copyText = async (options: {text: string, format?: string}) => {...}
```

### MINOR Version (x.1.x → 6.2.0) - New Features

```bash
npm version minor
git push origin main --tags
```

**When to use:**
- Add new PWA APIs
- Add new utility functions
- Add optional parameters (backward compatible)
- New check functions
- New features that don't break existing code

**Example:**
```typescript
// v6.1.0
export { copyText, readText, copyImage }

// v6.2.0 - Added new API
export { copyText, readText, copyImage, pasteImage }  // ✅ Backward compatible
```

### PATCH Version (x.x.0 → 6.1.1) - Fixes & Minor Changes

```bash
npm version patch
git push origin main --tags
```

**When to use:**
- Bug fixes
- Security patches
- Documentation updates
- Dependency updates
- Performance improvements
- Code refactoring (no behavior change)
- TypeScript types improvements

**Example:**
```typescript
// v6.1.0 - Bug
return { ok: false, message: error.message }  // ❌ Crashes if error is not Error instance

// v6.1.1 - Fixed
return { ok: false, message: error instanceof Error ? error.message : "Failed" }  // ✅
```

## Release Process

Publishing is **manual**. The only workflow is `.github/workflows/pwafire-ci.yml`, which runs lint, tests, build, size budget and coverage on pushes and PRs to `main`/`develop`. Nothing publishes to npm or creates GitHub releases automatically.

`prepublishOnly` runs `npm run verify` (exports check, lint, build, test, size), so `npm publish` refuses to ship a package that fails verification.

### Steps

```bash
# 1. Branch from an up-to-date main
git checkout main && git pull
git checkout -b release/v6.5.1

# 2. Bump the version (ask which level - see "For AI Agents")
cd packages/pwafire
npm version patch --no-git-tag-version
cd ../..
git add packages/pwafire/package.json package-lock.json
git commit -m "chore(release): bump pwafire to 6.5.1"

# 3. Push and open a PR
git push -u origin release/v6.5.1
gh pr create --title "chore(release): pwafire 6.5.1"

# 4. After merge, publish from main (maintainer, with npm access)
git checkout main && git pull
npm publish -w pwafire

# 5. Tag the merged commit and create the GitHub release
git tag v6.5.1
git push origin v6.5.1
gh release create v6.5.1 --title "v6.5.1" --generate-notes
```

**Key points:**

- `--no-git-tag-version` keeps the tag off the release branch; tag the commit on `main` after merge
- `npm publish` uses the maintainer's npm account - AI agents prepare everything up to it and hand it off
- Tag and release only after `npm publish` succeeds, so GitHub and npm stay in sync

### For AI Agents

**When assisting with releases, ALWAYS ask the user which version bump to use:**

```text
Which version bump should I use?
- patch (6.1.0 → 6.1.1) - bug fixes only
- minor (6.1.0 → 6.2.0) - new features/APIs
- major (6.1.0 → 7.0.0) - breaking changes
```

The user knows their changes best and should decide the semantic version level. Never run `npm publish` yourself.

## Version Decision Tree

```text
Is this change breaking existing code?
├─ Yes → MAJOR version (npm version major)
└─ No
   └─ Does this add new features/APIs?
      ├─ Yes → MINOR version (npm version minor)
      └─ No → PATCH version (npm version patch)
```

## Examples from PWAFire History

- **PATCH v6.0.1** - fixed bug in notification API error handling
- **MINOR v6.1.0** - added Chrome Web AI APIs (Summarizer & Translator)
- **MAJOR v6.0.0** - complete rewrite with TypeScript, new API structure

## Pre-Release Versions

```bash
cd packages/pwafire
npm version preminor --preid=beta --no-git-tag-version
cd ../..
npm publish -w pwafire --tag beta
```

## Rollback a Release

```bash
# Deprecate a version (recommended)
npm deprecate pwafire@6.1.0 "This version has a critical bug, use 6.1.1"

# Unpublish (only within 72 hours)
npm unpublish pwafire@6.1.0

# Remove the git tag and GitHub release
gh release delete v6.1.0 --cleanup-tag
```

## Changelog Management

GitHub release notes are generated from merged PRs with `gh release create --generate-notes`. To improve them, follow [Conventional Commits](./commit-style.md).

## Verifying a Release

1. **npm package**: `npm view pwafire version` or https://www.npmjs.com/package/pwafire
2. **GitHub release**: https://github.com/pwafire/pwafire/releases
3. **Install test**:

   ```bash
   mkdir test-install && cd test-install
   npm init -y
   npm install pwafire@latest
   node -e "console.log(require('pwafire'))"
   ```

## Troubleshooting

### `npm publish` fails in `prepublishOnly`

Run `npm run -w pwafire verify` and fix whichever step fails (exports sync, lint, build, test, size).

### Version already published

npm never reuses a version. Bump again (`npm version patch --no-git-tag-version`) and publish the new version.

### Version tag already exists

```bash
git tag -d v6.1.0
git push origin :refs/tags/v6.1.0
```

## Best Practices

1. **Test before releasing**: Always run `npm run -w pwafire verify` locally
2. **Review changes**: Use `git log v<last>..main` to review what's being released
3. **Update docs**: Keep documentation in sync with API changes
4. **Announce breaking changes**: Update migration guides for major versions
5. **Keep changelog clean**: Write clear, conventional commit messages
6. **Version frequently**: Small, frequent releases are better than large ones

## Related Documentation

- [Commit Style](./commit-style.md) - How to write good commit messages
- [CI workflow](../../.github/workflows/pwafire-ci.yml) - Lint, test, build and size checks
