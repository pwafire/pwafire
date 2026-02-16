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

### Automated via GitHub Actions

PWAFire uses **npm Trusted Publisher** with OIDC authentication - no secrets required!

**Important:** The version bump happens LOCALLY (not in CI). The workflow only publishes.

```bash
# 1. Make your changes and commit
git add .
git commit -m "feat(clipboard) - add paste image support"

# 2. Bump version (YOU choose the level based on changes)
npm version patch   # For fixes → 6.1.0 → 6.1.1
npm version minor   # For new APIs → 6.1.0 → 6.2.0
npm version major   # For breaking changes → 6.1.0 → 7.0.0

# This command does THREE things locally:
# ✅ Updates package.json version
# ✅ Creates git commit: "6.1.1"
# ✅ Creates git tag: "v6.1.1"

# 3. Push the tag to trigger workflow
git push origin main --tags

# 4. GitHub Actions automatically:
#    ✅ Detects tag (e.g., "v6.1.1")
#    ✅ Runs lint, test, build
#    ✅ Publishes to npm (via OIDC)
#    ✅ Creates GitHub release
#    ✅ Generates changelog
```

### For AI Agents

**When assisting with releases, ALWAYS ask the user which version bump to use:**

❌ **Don't assume:**
```bash
# Wrong - don't decide for the user!
npm version patch
```

✅ **Always ask:**
```
Which version bump should I use?
- patch (6.1.0 → 6.1.1) - bug fixes only
- minor (6.1.0 → 6.2.0) - new features/APIs
- major (6.1.0 → 7.0.0) - breaking changes
```

The user knows their changes best and should decide the semantic version level.

### What Happens Behind the Scenes

#### Step 1: Local Version Bump (YOU run this)

```bash
npm version patch  # or minor, or major
```

This runs on YOUR machine and does:
- ✅ Updates `package.json`: `"version": "6.1.1"`
- ✅ Creates git commit: `"6.1.1"`
- ✅ Creates git tag: `v6.1.1`

**Note:** Nothing is published yet! This is all local.

#### Step 2: Push the Tag (YOU run this)

```bash
git push origin main --tags
```

This pushes:
- The commit with updated package.json
- The version tag (e.g., `v6.1.1`)

#### Step 3: GitHub Actions Detects Tag

`.github/workflows/publish.yml` triggers on:
```yaml
on:
  push:
    tags:
      - 'v*'  # Matches v6.1.1, v6.2.0, v7.0.0, etc.
```

#### Step 4: Workflow Runs

```yaml
- Checkout code (includes your package.json with new version)
- Setup Node.js with npm registry
- Install dependencies (npm ci)
- Run full verification (npm run verify)
  → lint, test, build all must pass
- Publish to npm (OIDC authentication)
  → npm reads version from package.json (e.g., 6.1.1)
  → publishes as pwafire@6.1.1
- Create GitHub release (auto-generated notes)
```

#### Step 5: npm Trusted Publisher (The Magic ✨)

- GitHub Actions issues an OIDC token
- npm verifies token against trusted publisher config:
  - Repository: `pwafire/pwafire` ✅
  - Workflow: `publish.yml` ✅
  - Tag format: `v*` ✅
- Publishes with provenance attestation
- **No `NPM_TOKEN` secret needed!**

### The Full Flow Visualized

```
┌─────────────────────────────────────────────────────┐
│  LOCAL (Your Machine)                               │
├─────────────────────────────────────────────────────┤
│  $ npm version patch                                │
│    → package.json: "6.1.1"                         │
│    → git commit: "6.1.1"                           │
│    → git tag: "v6.1.1"                             │
│                                                     │
│  $ git push origin main --tags                      │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  GITHUB (Remote)                                    │
├─────────────────────────────────────────────────────┤
│  Tag "v6.1.1" detected                              │
│    → Triggers publish.yml workflow                  │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  GITHUB ACTIONS (CI/CD)                             │
├─────────────────────────────────────────────────────┤
│  1. Checkout code                                   │
│  2. Run tests ✅                                     │
│  3. Build package ✅                                 │
│  4. Issue OIDC token                                │
│  5. npm publish pwafire@6.1.1                       │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  NPM REGISTRY                                       │
├─────────────────────────────────────────────────────┤
│  ✅ Verify OIDC token (trusted publisher)           │
│  ✅ Publish pwafire@6.1.1                           │
│  ✅ Add provenance attestation                      │
│  🎉 Package live at npmjs.com/package/pwafire       │
└─────────────────────────────────────────────────────┘
```

## Version Decision Tree

```
Is this change breaking existing code?
├─ Yes → MAJOR version (npm version major)
└─ No
   └─ Does this add new features/APIs?
      ├─ Yes → MINOR version (npm version minor)
      └─ No → PATCH version (npm version patch)
```

## Examples from PWAFire History

### PATCH: v6.0.1
```bash
# Fixed bug in notification API error handling
npm version patch
git push origin main --tags
```

### MINOR: v6.1.0
```bash
# Added Chrome Web AI APIs (Summarizer & Translator)
npm version minor
git push origin main --tags
```

### MAJOR: v6.0.0
```bash
# Complete rewrite with TypeScript, new API structure
npm version major
git push origin main --tags
```

## Pre-Release Versions

For beta/alpha releases:

```bash
# Create beta version: 6.2.0-beta.0
npm version preminor --preid=beta
git push origin main --tags

# Publish with beta tag
npm publish --tag beta
```

## Rollback a Release

If you need to unpublish or deprecate:

```bash
# Deprecate a version (recommended)
npm deprecate pwafire@6.1.0 "This version has a critical bug, use 6.1.1"

# Unpublish (only within 72 hours)
npm unpublish pwafire@6.1.0

# Revert git tag locally
git tag -d v6.1.0
git push origin :refs/tags/v6.1.0
```

## Changelog Management

PWAFire uses **auto-generated changelogs** from GitHub releases.

The workflow automatically:
- Groups commits by type (feat, fix, docs, etc.)
- Links to PRs and commits
- Shows contributors

To improve changelog quality, follow [Conventional Commits](./commit-style.md).

## Verifying a Release

After publishing, verify:

1. **npm package**: https://www.npmjs.com/package/pwafire
2. **GitHub release**: https://github.com/pwafire/pwafire/releases
3. **Install test**:
   ```bash
   mkdir test-install && cd test-install
   npm init -y
   npm install pwafire@latest
   node -e "console.log(require('pwafire'))"
   ```

## Troubleshooting

### "Permission denied" when publishing
- Verify trusted publisher is configured at: https://www.npmjs.com/package/pwafire/access
- Check workflow name matches: `publish.yml`
- Ensure repository is: `pwafire/pwafire`

### Version tag already exists
```bash
# Delete local and remote tag
git tag -d v6.1.0
git push origin :refs/tags/v6.1.0

# Create new tag
npm version patch
git push origin main --tags
```

### Workflow didn't trigger
- Ensure tag format is `v*` (e.g., `v6.1.0`, not `6.1.0`)
- Check workflow file exists: `.github/workflows/publish.yml`
- View workflow runs: https://github.com/pwafire/pwafire/actions

### Published version has issues
```bash
# Quick fix and patch release
git checkout main
# Fix the issue
git add .
git commit -m "fix: critical bug in release"
npm version patch
git push origin main --tags
```

## Best Practices

1. **Test before releasing**: Always run `npm run verify` locally
2. **Review changes**: Use `git log` to review what's being released
3. **Update docs**: Keep documentation in sync with API changes
4. **Announce breaking changes**: Update migration guides for major versions
5. **Keep changelog clean**: Write clear, conventional commit messages
6. **Version frequently**: Small, frequent releases are better than large ones

## CI/CD Configuration

The release workflow is configured at: `.github/workflows/publish.yml`

For setup details, see: [CI/CD Setup Guide](../.github/CI.md)

## Related Documentation

- [Commit Style](./commit-style.md) - How to write good commit messages
- [CI/CD Setup](../.github/CI.md) - GitHub Actions configuration
- [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers) - Official npm docs
